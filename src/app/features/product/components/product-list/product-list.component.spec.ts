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
      thumbnail:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      rating: 4.5,
      stock: 10,
      discountPercentage: 10,
      brand: 'Brand A',
      returnPolicy: '30 days return',
      images: [
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      ],
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      description: 'Description of Product 2',
      category: 'Category B',
      thumbnail:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA8',
      rating: 3.8,
      stock: 5,
      discountPercentage: 15,
      brand: 'Brand B',
      returnPolicy: '14 days return',
      images: [
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA9',
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
        ProductListComponent,
        ProductFilterComponent,
        ScrollNearEndDirective,
      ],
      providers: [
        { provide: ProductService, useValue: productService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
    component.selectedCategory = 'Electronics';

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

  it('should track product by id', () => {
    const product = mockProducts[0];
    const result = component.trackByProductId(0, product);
    expect(result).toBe(product.id);
  });

  it('should call fetchCategories on ngOnInit', () => {
    spyOn(component, 'fetchCategories');
    component.ngOnInit();
    expect(component.fetchCategories).toHaveBeenCalled();
  });

  it('should handle fetched products and update product list', () => {
    component.handleFetchedProducts(mockProductResponse);

    expect(component.totalProducts).toBe(mockProductResponse.total);
    expect(component.products).toEqual(mockProductResponse.products);
    expect(component.isLastPage).toBeTrue();
  });

  it('should append fetched products to existing product list if no category is selected', () => {
    component.products = [mockProducts[0]];
    component.selectedCategory = '';

    const newProductResponse: ProductResponse<Product> = {
      products: [mockProducts[1]],
      total: 2,
      skip: 0,
      limit: 20,
    };

    component.handleFetchedProducts(newProductResponse);

    expect(component.totalProducts).toBe(newProductResponse.total);
    expect(component.products).toEqual([mockProducts[0], mockProducts[1]]);
    expect(component.isLastPage).toBeTrue();
  });
});
