import { Component, Input, OnInit } from '@angular/core';
import { DataProduct, Documentation, LinkedEntity } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { GetDocumentationParams } from 'src/apiAndObjects/api/documentation/getDocumentation';
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

  public disabled = true;

  constructor(private apiService: ApiService) {}

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
        items.forEach((doc, index) => {
          this.documentationEntities.push(doc);
        });
      });
    });
  }
}
