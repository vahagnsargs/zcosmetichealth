if (!customElements.get('shoppable-layout-carousel')) {
  class ShoppableLayoutCarousel extends HTMLElement {
    constructor() {
      super();
      if (Shopify.designMode) {
        window.addEventListener('shopify:section:load', this.init.bind(this));
      }
      this.init();
    }

    init () {
      this.gridItems = this.getAttribute('data-grid-items');
      let swiperOptions = {
        // freeMode: true,
        slidesPerView: "auto",
        // centeredSlides: true,
        spaceBetween: 2,
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl:'.swiper-button--prev',
        },
        breakpoints: {
          750: {
            freeMode: true,
            slidesPerView: 3,
            spaceBetween: 2,
          },
          550: {
            freeMode: true,
            slidesPerView: 2,
            spaceBetween: 2,
          },
        },
        on: {
          init: () => document.querySelector('.swiper-carousel').removeAttribute('style'),
        }
      }
      if (this.gridItems === '4') {
        swiperOptions.breakpoints[990] = {
          freeMode: false,
          slidesPerView: 4,
          spaceBetween: 2,
        }
      }
      this.swiper = new Swiper(this.querySelector('.swiper-carousel'), swiperOptions);
    }

    slideTo(index) {
      this.swiper.slideTo(index);
    }
  }

  customElements.define('shoppable-layout-carousel', ShoppableLayoutCarousel);
}
