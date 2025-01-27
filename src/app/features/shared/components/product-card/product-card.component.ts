import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../product/models/product.model';
import { CommonModule } from '@angular/common';
import { StarRatingPipe } from '../../../../shared/pipe/star-rating-pipe';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, StarRatingPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  providers: [FavoriteService],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() closeOverlay = new EventEmitter<void>();

  selectedImage: string | undefined;
  isFavorite = false;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.selectedImage = this.product.images[0];
    // Check if the product is already in favorites using FavoriteService
    this.isFavorite = this.favoriteService.isFavorite(this.product.id);
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoriteService.removeFromFavorites(this.product.id);
    } else {
      this.favoriteService.addToFavorites(this.product);
    }
    // Toggle the favorite state
    this.isFavorite = !this.isFavorite;
  }

  close() {
    this.closeOverlay.emit();
  }
}
