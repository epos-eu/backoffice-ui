import { SectionName } from 'src/utility/enums/sectionName.enum';
import { SectionColumn } from './sectionColumn';
import { SectionItem } from './sectionItem';

export interface Sections {
  sectionName: SectionName;
  columns: Array<SectionColumn>;
  items: Array<SectionItem>;
}
