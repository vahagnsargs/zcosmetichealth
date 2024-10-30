if (!customElements.get('shoppable-layout-tags')) {
  class ShoppableLayoutTags extends HTMLElement {
    constructor() {
      super();
      if (Shopify.designMode) {
        window.addEventListener('shopify:section:load', this.init.bind(this));
      }
      this.init();
    }

    init () {
      this.swiper = new Swiper(this.querySelector('.swiper-tag-desktop'), {
        // loop: true,
        freeMode: true,
        slidesPerView: 4,
        spaceBetween: 16,
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl:'.swiper-button--prev',
        },
        breakpoints: {
          1400: {
            // loop: true,
            freeMode: true,
            slidesPerView: 6,
            spaceBetween: 16,
          },
          1100: {
            // loop: true,
            freeMode: true,
            slidesPerView: 5,
            spaceBetween: 16,
          },
        },
        on: {
          init: () => {
            document.querySelector('.swiper-tag-desktop').removeAttribute('style');
            this.updateNavigationVisibility();
          },
          resize: () => this.updateNavigationVisibility()
        }
      });
      this.swiperMobile = new Swiper(this.querySelector('.swiper-tag-mobile'), {
        freeMode: true,
        centeredSlides: true,
        spaceBetween: 24,
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl:'.swiper-button--prev',
        },
        on: {
          init: () => document.querySelector('.swiper-tag-mobile').removeAttribute('style')
        }
      });
    }

    updateNavigationVisibility() {
      const swiperContainer = this.querySelector('.swiper-tag-desktop');
      const slides = swiperContainer.querySelectorAll('.swiper-slide');
      const nextButton = swiperContainer.querySelector('.swiper-button--next');
      const prevButton = swiperContainer.querySelector('.swiper-button--prev');
      const slidesPerView = this.swiper?.params.slidesPerView;
      
      if (slides.length <= slidesPerView) {
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
      } else {
        nextButton.style.display = 'block';
        prevButton.style.display = 'block';
      }
    }

    slideTo(index) {
      this.swiper.slideTo(index);
    }
  }

  customElements.define('shoppable-layout-tags', ShoppableLayoutTags);
}
