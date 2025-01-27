import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../product/models/product.model';
import { StarRatingPipe } from '../../../../shared/pipe/star-rating-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-thumbnail',
  imports: [CommonModule, StarRatingPipe],
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.scss'],
})
export class ProductThumbnailComponent {
  @Input() product!: Product;
  @Output() cardClick = new EventEmitter<Product>();

  onCardClick(): void {
    this.cardClick.emit(this.product);
  }
}
