import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './groups-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NewGroupComponent } from './new-group/new-group.component';
import { ViewGroupsComponent } from './view-groups/view-groups.component';
import { GroupsHomeComponent } from './groups-home/groups-home.component';

@NgModule({
  declarations: [GroupsHomeComponent, NewGroupComponent, ViewGroupsComponent],
  imports: [CommonModule, GroupsRoutingModule, AngularMaterialModule],
  providers: [],
})
export class GroupsModule {}
