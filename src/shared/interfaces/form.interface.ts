import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DataProduct, Identifier, LinkedEntity, PeriodOfTime } from 'generated/backofficeSchemas';

export type TemporalForm = FormGroup<{
  startDate: FormControl<string | undefined>;
  endDate: FormControl<string | undefined>;
}>;

export type IdentifierForm = FormGroup<{
  identifier: FormControl<string | undefined>;
  type: FormControl<string | undefined>;
}>;

export type DataProductForm = FormGroup<{
  instanceId: FormControl<string | undefined>;
  uid: FormControl<string | undefined>;
  generalInformation: FormGroup<{
    title: FormControl<string[] | undefined>;
    description: FormControl<string[] | undefined>;
    keywords: FormControl<string | undefined>;
    versionInfo: FormControl<string | undefined>;
    accrualPeriodicity: FormControl<string | undefined>;
    type: FormControl<string | undefined>;
    issued: FormControl<string | undefined>;
    created: FormControl<string | undefined>;
    modified: FormControl<string | undefined>;
    qualityAssurance: FormControl<string | undefined>;
  }>;
  temporalCoverage: FormGroup<{
    coverage: FormArray<FormControl<PeriodOfTime>>;
  }>;
  persistentIdentifier: FormGroup<{
    identifier: FormArray<FormControl<Identifier>>;
  }>;
  distribution: FormControl<LinkedEntity[]>;
  contactPoint: FormControl<LinkedEntity[]>;
  publisher: FormControl<LinkedEntity[]>;
  changeTimestamp: FormControl<string | undefined>;
  state: FormControl<DataProduct['status'] | undefined>;
}>;

export interface FilterItem {
  option: string;
  label: string;
}
