import { Component, Input, signal, WritableSignal } from '@angular/core';
import { MyRow, Table_Colmun } from './models/table.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table<T> {
  @Input() data: WritableSignal<MyRow[]> = signal([]);
  @Input() cols: WritableSignal<Table_Colmun<T>[]> = signal([]);
  @Input() isSelectable: boolean = false;

  //we will have the selected rows in a set
  selectedRows: Set<MyRow> = new Set<MyRow>();

  // select & unselect row
  toggleRow(row: MyRow): void {
    if (this.selectedRows?.has(row)) {
      this.selectedRows?.delete(row);
    } else {
      this.selectedRows.add(row);
    }
  }

  //select all
  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selectedRows.clear();
    } else {
      this.data().forEach((d) => this.selectedRows.add(d));
    }
  }

  //check if all is selected or not
  isAllSelected(): boolean {
    return this.data.length > 0 && this.selectedRows.size === this.data.length;
  }

  //single row selection check
  isRowSelected(row: MyRow): boolean {
    return this.selectedRows.has(row);
  }
}
