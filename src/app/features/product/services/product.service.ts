import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';
import { ProductResponse } from '../models/product-response.model';
import { Category } from '../models/category.model';

@Injectable()
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Fetch paginated products
  getProducts(skip = 0, limit = 30): Observable<ProductResponse<Product>> {
    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('limit', limit.toString());

    return this.http.get<ProductResponse<Product>>(`${this.apiUrl}/products`, {
      params,
    });
  }

  // Fetch product categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/products/categories`);
  }

  // Fetch products by category
  getProductsByCategory(
    category: string
  ): Observable<ProductResponse<Product>> {
    return this.http.get<ProductResponse<Product>>(
      `${this.apiUrl}/products/category/${category}`
    );
  }
}
