import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appScrollNearEnd]',
})
export class ScrollNearEndDirective implements OnInit, OnDestroy {
  @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Threshold in pixels when to emit before page end scroll.
   */
  @Input() threshold = 120;

  /**
   * Debounce time in milliseconds.
   */
  @Input() debounceTime = 200; // Adjust as needed

  private destroy$ = new Subject<void>();

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // Listen to scroll events with debounce
    fromEvent(window, 'scroll')
      .pipe(
        debounceTime(this.debounceTime), // Throttle scroll events
        takeUntil(this.destroy$) // Clean up on directive destruction
      )
      .subscribe(() => this.windowScrollEvent());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private windowScrollEvent(): void {
    const heightOfWholePage = document.documentElement.scrollHeight;
    const heightOfElement = this.el.nativeElement.scrollHeight;
    const currentScrolledY = window.scrollY;
    const innerHeight = window.innerHeight;

    const spaceOfElementAndPage = heightOfWholePage - heightOfElement;
    const scrollToBottom =
      heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;

    if (scrollToBottom < this.threshold) {
      this.nearEnd.emit();
    }
  }
}
