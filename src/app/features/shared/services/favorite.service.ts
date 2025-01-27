import { Injectable } from '@angular/core';
import { StorageService } from '../../../shared/services/storage.service';
import { Product } from '../../product/models/product.model';

@Injectable()
export class FavoriteService {
  private readonly FAVORITES_KEY = 'favorites';

  constructor(private storageService: StorageService) {}

  // Get all favorite products from localStorage
  getFavorites(): Product[] {
    const favorites = this.storageService.getItem(this.FAVORITES_KEY);
    return Array.isArray(favorites) ? favorites : [];
  }

  // Add a product to the favorites list in localStorage
  addToFavorites(product: Product): void {
    const favorites = this.getFavorites();
    if (!favorites.some((favProduct) => favProduct.id === product.id)) {
      favorites.push(product);
      this.storageService.setItem(this.FAVORITES_KEY, favorites);
    }
  }

  // Remove a product from the favorites list in localStorage
  removeFromFavorites(productId: number): void {
    const favorites = this.getFavorites();
    const updatedFavorites = favorites.filter(
      (product) => product.id !== productId
    );
    this.storageService.setItem(this.FAVORITES_KEY, updatedFavorites);
  }

  // Check if a product is in the favorites list
  isFavorite(productId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some((product) => product.id === productId);
  }
}
