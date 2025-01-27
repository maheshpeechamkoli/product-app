import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent implements OnInit {
  @Output() categoryChange = new EventEmitter<string>();

  categories: Category[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  onCategoryChange(category: string): void {
    this.categoryChange.emit(category);
  }

  fetchCategories(): void {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
