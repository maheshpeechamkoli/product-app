import { TestBed } from '@angular/core/testing';
import { FavoriteService } from './favorite.service';
import { StorageService } from '../../../shared/services/storage.service';
import { Product } from '../models/product.model';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let storageService: jasmine.SpyObj<StorageService>;

  const mockProduct1: Product = {
    id: 1,
    title: 'Product 1',
    price: 100,
    description: 'Description of Product 1',
    category: 'Category A',
    thumbnail: 'thumbnail1.jpg',
    rating: 4.5,
    stock: 10,
    discountPercentage: 10,
    brand: 'Brand A',
    returnPolicy: '30 days return',
    images: ['image1.jpg', 'image2.jpg'],
  };

  const mockProduct2: Product = {
    id: 2,
    title: 'Product 2',
    price: 200,
    description: 'Description of Product 2',
    category: 'Category B',
    thumbnail: 'thumbnail2.jpg',
    rating: 3.8,
    stock: 5,
    discountPercentage: 15,
    brand: 'Brand B',
    returnPolicy: '14 days return',
    images: ['image3.jpg', 'image4.jpg'],
  };

  beforeEach(() => {
    const storageServiceSpy = jasmine.createSpyObj('StorageService', [
      'getItem',
      'setItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        FavoriteService,
        { provide: StorageService, useValue: storageServiceSpy },
      ],
    });

    service = TestBed.inject(FavoriteService);
    storageService = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if no favorites are stored', () => {
    storageService.getItem.and.returnValue(null);

    const favorites = service.getFavorites();

    expect(favorites).toEqual([]);
    expect(storageService.getItem).toHaveBeenCalledWith('favorites');
  });

  it('should return the list of favorites from localStorage', () => {
    const mockFavorites = [mockProduct1, mockProduct2];
    storageService.getItem.and.returnValue(mockFavorites);

    const favorites = service.getFavorites();

    expect(favorites).toEqual(mockFavorites);
    expect(storageService.getItem).toHaveBeenCalledWith('favorites');
  });

  it('should add a product to favorites if it does not already exist', () => {
    storageService.getItem.and.returnValue([]);
    const setItemSpy = storageService.setItem.and.callThrough();

    service.addToFavorites(mockProduct1);

    expect(setItemSpy).toHaveBeenCalledWith('favorites', [mockProduct1]);
  });

  it('should not add a product to favorites if it already exists', () => {
    storageService.getItem.and.returnValue([mockProduct1]);
    const setItemSpy = storageService.setItem.and.callThrough();

    service.addToFavorites(mockProduct1);

    expect(setItemSpy).not.toHaveBeenCalled();
  });

  it('should remove a product from favorites if it exists', () => {
    storageService.getItem.and.returnValue([mockProduct1, mockProduct2]);
    const setItemSpy = storageService.setItem.and.callThrough();

    service.removeFromFavorites(mockProduct1.id);

    expect(setItemSpy).toHaveBeenCalledWith('favorites', [mockProduct2]);
  });

  it('should return the list of favorites from localStorage', () => {
    const mockFavorites = [mockProduct1, mockProduct2];
    storageService.getItem.and.returnValue(mockFavorites);

    const favorites = service.getFavorites();

    expect(favorites).toEqual(mockFavorites);
    expect(storageService.getItem).toHaveBeenCalledWith('favorites');
  });

  it('should return true if the product is in favorites', () => {
    storageService.getItem.and.returnValue([mockProduct1, mockProduct2]);

    const isFavorite = service.isFavorite(mockProduct1.id);

    expect(isFavorite).toBeTrue();
  });

  it('should return false if the product is not in favorites', () => {
    storageService.getItem.and.returnValue([mockProduct2]);

    const isFavorite = service.isFavorite(mockProduct1.id);

    expect(isFavorite).toBeFalse();
  });

  it('should remove a product from favorites if it exists', () => {
    storageService.getItem.and.returnValue([mockProduct1, mockProduct2]);
    service.removeFromFavorites(mockProduct1.id);

    expect(storageService.setItem).toHaveBeenCalledWith('favorites', [
      mockProduct2,
    ]);
  });

  it('should return false if the product is not in favorites', () => {
    storageService.getItem.and.returnValue([mockProduct2]);

    const isFavorite = service.isFavorite(mockProduct1.id);

    expect(isFavorite).toBeFalse();
  });

  it('should remove a product from favorites if it exists', () => {
    storageService.getItem.and.returnValue([mockProduct1, mockProduct2]);
    service.removeFromFavorites(mockProduct1.id);

    expect(storageService.setItem).toHaveBeenCalledWith('favorites', [
      mockProduct2,
    ]);
  });

  it('should handle empty favorites list when adding a product', () => {
    storageService.getItem.and.returnValue(null);
    service.addToFavorites(mockProduct1);

    expect(storageService.setItem).toHaveBeenCalledWith('favorites', [
      mockProduct1,
    ]);
  });
});
