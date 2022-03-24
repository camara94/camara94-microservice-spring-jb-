import { MathServiceImpl } from './service/math-service-impl.service';
import { MathContent } from './shared/MathContent';
import { Directive, Input, ElementRef, OnInit, OnChanges, OnDestroy, SimpleChange, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appMathDirective]'
})


export class MathDirectiveDirective implements OnInit, OnChanges, OnDestroy {

  private alive$ = new Subject<boolean>();
  @Input()
  private appMath: MathContent;
  private readonly _el: HTMLElement;

  constructor(private service: MathServiceImpl,
              private el: ElementRef) {
    this._el = el.nativeElement as HTMLElement;
  }



  ngOnInit(): void {
    this.service
      .ready()
      .pipe(
        take(1),
        takeUntil(this.alive$)
      ).subscribe(res => {
        this.service.render(this._el, this.appMath);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnDestroy(): void {
    this.alive$.next(false);
  }

}
