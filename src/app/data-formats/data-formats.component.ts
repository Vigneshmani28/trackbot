import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';
import { DataFormatsServiceService } from '../services/data-formats/data-formats-service.service';
import { DataFormats } from '../model/data-formats';
import { DataFormatRegistrationComponent } from '../data-format-registration/data-format-registration.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-data-formats',
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPseudoCheckboxModule,
  ],
  templateUrl: './data-formats.component.html',
  styleUrl: './data-formats.component.css',
})
export class DataFormatsComponent {
  dataSource = new MatTableDataSource<DataFormats>([]);
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'SNo',
    'DataFormatName',
    'CreationDate',
    'EncryptionEnabled',
    'TypeOfEncryption',
    'Actions',
  ];

  loading = true;

  dataFormats: DataFormats[] = [];

  constructor(
    private dataFormatService: DataFormatsServiceService,
    private router: Router,
    private menuService: MenuService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataFormatService.getMockDataFormats().subscribe({
      next: (formats) => {
        this.dataFormats = formats.map((format, index) => ({
          ...format,
        }));
        this.dataSource.data = this.dataFormats;
        this.loading = false;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }

  createDataFormat() {
    this.router.navigate(['/data-formats/data-format-registration']);
    this.menuService.setMenu('Data Formats');
  }

  openCompanyForm(dataformats?: any, mode?:string) {
        const dialogRef = this.dialog.open(DataFormatRegistrationComponent, {
          width: '100vw',
          maxWidth: '1000px',
          height: '90vh',
          maxHeight: '100vh',
          data: {
            ...dataformats,
            mode: mode 
          }
        });
        
    
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            console.log('Customer added/updated successfully.');
          }
        });
      }
}
