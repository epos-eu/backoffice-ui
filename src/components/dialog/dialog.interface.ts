import { TemplateRef } from '@angular/core';

export interface IDialog {
  title: string;
  content: TemplateRef<unknown>;
  actionConfirm: string;
  actionCancel: string;
}
