import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ScrollNearEndDirective } from '../../../../shared/directives/scroll-near-end.directive';
import { finalize } from 'rxjs';
import { ProductResponse } from '../../models/product-response.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductThumbnailComponent } from '../product-thumbnail/product-thumbnail.component';

@Component({
  selector: 'app-product-list',
  imports: [
    CommonModule,
    ProductFilterComponent,
    ScrollNearEndDirective,
    ProductCardComponent,
    ProductThumbnailComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  totalProducts: number | undefined;
  selectedProduct: Product | undefined = undefined;
  selectedCategory = '';
  currentPage = 1;
  itemsPerPage = 20;
  isLastPage = false;
  isLoading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
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

  showOverlay(product: Product) {
    this.selectedProduct = product;
  }

  hideOverlay() {
    this.selectedProduct = undefined;
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
  private handleFetchedProducts(data: ProductResponse<Product>): void {
    this.totalProducts = data.total;
    this.products = this.selectedCategory
      ? data.products
      : [...this.products, ...data.products];

    this.isLastPage = data.products.length < this.itemsPerPage;
  }
}
