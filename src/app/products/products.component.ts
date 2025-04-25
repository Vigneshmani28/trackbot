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
import { Products } from '../model/products';
import { ProductService } from '../services/products/product.service';
import { ProductRegistrationComponent } from '../product-registration/product-registration.component';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-products',
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
    SharedModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  dataSource = new MatTableDataSource<Products>([]);
  pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'SNo',
    'NameOfTheProduct',
    'ProductModelNumber',
    'ProductVersion',
    'Category',
    'DataFormat',
    'Manufacturer',
    'Description',
    'Actions',
  ];

  loading = true;

  products: Products[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private menuService: MenuService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.productService.getMockProducts().subscribe({
      next: (products) => {
        this.products = products.map((product, index) => ({
          ...product,
        }));
        this.dataSource.data = this.products;
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

  createProduct() {
    this.router.navigate(['/products/product-registration']);
    this.menuService.setMenu('Products');
  }

  openCompanyForm(dataformats?: any, mode?:string) {
        const dialogRef = this.dialog.open(ProductRegistrationComponent, {
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
