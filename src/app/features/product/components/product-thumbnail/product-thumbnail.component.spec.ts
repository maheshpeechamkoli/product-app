import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductThumbnailComponent } from './product-thumbnail.component';
import { Product } from '../../models/product.model';
import { StarRatingPipe } from '../../../../shared/pipe/star-rating-pipe';

describe('ProductThumbnailComponent', () => {
  let component: ProductThumbnailComponent;
  let fixture: ComponentFixture<ProductThumbnailComponent>;

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
      imports: [ProductThumbnailComponent, StarRatingPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductThumbnailComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details correctly', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('h3').textContent).toContain(
      mockProduct.title
    );
    expect(compiled.querySelector('p').textContent).toContain(
      mockProduct.price.toString()
    );
    expect(compiled.querySelector('img').src).toContain(mockProduct.thumbnail);
    expect(compiled.querySelector('img').alt).toBe(mockProduct.title);
  });

  it('should emit cardClick event when card is clicked', () => {
    spyOn(component.cardClick, 'emit');
    const card = fixture.nativeElement.querySelector('.product-card');

    card.click();
    expect(component.cardClick.emit).toHaveBeenCalled();
  });

  it('should emit cardClick event on enter key press', () => {
    spyOn(component.cardClick, 'emit');
    const card = fixture.nativeElement.querySelector('.product-card');

    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    card.dispatchEvent(enterEvent);

    expect(component.cardClick.emit).toHaveBeenCalled();
  });

  it('should display correct rating stars', () => {
    const compiled = fixture.nativeElement;
    const ratingStars = compiled.querySelectorAll('.rating span');
    expect(ratingStars.length).toBeGreaterThan(0);
  });

  it('should have correct accessibility attributes', () => {
    const compiled = fixture.nativeElement;
    const card = compiled.querySelector('.product-card');

    expect(card.getAttribute('tabindex')).toBe('0');
    expect(compiled.querySelector('img').hasAttribute('alt')).toBeTruthy();
  });

  it('should load image with lazy loading', () => {
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img.getAttribute('loading')).toBe('lazy');
  });
});
