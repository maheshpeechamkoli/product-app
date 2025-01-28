import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent {
  @Output() categoryChange = new EventEmitter<string>();
  @Input() categories: Category[] = [];
  @Input() selectedCategory = '';

  onCategoryChange(category: string): void {
    this.categoryChange.emit(category);
  }
}
