import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/components/layout/layout.component';
import { GroupsHomeComponent } from './groups-home/groups-home.component';
import { ViewGroupsComponent } from './view-groups/view-groups.component';
import { NewGroupComponent } from './new-group/new-group.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: GroupsHomeComponent }],
  },
  {
    path: 'new-group',
    component: LayoutComponent,
    children: [{ path: '', component: NewGroupComponent }],
  },
  {
    path: 'view-groups',
    component: LayoutComponent,
    children: [{ path: '', component: ViewGroupsComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
