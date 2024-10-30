if (!customElements.get('shoppable-layout-slider')) {
  class ShoppableLayoutSlider extends HTMLElement {
    constructor() {
      super();
      if (Shopify.designMode) {
        window.addEventListener('shopify:section:load', this.init.bind(this));
      }
      this.init();
    }

    init () {
      this.swiper = new Swiper(".swiper-shoppable-slider", {
        autoplay: false,
        spaceBetween: 20,
        slidesPerView: "auto",
        navigation: {
          nextEl: '.swiper-button--next',
          prevEl:'.swiper-button--prev',
        },
        breakpoints: {
          990: {
            spaceBetween: 40,
          },
          750: {
            spaceBetween: 32,
            slidesPerView: 2.5
          },
          550: {
            spaceBetween: 24,
            slidesPerView: 2
          },
          360: {
            spaceBetween: 24,
            slidesPerView: 1.2
          }
        },
        on: {
          beforeInit: () => {
            this.querySelectorAll('video').forEach((video, index) => {
               video.play();
            });
          },
          afterInit: () => {
            this.querySelector('.swiper-shoppable-slider').removeAttribute('style');
          },
          slideChange: () => {
            this.setLazyVideos();
          },
        },
      });
    }

    setLazyVideos() {
      this.querySelectorAll('.swiper-slide-visible').forEach((slide) => {
        const video = slide.querySelector('video');
        if (video) { video.play(); }
      });
      const activeIndex = this.swiper.activeIndex;
      this.swiper.slides.forEach((slide, index) => {
        const videos = slide.querySelectorAll('video');
        videos.forEach(video => {
          if (index >= activeIndex) {
            video.play();
          } else {
            video.pause();
          }
        });
      });
    }

    open(event, index) {
      document.querySelector('shoppable-drawer').openWithIndex(event, index);
    }
  }

  customElements.define('shoppable-layout-slider', ShoppableLayoutSlider);
}
