import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { Product } from '../../models/product.model';
import { ProductThumbnailComponent } from '../product-thumbnail/product-thumbnail.component';
import { ProductCardComponent } from '../product-card/product-card.component';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'Test Description',
    category: 'Test Category',
    thumbnail:
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    rating: 4.5,
    stock: 10,
    discountPercentage: 10,
    brand: 'Test Brand',
    returnPolicy: '30 days return',
    images: [
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    ], // Same base64 image
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FavoritesComponent,
        ProductThumbnailComponent,
        ProductCardComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no data message when products array is empty', () => {
    component.products = [];
    fixture.detectChanges();

    const noDataMessage =
      fixture.nativeElement.querySelector('.no-data-message');
    expect(noDataMessage).toBeTruthy();
    expect(noDataMessage.textContent).toContain(
      'No favorite products available.'
    );
  });

  it('should show product thumbnails when products exist', () => {
    component.products = [mockProduct];
    fixture.detectChanges();

    const thumbnails = fixture.nativeElement.querySelectorAll(
      'app-product-thumbnail'
    );
    expect(thumbnails.length).toBe(1);
  });

  it('should show product card when a product is selected', () => {
    component.selectedProduct = mockProduct;
    fixture.detectChanges();

    const productCard = fixture.nativeElement.querySelector('app-product-card');
    expect(productCard).toBeTruthy();
  });

  it('should show overlay when showOverlay is called', () => {
    component.showOverlay(mockProduct);
    fixture.detectChanges();

    expect(component.selectedProduct).toBe(mockProduct);
    const productCard = fixture.nativeElement.querySelector('app-product-card');
    expect(productCard).toBeTruthy();
  });

  it('should hide overlay when hideOverlay is called', () => {
    component.selectedProduct = mockProduct;
    fixture.detectChanges();

    component.hideOverlay();
    fixture.detectChanges();

    expect(component.selectedProduct).toBeUndefined();
    const productCard = fixture.nativeElement.querySelector('app-product-card');
    expect(productCard).toBeFalsy();
  });
});
