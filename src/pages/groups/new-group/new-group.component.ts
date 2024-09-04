import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Group } from 'src/apiAndObjects/objects/entities/group.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss'],
})
export class NewGroupComponent implements OnInit {
  public form!: UntypedFormGroup;

  public newGroup!: Group;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {}

  public ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
    });
    // this.form.valueChanges.subscribe((changes) => {
    //   this.newGroup.name = changes['name'];
    //   this.newGroup.description = changes['description'];
    // });
  }

  public submitGroup() {
    this.apiService.endpoints.Group.create.call(this.newGroup).then(() => {
      console.debug('success');
    });
  }
}
