import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { EntityDetail } from 'src/apiAndObjects/objects/types/entityDetail.type';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { RevisionsComponent } from 'src/components/dialogs/revisions/revisions.component';
import { ActionsService } from 'src/services/actions.service';
import { OperationsService } from 'src/services/operations.service';
import { PersistorService } from 'src/services/persistor.service';
import { SnackbarService } from 'src/services/snackbar.service';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { State } from 'src/utility/enums/state.enum';

@Component({
  selector: 'app-distribution-form-details',
  templateUrl: './distribution-form-details.component.html',
  styleUrls: ['./distribution-form-details.component.scss'],
})
export class DistributionFormDetailsComponent {
  @Input() set distributionDetails(details: EntityDetail | undefined) {
    if (null != details) {
      this.initData(details.instanceId);
    }
  }

  public floatLabelControl = new UntypedFormControl('auto');
  public distribution!: DistributionDetailDataSource | undefined;
  public UID!: string | null;
  public form!: UntypedFormGroup;
  public entityRoute = EntityEndpointValue.DISTRIBUTION;
  public accessService!: EntityDetail;

  public dataProductAccessibility?: string;
  public dataProductAccessibilityOptions: string[] = ['download', 'webservice'];

  constructor(
    private dialogService: DialogService,
    private formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    private snackbarService: SnackbarService,
    private actionsService: ActionsService,
    private operationsService: OperationsService,
  ) {}

  private initData(id: string): void {
    this.apiService.endpoints.Distribution.get
      .call(
        {
          instanceId: id,
        },
        false,
      )
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.distribution = data.shift();
          if (this.distribution) {
            this.operationsService.setActiveDistribution(
              this.operationsService.convertToDistribution(this.distribution),
            );
            this.accessService = this.distribution.accessService;
            this.trackFormData();
          }
        }
      });
  }

  private trackFormData(): void {
    this.form = this.formBuilder.group({
      accessService: this.accessService,
      instanceId: this.distribution?.instanceId,
      uid: this.distribution?.uid,
      license: this.distribution?.licence,
      metaId: this.distribution?.metaId,
      title: this.distribution?.title,
      description: this.distribution?.description,
      changeTimestamp: this.distribution?.changeTimestamp,
      state: this.distribution?.state,
      modified: this.distribution?.modified,
      dataProduct: [this.distribution?.dataProduct],
      dataProductAccessibility: '',
    });
    this.form.valueChanges.subscribe((changes) => {
      const updatingObject = this.operationsService.getActiveDistributionValue();
      if (updatingObject) {
        updatingObject.title = [changes['title']];
        updatingObject.description = [changes['description']];
        updatingObject.description = [changes['license']];
        // this.actionService.enableSave();
        this.operationsService.setActiveDistribution(updatingObject);
        // this.persistorService.setValueInStorage(StorageType.LOCAL_STORAGE, StorageKey.FORM_DATA, JSON.stringify(value));
      }
    });
  }

  public handleGetRevisions(): void {
    // Todo: pass revisions data to component
    this.dialogService.openDialogForComponent(
      RevisionsComponent,
      {
        metaId: this.distribution?.metaId,
      },
      '35vw',
      'auto',
      'revisions-dialog',
    );
  }

  public handleSave(): void {
    this.operationsService.handleDistributionSave();
  }

  public newWebservice() {
    const item: WebService = {
      uid: 'new webservice',
      dateModified: new Date(),
    };

    this.apiService.endpoints.Webservice.create
      .call(item)
      .then((value: WebserviceDetailDataSource) => {
        this.snackbarService.openSnackbar(`Success: ${value.uid} created`, 'close', 'success', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-success',
        ]);
        this.actionsService.addEditedItems([
          {
            type: Entity.WEBSERVICE,
            route: EntityEndpointValue.WEBSERVICE,
            label: 'Webservice',
            state: State.DRAFT,
            color: 'draft',
            id: value.instanceId,
          },
        ]);
        this.actionsService.saveCurrentEdit(value.instanceId);
        const entityDetail: EntityDetail = {
          entityType: Entity.WEBSERVICE,
          instanceId: value.instanceId,
          uid: value.uid,
          metaId: value.metaId,
        };
        this.accessService = entityDetail;
      })
      .catch(() =>
        this.snackbarService.openSnackbar(`Error: failed to create new Distribution`, 'close', 'error', 6000, [
          'snackbar',
          'mat-toolbar',
          'snackbar-error',
        ]),
      );
  }
}

export const FormatTypes = [
  'ZIP',
  'XML',
  'RDF',
  'SKOS_XML',
  'XLSX',
  'PDF',
  'ARC',
  'ARC_GZ',
  'ATOM',
  'AZW',
  'BIN',
  'BMP',
  'BWF',
  'CSS',
  'CSV',
  'DBF',
  'DCR',
  'DMP',
  'DOC',
  'DOCX',
  'DTD_SGML',
  'DTD_XML',
  'E00',
  'ECW',
  'EPS',
  'EPUB',
  'FMX2',
  'FMX3',
  'FMX4',
  'GDB',
  'GEOJSON',
  'GIF',
  'GML',
  'GMZ',
  'GRID_ASCII',
  'GZIP',
  'HDF',
  'HTML',
  'HTML_SIMPL',
  'INDD',
  'JPEG',
  'JPEG2000',
  'JSON',
  'JSON_LD',
  'KML',
  'KMZ',
  'LAS',
  'LAZ',
  'MAP_PRVW',
  'MAP_SRVC',
  'MBOX',
  'MDB',
  'METS',
  'METS_ZIP',
  'MHTML',
  'MOBI',
  'MOP',
  'MPEG2',
  'MPEG4',
  'MPEG4_AVC',
  'MSG_HTTP',
  'MXD',
  'NETCDF',
  'OCTET',
  'ODB',
  'ODC',
  'ODF',
  'ODG',
  'ODS',
  'ODT',
  'OP_DATPRO',
  'OVF',
  'OWL',
  'PDF1X',
  'PDFA1A',
  'PDFA1B',
  'PDFA2A',
  'PDFA2B',
  'PDFA3',
  'PDFX',
  'PDFX1A',
  'PDFX2A',
  'PDFX4',
  'PNG',
  'PPS',
  'PPSX',
  'PPT',
  'PPTX',
  'PS',
  'PSD',
  'RDFA',
  'RDF_N_QUADS',
  'RDF_N_TRIPLES',
  'RDF_TRIG',
  'RDF_TURTLE',
  'RDF_XML',
  'REST',
  'RSS',
  'RTF',
  'SCHEMA_XML',
  'SDMX',
  'SGML',
  'SHP',
  'SPARQLQ',
  'SPARQLQRES',
  'SQL',
  'TAB',
  'TAB_RSTR',
  'TAR',
  'TAR_GZ',
  'TAR_XZ',
  'TIFF',
  'TIFF_FX',
  'TMX',
  'TSV',
  'TXT',
  'WARC',
  'WARC_GZ',
  'WORLD',
  'XHTML',
  'XHTML_SIMPL',
  'XLIFF',
  'XLS',
  'XSLFO',
  'XSLT',
  'XYZ',
  'BITS',
  'JATS',
  'PWP',
  'JS',
  'N3',
  'RAR',
  'WMS_SRVC',
  'EXE',
  'ICS',
  'MRSID',
  'PL',
  'QGS',
  'SVG',
  'WFS_SRVC',
  'ISO',
  'ISO_ZIP',
  'GRID',
  'XLSB',
  'XLSM',
  'IMMC_XML',
  'HDT',
  'LEG',
  'WMTS_SRVC',
  '7Z',
  'AAC',
  'APPX',
  'ARJ',
  'DMG',
  'JAR',
  'MSI',
  'SWM',
  'APK',
  'BZIP2',
  'DEB',
  'LHA',
  'LZMA',
  'ODP',
  'RDF_TRIX',
  'RPM',
  'SB3',
  'WAR',
  'WIM',
  'XZ',
  'Z',
  'EAR',
  'LZIP',
  'LZO',
  'AKN4EU',
  'FMX4_ZIP',
  'MOV',
  'ETSI_XML',
  'GPKG',
  'AKN4EU_ZIP',
  'DGN',
  'DWG',
  'DXF',
  'WCS_SRVC',
  'IPA',
  'GEOTIFF',
  'PDFUA',
  'HTML5',
  'AAB',
  'MIF_MID',
  'UNGEN',
  'ARCINFO_COV',
  'LPK',
  'STL',
  'DAPK',
  'MP3',
  'OAPK',
  'WAV',
  'XHTML5',
  'RDF_THRIFT',
  'GTFS',
  'YAML',
  'EFORMS_XML',
  'WEBP',
];
