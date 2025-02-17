import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group, UserGroup } from 'generated/backofficeSchemas';
import { concatMap, forkJoin, from, map, Observable } from 'rxjs';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { UserInfoDataSource } from 'src/apiAndObjects/objects/data-source/userInfoDataSource';
import { GroupRequestTable } from 'src/shared/interfaces/group.interface';
import { Entity } from 'src/utility/enums/entity.enum';
import { groupOptions, statusOptions } from './static';
import { UserGroupRequestStatus } from 'src/utility/enums/userGroupRequestStatus.enum';
import { UserRole } from 'src/utility/enums/UserRole.enum';

@Component({
  selector: 'app-browse-groups',
  templateUrl: './browse-groups.component.html',
  styleUrls: ['./browse-groups.component.scss'],
})
export class BrowseGroupsComponent implements AfterViewInit {
  constructor(private apiService: ApiService) {}

  private currentUserId!: string;
  public displayedColumns: string[] = ['id', 'name', 'description', 'role'];
  public requestsColumns: string[] = ['name', 'surname', 'email', 'request', 'status', 'role'];
  public dataSource: MatTableDataSource<Group> = new MatTableDataSource();
  public requestsDataSource: MatTableDataSource<GroupRequestTable | undefined> = new MatTableDataSource();
  public pageSizeOptions = [10, 25, 50, 100];
  public isUserAdmin = false;
  public activeGroupsLoading = true;
  public groupRequestsLoading = true;
  public filters = {
    status: '',
    request: '',
    name: '',
  };
  public statusOptions = statusOptions;
  public groupOptions = groupOptions;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private filterDataSource(data: GroupRequestTable | undefined, filterValue: string): boolean {
    const filters = JSON.parse(filterValue);
    const formatStr = (str: string) => str.trim().toLocaleLowerCase();
    return (
      formatStr(data?.status as string).indexOf(formatStr(filters.status)) >= 0 &&
      formatStr(data?.request as string)?.indexOf(formatStr(filters.request)) >= 0 &&
      (formatStr(data?.firstName as string)?.indexOf(formatStr(filters.name)) >= 0 ||
        formatStr(data?.lastName as string)?.indexOf(formatStr(filters.name)) >= 0)
    );
  }

  private removeDupes(arr: any[], key: string): any[] {
    return arr.filter((obj1, i, arr) => arr.findIndex((obj2) => obj2[key] === obj1[key]) === i);
  }

  private getUserGroups(user: UserInfoDataSource): Observable<Group[][]> {
    const requests: Promise<Group[]>[] = [];
    user.groups.forEach((group: UserGroup) => {
      requests.push(
        this.apiService.endpoints[Entity.GROUP].get.call(
          {
            instanceId: group.groupId as string,
          },
          false,
        ),
      );
    });
    this.currentUserId = user.authIdentifier;
    return forkJoin(requests);
  }

  private getDetailedUserInfo(groupData: Group[][]): Observable<UserInfoDataSource[]> {
    const groups = groupData.flat();
    const users = groups.map((group) => group.users); // Get all the users assigned to these groups we have just fetched.
    const cleanedUsers = this.removeDupes(users.flat(), 'userId'); // Create an array of unique users (remove any duplicates).

    // Use the groups assigned to the user to populate the first table.
    this.dataSource.data = groups
      .filter((group) => group.users?.find((user) => user['userId'] === this.currentUserId))
      .map((group: Group) => {
        return {
          id: group.id,
          name: group.name,
          description: group.description,
          role: group.users?.find((user) => user['userId'] === this.currentUserId)?.['role'],
        };
      });
    this.activeGroupsLoading = false;

    const userRequests = cleanedUsers.map((user) => {
      return this.apiService.endpoints[Entity.USER].getUserById.call(
        {
          instance_id: user.userId as string,
        },
        false,
      );
    });
    return forkJoin(userRequests);
  }

  private initData(): void {
    from(this.apiService.endpoints[Entity.USER].get.call({ available_section: true }))
      .pipe(
        // Step 1: Fetch user groups
        concatMap((user) => {
          this.isUserAdmin = user.isAdmin;
          return this.getUserGroups(user).pipe(
            // Combine users and group data into one object
            map((groups) => ({ user, groups })),
          );
        }),
        // Step 2: Fetch detailed user info and merge with the previous data
        concatMap(({ user, groups }) =>
          this.getDetailedUserInfo(groups).pipe(
            // Merge all data into a single object
            map((detailedInfo) => {
              // Transform the data into an array suitable for the table
              return groups.flatMap((group) =>
                group.flatMap((g) =>
                  g.users?.map((user) => {
                    const userDetails = detailedInfo.find((detail) => detail.authIdentifier === user['userId']);
                    console.log(user);
                    return {
                      firstName: userDetails?.firstName || 'N/A',
                      lastName: userDetails?.lastName || 'N/A',
                      email: userDetails?.email || 'N/A',
                      request: g.name || 'N/A',
                      status: (user['requestStatus'] as UserGroupRequestStatus) || 'N/A',
                      role: (user['role'] as UserRole) || 'N/A',
                    };
                  }),
                ),
              );
            }),
          ),
        ),
      )
      .subscribe((tableData: (GroupRequestTable | undefined)[]) => {
        const groupedRequests = tableData.filter((item) => item?.role === 'ADMIN').map((item) => item?.request);
        // Group items for those requests
        const filteredGroupedAdmins = tableData.filter(
          (item) => groupedRequests.includes(item?.request), // Keep items for matched requests
        );
        this.requestsDataSource.data = filteredGroupedAdmins;
        this.groupRequestsLoading = false;
      });
  }

  public ngOnInit(): void {
    this.initData();
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource([] as Array<Group>);
    this.requestsDataSource.filterPredicate = this.filterDataSource;
  }

  public rowClicked(event: Group): void {
    console.debug(event);
    this.apiService.endpoints.Group.get.call({ instanceId: event.id! }).then((value) => {
      console.debug(value);
    });
  }

  public handleFilterByStatus(event: MatSelectChange): void {
    this.filters.status = event.value;
  }

  public handleViewResults(): void {
    this.requestsDataSource.filter = JSON.stringify(this.filters);
  }

  public handleClear(): void {
    this.filters.status = '';
    this.filters.request = '';
    this.filters.name = '';
    this.requestsDataSource.filter = '';
  }

  public handleNameSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.filters.name = target.value;
  }
}
