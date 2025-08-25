import { TemplateRef } from '@angular/core';

export interface Table_Colmun<T> {
  key: string;
  header: string;
  width?: string;
  cellTemplate?: TemplateRef<any>; // the custom content we will render for cells if want
  selectable?: boolean;
}

export interface MyRow {
  [key: string]: any;
}
