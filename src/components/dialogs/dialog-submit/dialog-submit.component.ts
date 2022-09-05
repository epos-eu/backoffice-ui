import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-submit',
  templateUrl: './dialog-submit.component.html',
  styleUrls: ['./dialog-submit.component.scss'],
})
export class DialogSubmitComponent implements OnInit {
  public form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      value: '',
      required: true,
    });
  }

  public handleSubmit(): boolean {
    // stuff
    if (this.form.valid) {
      return true;
    }
    return false;
  }
}
