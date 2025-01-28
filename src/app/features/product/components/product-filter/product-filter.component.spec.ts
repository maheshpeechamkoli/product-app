import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFilterComponent } from './product-filter.component';
import { Category } from '../../models/category.model';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture<ProductFilterComponent>;

  const mockCategories: Category[] = [
    { name: 'Category 1', slug: 'category-1', url: '/category-1' },
    { name: 'Category 2', slug: 'category-2', url: '/category-2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    component.categories = mockCategories;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all categories in select element', () => {
    const selectElement = fixture.nativeElement.querySelector('select');
    const options = selectElement.querySelectorAll('option');

    // +1 for "All Categories" option
    expect(options.length).toBe(mockCategories.length + 1);
    expect(options[0].textContent.trim()).toBe('All Categories');
    expect(options[1].textContent.trim()).toBe('Category 1');
    expect(options[2].textContent.trim()).toBe('Category 2');
  });

  it('should emit selected category on change', () => {
    const selectElement: HTMLSelectElement =
      fixture.nativeElement.querySelector('select');
    const categoryChangeSpy = spyOn(component.categoryChange, 'emit');

    selectElement.value = 'category-1';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(categoryChangeSpy).toHaveBeenCalledWith('category-1');
  });

  it('should set selected category when input changes', () => {
    component.selectedCategory = 'category-2';
    fixture.detectChanges();

    const selectElement: HTMLSelectElement =
      fixture.nativeElement.querySelector('select');
    const selectedOption = selectElement.querySelector(
      'option[value="category-2"]'
    );

    expect((selectedOption as HTMLOptionElement)?.selected).toBeTruthy();
  });

  it('should handle empty category selection', () => {
    const selectElement: HTMLSelectElement =
      fixture.nativeElement.querySelector('select');
    const categoryChangeSpy = spyOn(component.categoryChange, 'emit');

    selectElement.value = '';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(categoryChangeSpy).toHaveBeenCalledWith('');
  });
});
