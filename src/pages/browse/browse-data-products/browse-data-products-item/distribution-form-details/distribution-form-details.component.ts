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
  public formats = FormatTypes;
  public selectedFormat = '';

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
            this.selectedFormat = this.distribution.format;
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
      selectedFormat: this.distribution?.format,
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
  'http://publications.europa.eu/resource/authority/file-type/ZIP',
  'http://publications.europa.eu/resource/authority/file-type/XML',
  'http://publications.europa.eu/resource/authority/file-type/RDF',
  'http://publications.europa.eu/resource/authority/file-type/SKOS_XML',
  'http://publications.europa.eu/resource/authority/file-type/XLSX',
  'http://publications.europa.eu/resource/authority/file-type/PDF',
  'http://publications.europa.eu/resource/authority/file-type/ARC',
  'http://publications.europa.eu/resource/authority/file-type/ARC_GZ',
  'http://publications.europa.eu/resource/authority/file-type/ATOM',
  'http://publications.europa.eu/resource/authority/file-type/AZW',
  'http://publications.europa.eu/resource/authority/file-type/BIN',
  'http://publications.europa.eu/resource/authority/file-type/BMP',
  'http://publications.europa.eu/resource/authority/file-type/BWF',
  'http://publications.europa.eu/resource/authority/file-type/CSS',
  'http://publications.europa.eu/resource/authority/file-type/CSV',
  'http://publications.europa.eu/resource/authority/file-type/DBF',
  'http://publications.europa.eu/resource/authority/file-type/DCR',
  'http://publications.europa.eu/resource/authority/file-type/DMP',
  'http://publications.europa.eu/resource/authority/file-type/DOC',
  'http://publications.europa.eu/resource/authority/file-type/DOCX',
  'http://publications.europa.eu/resource/authority/file-type/DTD_SGML',
  'http://publications.europa.eu/resource/authority/file-type/DTD_XML',
  'http://publications.europa.eu/resource/authority/file-type/E00',
  'http://publications.europa.eu/resource/authority/file-type/ECW',
  'http://publications.europa.eu/resource/authority/file-type/EPS',
  'http://publications.europa.eu/resource/authority/file-type/EPUB',
  'http://publications.europa.eu/resource/authority/file-type/FMX2',
  'http://publications.europa.eu/resource/authority/file-type/FMX3',
  'http://publications.europa.eu/resource/authority/file-type/FMX4',
  'http://publications.europa.eu/resource/authority/file-type/GDB',
  'http://publications.europa.eu/resource/authority/file-type/GEOJSON',
  'http://publications.europa.eu/resource/authority/file-type/GIF',
  'http://publications.europa.eu/resource/authority/file-type/GML',
  'http://publications.europa.eu/resource/authority/file-type/GMZ',
  'http://publications.europa.eu/resource/authority/file-type/GRID_ASCII',
  'http://publications.europa.eu/resource/authority/file-type/GZIP',
  'http://publications.europa.eu/resource/authority/file-type/HDF',
  'http://publications.europa.eu/resource/authority/file-type/HTML',
  'http://publications.europa.eu/resource/authority/file-type/HTML_SIMPL',
  'http://publications.europa.eu/resource/authority/file-type/INDD',
  'http://publications.europa.eu/resource/authority/file-type/JPEG',
  'http://publications.europa.eu/resource/authority/file-type/JPEG2000',
  'http://publications.europa.eu/resource/authority/file-type/JSON',
  'http://publications.europa.eu/resource/authority/file-type/JSON_LD',
  'http://publications.europa.eu/resource/authority/file-type/KML',
  'http://publications.europa.eu/resource/authority/file-type/KMZ',
  'http://publications.europa.eu/resource/authority/file-type/LAS',
  'http://publications.europa.eu/resource/authority/file-type/LAZ',
  'http://publications.europa.eu/resource/authority/file-type/MAP_PRVW',
  'http://publications.europa.eu/resource/authority/file-type/MAP_SRVC',
  'http://publications.europa.eu/resource/authority/file-type/MBOX',
  'http://publications.europa.eu/resource/authority/file-type/MDB',
  'http://publications.europa.eu/resource/authority/file-type/METS',
  'http://publications.europa.eu/resource/authority/file-type/METS_ZIP',
  'http://publications.europa.eu/resource/authority/file-type/MHTML',
  'http://publications.europa.eu/resource/authority/file-type/MOBI',
  'http://publications.europa.eu/resource/authority/file-type/MOP',
  'http://publications.europa.eu/resource/authority/file-type/MPEG2',
  'http://publications.europa.eu/resource/authority/file-type/MPEG4',
  'http://publications.europa.eu/resource/authority/file-type/MPEG4_AVC',
  'http://publications.europa.eu/resource/authority/file-type/MSG_HTTP',
  'http://publications.europa.eu/resource/authority/file-type/MXD',
  'http://publications.europa.eu/resource/authority/file-type/NETCDF',
  'http://publications.europa.eu/resource/authority/file-type/OCTET',
  'http://publications.europa.eu/resource/authority/file-type/ODB',
  'http://publications.europa.eu/resource/authority/file-type/ODC',
  'http://publications.europa.eu/resource/authority/file-type/ODF',
  'http://publications.europa.eu/resource/authority/file-type/ODG',
  'http://publications.europa.eu/resource/authority/file-type/ODS',
  'http://publications.europa.eu/resource/authority/file-type/ODT',
  'http://publications.europa.eu/resource/authority/file-type/OP_DATPRO',
  'http://publications.europa.eu/resource/authority/file-type/OVF',
  'http://publications.europa.eu/resource/authority/file-type/OWL',
  'http://publications.europa.eu/resource/authority/file-type/PDF1X',
  'http://publications.europa.eu/resource/authority/file-type/PDFA1A',
  'http://publications.europa.eu/resource/authority/file-type/PDFA1B',
  'http://publications.europa.eu/resource/authority/file-type/PDFA2A',
  'http://publications.europa.eu/resource/authority/file-type/PDFA2B',
  'http://publications.europa.eu/resource/authority/file-type/PDFA3',
  'http://publications.europa.eu/resource/authority/file-type/PDFX',
  'http://publications.europa.eu/resource/authority/file-type/PDFX1A',
  'http://publications.europa.eu/resource/authority/file-type/PDFX2A',
  'http://publications.europa.eu/resource/authority/file-type/PDFX4',
  'http://publications.europa.eu/resource/authority/file-type/PNG',
  'http://publications.europa.eu/resource/authority/file-type/PPS',
  'http://publications.europa.eu/resource/authority/file-type/PPSX',
  'http://publications.europa.eu/resource/authority/file-type/PPT',
  'http://publications.europa.eu/resource/authority/file-type/PPTX',
  'http://publications.europa.eu/resource/authority/file-type/PS',
  'http://publications.europa.eu/resource/authority/file-type/PSD',
  'http://publications.europa.eu/resource/authority/file-type/RDFA',
  'http://publications.europa.eu/resource/authority/file-type/RDF_N_QUADS',
  'http://publications.europa.eu/resource/authority/file-type/RDF_N_TRIPLES',
  'http://publications.europa.eu/resource/authority/file-type/RDF_TRIG',
  'http://publications.europa.eu/resource/authority/file-type/RDF_TURTLE',
  'http://publications.europa.eu/resource/authority/file-type/RDF_XML',
  'http://publications.europa.eu/resource/authority/file-type/REST',
  'http://publications.europa.eu/resource/authority/file-type/RSS',
  'http://publications.europa.eu/resource/authority/file-type/RTF',
  'http://publications.europa.eu/resource/authority/file-type/SCHEMA_XML',
  'http://publications.europa.eu/resource/authority/file-type/SDMX',
  'http://publications.europa.eu/resource/authority/file-type/SGML',
  'http://publications.europa.eu/resource/authority/file-type/SHP',
  'http://publications.europa.eu/resource/authority/file-type/SPARQLQ',
  'http://publications.europa.eu/resource/authority/file-type/SPARQLQRES',
  'http://publications.europa.eu/resource/authority/file-type/SQL',
  'http://publications.europa.eu/resource/authority/file-type/TAB',
  'http://publications.europa.eu/resource/authority/file-type/TAB_RSTR',
  'http://publications.europa.eu/resource/authority/file-type/TAR',
  'http://publications.europa.eu/resource/authority/file-type/TAR_GZ',
  'http://publications.europa.eu/resource/authority/file-type/TAR_XZ',
  'http://publications.europa.eu/resource/authority/file-type/TIFF',
  'http://publications.europa.eu/resource/authority/file-type/TIFF_FX',
  'http://publications.europa.eu/resource/authority/file-type/TMX',
  'http://publications.europa.eu/resource/authority/file-type/TSV',
  'http://publications.europa.eu/resource/authority/file-type/TXT',
  'http://publications.europa.eu/resource/authority/file-type/WARC',
  'http://publications.europa.eu/resource/authority/file-type/WARC_GZ',
  'http://publications.europa.eu/resource/authority/file-type/WORLD',
  'http://publications.europa.eu/resource/authority/file-type/XHTML',
  'http://publications.europa.eu/resource/authority/file-type/XHTML_SIMPL',
  'http://publications.europa.eu/resource/authority/file-type/XLIFF',
  'http://publications.europa.eu/resource/authority/file-type/XLS',
  'http://publications.europa.eu/resource/authority/file-type/XSLFO',
  'http://publications.europa.eu/resource/authority/file-type/XSLT',
  'http://publications.europa.eu/resource/authority/file-type/XYZ',
  'http://publications.europa.eu/resource/authority/file-type/BITS',
  'http://publications.europa.eu/resource/authority/file-type/JATS',
  'http://publications.europa.eu/resource/authority/file-type/PWP',
  'http://publications.europa.eu/resource/authority/file-type/JS',
  'http://publications.europa.eu/resource/authority/file-type/N3',
  'http://publications.europa.eu/resource/authority/file-type/RAR',
  'http://publications.europa.eu/resource/authority/file-type/WMS_SRVC',
  'http://publications.europa.eu/resource/authority/file-type/EXE',
  'http://publications.europa.eu/resource/authority/file-type/ICS',
  'http://publications.europa.eu/resource/authority/file-type/MRSID',
  'http://publications.europa.eu/resource/authority/file-type/PL',
  'http://publications.europa.eu/resource/authority/file-type/QGS',
  'http://publications.europa.eu/resource/authority/file-type/SVG',
  'http://publications.europa.eu/resource/authority/file-type/WFS_SRVC',
  'http://publications.europa.eu/resource/authority/file-type/ISO',
  'http://publications.europa.eu/resource/authority/file-type/ISO_ZIP',
  'http://publications.europa.eu/resource/authority/file-type/GRID',
  'http://publications.europa.eu/resource/authority/file-type/XLSB',
  'http://publications.europa.eu/resource/authority/file-type/XLSM',
  'http://publications.europa.eu/resource/authority/file-type/IMMC_XML',
  'http://publications.europa.eu/resource/authority/file-type/HDT',
  'http://publications.europa.eu/resource/authority/file-type/LEG',
  'http://publications.europa.eu/resource/authority/file-type/WMTS_SRVC',
  'http://publications.europa.eu/resource/authority/file-type/7Z',
  'http://publications.europa.eu/resource/authority/file-type/AAC',
  'http://publications.europa.eu/resource/authority/file-type/APPX',
  'http://publications.europa.eu/resource/authority/file-type/ARJ',
  'http://publications.europa.eu/resource/authority/file-type/DMG',
  'http://publications.europa.eu/resource/authority/file-type/JAR',
  'http://publications.europa.eu/resource/authority/file-type/MSI',
  'http://publications.europa.eu/resource/authority/file-type/SWM',
  'http://publications.europa.eu/resource/authority/file-type/APK',
  'http://publications.europa.eu/resource/authority/file-type/BZIP2',
  'http://publications.europa.eu/resource/authority/file-type/DEB',
  'http://publications.europa.eu/resource/authority/file-type/LHA',
  'http://publications.europa.eu/resource/authority/file-type/LZMA',
  'http://publications.europa.eu/resource/authority/file-type/ODP',
  'http://publications.europa.eu/resource/authority/file-type/RDF_TRIX',
  'http://publications.europa.eu/resource/authority/file-type/RPM',
  'http://publications.europa.eu/resource/authority/file-type/SB3',
  'http://publications.europa.eu/resource/authority/file-type/WAR',
  'http://publications.europa.eu/resource/authority/file-type/WIM',
  'http://publications.europa.eu/resource/authority/file-type/XZ',
  'http://publications.europa.eu/resource/authority/file-type/Z',
  'http://publications.europa.eu/resource/authority/file-type/EAR',
  'http://publications.europa.eu/resource/authority/file-type/LZIP',
  'http://publications.europa.eu/resource/authority/file-type/LZO',
  'http://publications.europa.eu/resource/authority/file-type/AKN4EU',
  'http://publications.europa.eu/resource/authority/file-type/FMX4_ZIP',
  'http://publications.europa.eu/resource/authority/file-type/ETSI_XML',
  'http://publications.europa.eu/resource/authority/file-type/GPKG',
  'http://publications.europa.eu/resource/authority/file-type/AKN4EU_ZIP',
  'http://publications.europa.eu/resource/authority/file-type/DGN',
  'http://publications.europa.eu/resource/authority/file-type/DWG',
  'http://publications.europa.eu/resource/authority/file-type/DXF',
  'http://publications.europa.eu/resource/authority/file-type/WCS_SRVC',
  'http://publications.europa.eu/resource/authority/file-type/IPA',
  'http://publications.europa.eu/resource/authority/file-type/GEOTIFF',
  'http://publications.europa.eu/resource/authority/file-type/PDFUA',
  'http://publications.europa.eu/resource/authority/file-type/HTML5',
  'http://publications.europa.eu/resource/authority/file-type/AAB',
  'http://publications.europa.eu/resource/authority/file-type/MIF_MID',
  'http://publications.europa.eu/resource/authority/file-type/UNGEN',
  'http://publications.europa.eu/resource/authority/file-type/ARCINFO_COV',
  'http://publications.europa.eu/resource/authority/file-type/LPK',
  'http://publications.europa.eu/resource/authority/file-type/STL',
  'http://publications.europa.eu/resource/authority/file-type/DAPK',
  'http://publications.europa.eu/resource/authority/file-type/MP3',
  'http://publications.europa.eu/resource/authority/file-type/OAPK',
  'http://publications.europa.eu/resource/authority/file-type/WAV',
  'http://publications.europa.eu/resource/authority/file-type/XHTML5',
  'http://publications.europa.eu/resource/authority/file-type/RDF_THRIFT',
  'http://publications.europa.eu/resource/authority/file-type/GTFS',
  'http://publications.europa.eu/resource/authority/file-type/YAML',
  'http://publications.europa.eu/resource/authority/file-type/EFORMS_XML',
  'http://publications.europa.eu/resource/authority/file-type/WEBP',
  'http://publications.europa.eu/resource/authority/file-type/MOV',
];
