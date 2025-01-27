import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';

export const productRoutes: Routes = [
  { path: '', component: ProductListComponent },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./components/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
];
