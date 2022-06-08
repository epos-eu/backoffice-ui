import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/components/layout/layout.component';
import { ImportHomeComponent } from './import-home/import-home.component';
import { ImportStatusComponent } from './import-status/import-status.component';
import { NewImportComponent } from './new-import/new-import.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: ImportHomeComponent }],
  },
  {
    path: 'new-import',
    component: LayoutComponent,
    children: [{ path: '', component: NewImportComponent }],
  },
  {
    path: 'import-status',
    component: LayoutComponent,
    children: [{ path: '', component: ImportStatusComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportRoutingModule {}
