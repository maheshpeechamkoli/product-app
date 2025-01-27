import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
})
export class StarRatingPipe implements PipeTransform {
  transform(value: number): string[] {
    const filledStars = Array(Math.floor(value)).fill('★');
    const emptyStars = Array(5 - Math.floor(value)).fill('☆');
    return [...filledStars, ...emptyStars];
  }
}
