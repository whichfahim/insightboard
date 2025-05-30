import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ApiService } from '../../../services/api.service';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
  ],
  template: `
    <mat-card>
      <mat-progress-spinner
        *ngIf="loading"
        mode="indeterminate"
        diameter="40"
      ></mat-progress-spinner>

      <table
        mat-table
        [dataSource]="dataSource"
        class="mat-elevation-z8"
        *ngIf="!loading"
      >
        <!-- ID Column -->
        <ng-container matColumnDef="ID">
          <th mat-header-cell *matHeaderCellDef>ID</th>
          <td mat-cell *matCellDef="let user">{{ user.ID }}</td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Name</th>
          <td mat-cell *matCellDef="let user">{{ user.name }}</td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let user">
            <div [ngClass]="user.status === 'Active' ? 'active' : 'inactive'">
              {{ user.status }}
            </div>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        [pageSize]="5"
        [pageSizeOptions]="[5, 10, 20]"
      ></mat-paginator>
    </mat-card>
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

    .active {
      text-align:center;
      padding:5px 10px;
      border-radius:2rem;
  background-color: #55C17C;
  font-weight: bold;
  color: whitesmoke;
}

.inactive {
  padding: 5px 10px;
  background-color: #E8EBED;
  font-weight: bold;
  border-radius:20px;
}
  `,
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'name', 'status'];
  dataSource = new MatTableDataSource<any>();
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getDataTable().subscribe({
      next: (response: any) => {
        this.dataSource.data = response.data;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.loading = false;
      },
    });
  }
}
