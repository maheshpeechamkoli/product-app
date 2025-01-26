import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductService],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: string[] = [];

  currentPage = 1; // Current page number
  itemsPerPage = 30; // Number of items per page

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchAllProducts();
    this.fetchCategories();
  }

  fetchAllProducts(): void {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    this.productService
      .getProducts(skip, this.itemsPerPage)
      .subscribe((data) => {
        this.products = data.products;
      });
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onCategoryChange(category: string): void {
    this.currentPage = 1;
    if (category) {
      this.fetchProductsByCategory(category);
    } else {
      this.fetchAllProducts();
    }
  }

  private fetchProductsByCategory(category: string): void {
    this.productService.getProductsByCategory(category).subscribe((data) => {
      this.products = data.products;
    });
  }
}
