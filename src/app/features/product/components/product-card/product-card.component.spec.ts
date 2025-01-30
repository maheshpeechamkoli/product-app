import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product.model';
import { StarRatingPipe } from '../../../../shared/pipe/star-rating-pipe';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

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
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', // Add second image
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent, StarRatingPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    component.selectedImage = mockProduct.images[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details correctly', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('.product-title').textContent).toContain(
      mockProduct.title
    );
    expect(compiled.querySelector('.product-brand').textContent).toContain(
      mockProduct.brand
    );
    expect(compiled.querySelector('.product-subtitle').textContent).toContain(
      mockProduct.description
    );
    expect(compiled.querySelector('.price').textContent).toContain(
      mockProduct.price
    );
    expect(compiled.querySelector('.promo-message').textContent).toContain(
      mockProduct.returnPolicy
    );
  });

  it('should change selected image when thumbnail is clicked', () => {
    const thumbnails = fixture.nativeElement.querySelectorAll('.thumbnail');
    const newImage = mockProduct.images[1];

    thumbnails[1].click();
    expect(component.selectedImage).toBe(newImage);
  });

  it('should toggle favorite status when favorite button is clicked', () => {
    const favoriteBtn = fixture.nativeElement.querySelector('.favorite-btn');
    const initialState = component.isFavorite;

    favoriteBtn.click();
    expect(component.isFavorite).toBe(!initialState);

    favoriteBtn.click();
    expect(component.isFavorite).toBe(initialState);
  });

  it('should emit closeOverlay event when close button is clicked', () => {
    spyOn(component.closeOverlay, 'emit');
    const backButton = fixture.nativeElement.querySelector('.back-button');

    backButton.click();
    expect(component.closeOverlay.emit).toHaveBeenCalled();
  });

  it('should emit closeOverlay event when purchase more link is clicked', () => {
    spyOn(component.closeOverlay, 'emit');
    const purchaseMore = fixture.nativeElement.querySelector('.purchase-more');

    purchaseMore.click();
    expect(component.closeOverlay.emit).toHaveBeenCalled();
  });

  it('should initialize selectedImage to the first image in the product images array', () => {
    expect(component.selectedImage).toBe(mockProduct.images[0]);
  });

  it('should update selectedImage when a thumbnail is clicked', () => {
    const thumbnail = fixture.nativeElement.querySelectorAll('.thumbnail')[1];
    const newImage = mockProduct.images[1];

    thumbnail.click();
    expect(component.selectedImage).toBe(newImage);
  });
});
