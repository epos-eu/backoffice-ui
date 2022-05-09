import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { WebService } from 'src/api/models/entities/webService.model';
import { DialogComponent } from 'src/components/dialog/dialog.component';

@Component({
  selector: 'app-browse-web-services-item',
  templateUrl: './browse-web-services-item.component.html',
  styleUrls: ['./browse-web-services-item.component.scss'],
})
export class BrowseWebServicesItemComponent implements OnInit {
  public options: FormGroup;
  private hideRequiredControl = new FormControl(false);
  public floatLabelControl = new FormControl('auto');
  public webservice!: WebService;
  public editModeEnabled = false;

  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog) {
    this.options = this.fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    this.webservice = this.router.getCurrentNavigation()?.extras.state as WebService;
  }

  ngOnInit(): void {
    console.log(this.webservice);
  }

  public handleChange(event: MatSlideToggleChange): void {
    this.editModeEnabled = event.checked;
  }

  public handleDelete(): void {
    console.log('Hit!');
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm delete',
        content: 'Are you sure you want to delete this item?',
        actions: ['Confirm', 'Cancel'],
      },
    });
  }

  public formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleString('en-GB', { timeZone: 'UTC' });
    }
    return 'Invalid date';
  };
}
