import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  constructor(private router: Router) {}

  @Input() path = '';

  public handleBack(): void {
    this.router.navigate([this.path]);
  }
}
