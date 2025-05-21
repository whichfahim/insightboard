import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  imports: [MatTableModule, MatPaginatorModule],
  template: `
    <div class="mat-elevation-z8">
      <table mat-table [dataSource]="dataSource">
        <!-- Position Column -->
        <ng-container matColumnDef="ID">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let element">{{ element.ID }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let element">{{ element.name }}</td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let element">{{ element.status }}</td>
        </ng-container>

        <!-- Symbol Column -->
        <!-- <ng-container matColumnDef="symbol">
          <th mat-header-cell *matHeaderCellDef>Symbol</th>
          <td mat-cell *matCellDef="let element">{{ element.symbol }}</td>
        </ng-container> -->

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons
        aria-label="Select page of periodic elements"
      >
      </mat-paginator>
    </div>
  `,
  styles: `
    table {
    width: 100%;
  }

    .activity-span{
      display: block;
      margin-bottom: 5px !important;
    }
    .task{
      margin-bottom: 5px;
      font-weight: bold;
    }

    .timestamp{
      margin:0;
      color: grey;
    }
  `,
})
export class DataTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['ID', 'name', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  ID: number;
  name: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { ID: 1, name: 'John Doe', status: 'Active' },
  { ID: 2, name: 'Jane Smith', status: 'Inactive' },
  { ID: 3, name: 'Emily Dayk', status: 'Active' },
  { ID: 4, name: 'Michael Brown', status: 'Inactive' },
  { ID: 5, name: 'John Smith', status: 'Active' },
  { ID: 6, name: 'Carbon', status: 'C' },
  { ID: 7, name: 'Nitrogen', status: 'N' },
  { ID: 8, name: 'Oxygen', status: 'O' },
  { ID: 9, name: 'Fluorine', status: 'F' },
  { ID: 10, name: 'Neon', status: 'Ne' },
  { ID: 11, name: 'Sodium', status: 'Na' },
  { ID: 12, name: 'Magnesium', status: 'Mg' },
  { ID: 13, name: 'Aluminum', status: 'Al' },
  { ID: 14, name: 'Silicon', status: 'Si' },
  { ID: 15, name: 'Phosphorus', status: 'P' },
  { ID: 16, name: 'Sulfur', status: 'S' },
  { ID: 17, name: 'Chlorine', status: 'Cl' },
  { ID: 18, name: 'Argon', status: 'Ar' },
  { ID: 19, name: 'Potassium', status: 'K' },
  { ID: 20, name: 'Calcium', status: 'Ca' },
];
