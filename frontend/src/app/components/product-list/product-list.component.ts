import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.isLoading = false;
      },
      error => {
        console.error('Erreur lors du chargement des produits:', error);
        this.error = 'Impossible de charger les produits. Veuillez réessayer plus tard.';
        this.isLoading = false;
      }
    );
  }

  searchProducts(): void {
    if (!this.searchTerm) {
      this.filteredProducts = [...this.products];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(term) || 
      product.description?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term)
    );
  }

  sortProducts(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredProducts.sort((a, b) => {
      const valueA = a[column] || '';
      const valueB = b[column] || '';

      if (typeof valueA === 'string') {
        return this.sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      } else {
        return this.sortDirection === 'asc' 
          ? valueA - valueB 
          : valueB - valueA;
      }
    });
  }
}