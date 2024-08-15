import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProduct, Documentation, LinkedEntity } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { GetDocumentationParams } from 'src/apiAndObjects/api/documentation/getDocumentation';
import { DocumentationDataSource } from 'src/apiAndObjects/objects/data-source/documentationDetailDataSource';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { HelpersService } from 'src/services/helpers.service';
import { LoadingService } from 'src/services/loading.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { Status } from 'src/utility/enums/status.enum';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrl: './documentation.component.scss',
})
export class DocumentationComponent implements OnInit {
  @Input() dataProduct!: DataProduct | null;

  public documentationLinkedEntities: LinkedEntity[] = [];
  @Input() set documentationsInput(value: Array<LinkedEntity> | undefined) {
    if (value) {
      this.documentationLinkedEntities = value;
      this.initDocumentations(this.documentationLinkedEntities);
    }
  }

  public documentationEntities: Array<Documentation> = [];
  public form!: FormGroup;
  public disabled = true;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private helpersService: HelpersService,
    private loadingService: LoadingService,
    private snackbarService: SnackbarService,
    private entityExecutionService: EntityExecutionService,
  ) {}

  public ngOnInit(): void {
    this.disabled = this.dataProduct?.status === Status.PUBLISHED || this.dataProduct?.status === Status.ARCHIVED;
  }

  private initDocumentations(documentationLinkedEntities: Array<LinkedEntity>) {
    documentationLinkedEntities.forEach((location: LinkedEntity) => {
      const params: GetDocumentationParams = {
        instanceId: location.instanceId as string,
        metaId: location.metaId as string,
      };
      this.apiService.endpoints.Documentation.get.call(params).then((items: Array<Documentation>) => {
        items.forEach((doc) => {
          this.documentationEntities.push(doc);
        });
        this.initFormArr();
      });
    });
  }

  private initFormArr(): void {
    this.form = this.formBuilder.group({
      documentations: new FormArray(
        this.documentationEntities.map((documentation: Documentation) => {
          return new FormGroup({
            title: new FormControl(documentation.title, [Validators.required]),
            description: new FormControl(documentation.description),
            uri: new FormControl(documentation.uri, [
              Validators.required,
              (control: AbstractControl): { [key: string]: unknown } | null => {
                if (this.helpersService.isValidHttpUrl(control.value)) {
                  return null;
                } else {
                  control.markAsTouched();
                  return { 'error-class': control.value };
                }
              },
            ]),
          });
        }),
      ),
    });
    this.disabled ? this.form.disable() : this.form.enable();
  }

  public getControls(field: string): AbstractControl<unknown, unknown>[] {
    return (this.form.get(field) as FormArray).controls;
  }

  public handleCreate() {
    this.apiService.endpoints.Documentation.create
      .call({ title: 'New Documentation' })
      .then((doc: DocumentationDataSource) => {
        const newDoc: LinkedEntity = {
          entityType: Entity.DOCUMENTATION,
          instanceId: doc.instanceId,
          metaId: doc.metaId,
          uid: doc.uid,
        };
        const activeWebService = this.entityExecutionService.getActiveWebServiceValue();
        activeWebService?.documentation?.push(newDoc);
        if (activeWebService) {
          this.entityExecutionService.setActiveWebService(activeWebService);
          this.entityExecutionService.handleWebserviceSave();
        }

        this.apiService.endpoints.Documentation.get
          .call({ metaId: newDoc.metaId!, instanceId: newDoc.instanceId! })
          .then((doc: Array<Documentation>) => {
            this.documentationEntities.push(doc[0]);
            this.initFormArr();
          });
      });
  }

  public handleSave(i: number) {
    this.loadingService.setShowSpinner(true);
    const arrayControl = this.form.get('documentations') as FormArray;
    const docToUpdate = this.documentationEntities[i];
    docToUpdate.title = arrayControl.at(i).value.title;
    docToUpdate.description = arrayControl.at(i).value.description;
    docToUpdate.uri = arrayControl.at(i).value.uri;
    this.apiService.endpoints.Documentation.update
      .call(docToUpdate)
      .then(() => {
        this.snackbarService.openSnackbar('Successfully saved Documentation', 'Close', 'success', 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
      })
      .catch((err) => {
        console.error(err);
        this.snackbarService.openSnackbar('Error updating Documentation.', 'Close', 'error', 3000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]);
      })
      .finally(() => this.loadingService.setShowSpinner(false));
  }
}
