import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';
import { ProductThumbnailComponent } from '../product-thumbnail/product-thumbnail.component';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, ProductCardComponent, ProductThumbnailComponent],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers: [FavoriteService],
})
export class FavoritesComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | undefined = undefined;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  showOverlay(product: Product) {
    this.selectedProduct = product;
  }

  hideOverlay() {
    this.selectedProduct = undefined;
    this.loadFavorites();
  }

  private loadFavorites(): void {
    this.products = this.favoriteService.getFavorites();
  }
}
