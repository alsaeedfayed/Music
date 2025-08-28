import {
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  NgZone,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { auditTime, filter, fromEvent, map } from 'rxjs';

@Directive({
  selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective {
  private zone = inject(NgZone);
  private el = inject(ElementRef<HTMLElement>);
  private destroyRef = inject(DestroyRef);
  //distance from button to detect its end
  threshold = input(100);
  loading = input(false);

  //fire once reach end
  reachEnd = output<void>();
  isAtBottom = signal(false);

  constructor() {
    this.zone.runOutsideAngular(() => {
      fromEvent(this.el.nativeElement, 'scroll')
        .pipe(
          auditTime(100), //threshold scroll
          map(() => {
            const el = this.el.nativeElement;
            return (
              el.scrollHeight - el.scrollTop - el.clientHeight <=
              this.threshold()
            );
          }),
          filter((atBottom) => atBottom && !this.loading()), // only emit if not loading
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.zone.run(() => {
            this.isAtBottom.set(true);
            this.reachEnd.emit();
          });
        });
    });
    effect(() => {
      if (this.isAtBottom()) {
        queueMicrotask(() => this.isAtBottom.set(false));
      }
    });
  }
}
