import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ScrollNearEndDirective } from '../../../../shared/directives/scroll-near-end.directive';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, ProductFilterComponent, ScrollNearEndDirective],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedCategory = '';

  currentPage = 1;
  itemsPerPage = 20;
  isLastPage = false;
  isLoading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  /**
   * Fetches products from the server.
   */
  fetchProducts(): void {
    this.isLoading = true;
    // Calculate the number of items to skip based on the current page.
    const skip = (this.currentPage - 1) * this.itemsPerPage;

    // Fetch products based on the selected category or all products.
    const fetch$ = this.selectedCategory
      ? this.productService.getProductsByCategory(this.selectedCategory)
      : this.productService.getProducts(skip, this.itemsPerPage);

    fetch$.pipe(finalize(() => (this.isLoading = false))).subscribe({
      next: (data) => this.handleFetchedProducts(data),
      error: (err) => {
        console.error('Failed to fetch products:', err);
      },
    });
  }

  /**
   * Handles category change event.
   * @param category The selected category.
   */
  onCategoryChange(category: string): void {
    this.currentPage = 1;
    this.isLastPage = false;
    this.selectedCategory = category;
    this.products = [];
    this.fetchProducts();
  }

  /**
   * Loads more products when the user scrolls near the end.
   */
  loadMoreProducts(): void {
    if (this.isLastPage || this.isLoading || this.selectedCategory) {
      return;
    }
    this.currentPage++;
    this.fetchProducts();
  }

  /**
   * Handles the fetched products and updates the product list.
   * @param data The fetched product data.
   */
  private handleFetchedProducts(data: { products: Product[] }): void {
    this.products = this.selectedCategory
      ? data.products
      : [...this.products, ...data.products];

    this.isLastPage = data.products.length < this.itemsPerPage;
  }
}
