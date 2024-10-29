import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../baseDialogService.abstract';
import { ActiveUserService } from 'src/services/activeUser.service';
import { Group } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';

interface NewDataProductDialog {
  create: boolean;
  group: Group | undefined;
}

@Component({
  selector: 'app-dialog-new-dataproduct',
  templateUrl: './dialog-new-dataproduct.component.html',
  styleUrls: ['./dialog-new-dataproduct.component.scss'],
})
export class DialogNewDataproductComponent {
  public groups: Array<Group> = [];
  public selectedGroup!: Group | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData<null, NewDataProductDialog>,
    private activeUserService: ActiveUserService,
    private apiService: ApiService,
  ) {
    const userIds = this.activeUserService
      .getActiveUser()
      ?.groups?.map((group) => (group.groupId ? group.groupId : ''));

    if (null != userIds) {
      this.getUserRelevantGroups(userIds);
    }
  }

  public handleCancel(): void {
    this.data.dataOut.create = false;
    this.data.close();
  }

  public handleCreate(): void {
    this.data.dataOut.group = this.selectedGroup!;
    this.data.dataOut.create = true;
    this.data.close();
  }

  private getUserRelevantGroups(userIds: Array<string>): void {
    this.apiService.endpoints.Group.getAll.call().then((allGroups: Array<Group>) => {
      this.groups = allGroups.filter((group) => userIds.some((userIds) => group.id === userIds));
    });
  }
}
