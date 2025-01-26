import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ScrollNearEndDirective } from '../../../../shared/directives/scroll-near-end.directive';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

// Define the ProductResponse interface
interface ProductResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      description: 'Description of Product 1',
      category: 'Category A',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      rating: 4.5,
      stock: 10,
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      description: 'Description of Product 2',
      category: 'Category B',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      rating: 3.8,
      stock: 5,
      images: [
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ],
    },
  ];

  const mockProductResponse: ProductResponse<Product> = {
    products: mockProducts,
    total: 2,
    skip: 0,
    limit: 20,
  };

  beforeEach(() => {
    // Create a spy object for the ProductService
    productService = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'getProductsByCategory',
    ]);

    // Mock the getProducts method to return the mock response
    productService.getProducts.and.returnValue(of(mockProductResponse));

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ProductListComponent, // Import the standalone component here
        ProductFilterComponent,
        ScrollNearEndDirective,
      ],
      providers: [
        { provide: ProductService, useValue: productService },
        provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient
        provideHttpClientTesting(), // Provide HttpClientTesting
      ],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should call fetchProducts on ngOnInit', () => {
    spyOn(component, 'fetchProducts');
    component.ngOnInit();
    expect(component.fetchProducts).toHaveBeenCalled();
  });

  it('should update selectedCategory and call fetchProducts on category change', () => {
    spyOn(component, 'fetchProducts');
    const newCategory = 'Electronics';

    component.onCategoryChange(newCategory);

    expect(component.selectedCategory).toBe(newCategory);
    expect(component.fetchProducts).toHaveBeenCalled();
  });

  it('should not fetch more products if isLastPage or isLoading is true', () => {
    spyOn(component, 'fetchProducts');

    // Setting the conditions where products should not be fetched
    component.isLastPage = true;
    component.loadMoreProducts();
    expect(component.fetchProducts).not.toHaveBeenCalled();

    component.isLastPage = false;
    component.isLoading = true;
    component.loadMoreProducts();
    expect(component.fetchProducts).not.toHaveBeenCalled();
  });

  it('should call loadMoreProducts when conditions are met', () => {
    component.isLastPage = false;
    component.isLoading = false;
    component.selectedCategory = ''; // No category selected

    spyOn(component, 'fetchProducts');

    component.loadMoreProducts();

    expect(component.fetchProducts).toHaveBeenCalled();
  });

  it('should not call loadMoreProducts if it is the last page', () => {
    component.isLastPage = true;
    component.isLoading = false;
    component.selectedCategory = '';

    spyOn(component, 'fetchProducts');

    component.loadMoreProducts();

    expect(component.fetchProducts).not.toHaveBeenCalled();
  });

  it('should not call loadMoreProducts if a category is selected', () => {
    component.isLastPage = false;
    component.isLoading = false;
    component.selectedCategory = 'Electronics'; // Category selected

    spyOn(component, 'fetchProducts');

    component.loadMoreProducts();

    expect(component.fetchProducts).not.toHaveBeenCalled();
  });

  it('should not call loadMoreProducts if it is loading', () => {
    component.isLastPage = false;
    component.isLoading = true;
    component.selectedCategory = '';

    spyOn(component, 'fetchProducts');

    component.loadMoreProducts();

    expect(component.fetchProducts).not.toHaveBeenCalled();
  });
});
