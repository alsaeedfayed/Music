import {
  Component,
  Input,
  ContentChild,
  TemplateRef,
  WritableSignal,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  inject,
  effect,
} from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { register } from 'swiper/element/bundle';
import { CommonModule, isPlatformBrowser } from '@angular/common';

register();
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-swipper',
  templateUrl: './swipper.html',
  styleUrls: ['./swipper.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class SwipperCmp implements AfterViewInit, OnDestroy {
  @Input({ required: true }) data!: WritableSignal<any[]>;
  @ContentChild(TemplateRef) slideTemplate!: TemplateRef<any>;
  @Input() delayTime!: number;
  private swiperInstance?: Swiper;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // watch for data changes
      effect(() => {
        const items = this.data();
        if (items.length > 0) {
          this.initSwiper();
        }
      });
    }
  }
  ngAfterViewInit() {}

  private initSwiper() {
    // if (isPlatformBrowser(this.platformId) && this.swiperInstance) {
    //   this.swiperInstance.destroy(true, true);
    // }

    this.swiperInstance = new Swiper('.swiper', {
      spaceBetween: 0,
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1400: { slidesPerView: 4 },
        1600: { slidesPerView: 5 },
      },
      navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
      },
      // pagination: { el: '.swiper-pagination' },
      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
        waitForTransition: true,
      },
      loop: true, // infinite loop
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.swiperInstance) {
      // this.swiperInstance.destroy(true, true);
    }
    this.swiperInstance = undefined;
  }
}
