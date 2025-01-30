import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { ProductResponse } from '../models/product-response.model';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch paginated products', () => {
    const mockResponse: ProductResponse<Product> = {
      products: [
        {
          id: 1,
          title: 'Product 1',
          price: 100,
          description: 'Description 1',
          category: 'Category 1',
          thumbnail: 'thumbnail1.jpg',
          rating: 4.5,
          stock: 10,
          discountPercentage: 10,
          brand: 'Brand 1',
          returnPolicy: '30 days return',
          images: [],
        },
        {
          id: 2,
          title: 'Product 2',
          price: 200,
          description: 'Description 2',
          category: 'Category 2',
          thumbnail: 'thumbnail2.jpg',
          rating: 4.0,
          stock: 5,
          discountPercentage: 15,
          brand: 'Brand 2',
          returnPolicy: '14 days return',
          images: [],
        },
      ],
      total: 2,
      skip: 0,
      limit: 30,
    };

    service.getProducts(0, 30).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/products?skip=0&limit=30`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch product categories', () => {
    const mockCategories: Category[] = [
      {
        slug: 'category-1',
        name: 'Category 1',
        url: 'http://example.com/category-1',
      },
      {
        slug: 'category-2',
        name: 'Category 2',
        url: 'http://example.com/category-2',
      },
    ];

    service.getCategories().subscribe((categories) => {
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/categories`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch products by category', () => {
    const mockResponse: ProductResponse<Product> = {
      products: [
        {
          id: 1,
          title: 'Product 1',
          price: 100,
          description: 'Description 1',
          category: 'Category 1',
          thumbnail: 'thumbnail1.jpg',
          rating: 4.5,
          stock: 10,
          discountPercentage: 10,
          brand: 'Brand 1',
          returnPolicy: '30 days return',
          images: [],
        },
      ],
      total: 1,
      skip: 0,
      limit: 30,
    };

    const category = 'Category 1';

    service.getProductsByCategory(category).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/products/category/${category}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
