import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { StarRatingPipe } from '../../../../shared/pipe/star-rating-pipe';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, StarRatingPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() closeOverlay = new EventEmitter<void>();

  selectedImage: string | undefined;
  isFavorite = false;

  ngOnInit() {
    this.selectedImage = this.product.images[0];
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  close() {
    this.closeOverlay.emit();
  }
}
