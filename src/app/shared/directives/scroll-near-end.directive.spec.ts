import { ScrollNearEndDirective } from './scroll-near-end.directive';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { fromEvent, Subject } from 'rxjs';

describe('ScrollNearEndDirective', () => {
  let directive: ScrollNearEndDirective;
  let elementRef: ElementRef;
  let destroy$: Subject<void>;

  beforeEach(() => {
    elementRef = new ElementRef(document.createElement('div'));
    directive = new ScrollNearEndDirective(elementRef);
    destroy$ = new Subject<void>();
    directive['destroy$'] = destroy$;

    TestBed.configureTestingModule({
      declarations: [ScrollNearEndDirective],
      providers: [{ provide: ElementRef, useValue: elementRef }],
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should not emit nearEnd event when not scrolled near end', () => {
    spyOn(directive.nearEnd, 'emit');

    // Mock the scroll event
    const event = new Event('scroll');
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
    spyOnProperty(
      document.documentElement,
      'scrollHeight',
      'get'
    ).and.returnValue(2000);
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(800);
    spyOnProperty(
      elementRef.nativeElement,
      'scrollHeight',
      'get'
    ).and.returnValue(1800);

    window.dispatchEvent(event);

    expect(directive.nearEnd.emit).not.toHaveBeenCalled();
  });

  it('should not emit nearEnd event when not scrolled near end', () => {
    spyOn(directive.nearEnd, 'emit');

    // Mock the scroll event
    const event = new Event('scroll');
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(100);
    spyOnProperty(
      document.documentElement,
      'scrollHeight',
      'get'
    ).and.returnValue(2000);
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(800);
    spyOnProperty(
      elementRef.nativeElement,
      'scrollHeight',
      'get'
    ).and.returnValue(1800);

    fromEvent(window, 'scroll').subscribe(() =>
      directive['windowScrollEvent']()
    );
    window.dispatchEvent(event);

    expect(directive.nearEnd.emit).not.toHaveBeenCalled();
  });

  it('should complete destroy$ subject on ngOnDestroy', () => {
    spyOn(destroy$, 'next');
    spyOn(destroy$, 'complete');

    directive.ngOnDestroy();

    expect(destroy$.next).toHaveBeenCalled();
    expect(destroy$.complete).toHaveBeenCalled();
  });
});
