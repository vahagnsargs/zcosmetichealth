if (!customElements.get('shoppable-drawer')) {
  class ShoppableDrawer extends HTMLElement {
    constructor() {
      super();
      if (Shopify.designMode) {
        window.addEventListener('shopify:section:load', this.initSwiper.bind(this));
      }
      this.init();
    }

    init() {
      this.toggleState = false;
      this.layoutMode =this.getAttribute('data-layout-mode')
      if (!this.classList.contains('is--open')) {
        document.querySelector('body').classList.remove('overflow-hidden');
      }

      this.querySelector('.button--close').addEventListener('click', this.close.bind(this));
      this.querySelector('.shoppable-drawer__backdrop').addEventListener('click', this.close.bind(this));

      this.initSwiper();
    }

    initSwiper() {
      if (this.querySelector('.swiper-drawer')) {
        this.swiperDrawer = new Swiper('.swiper-drawer', {
          slidesPerView: 1,
          autoHeight: true,
          navigation: {
            nextEl: '.swiper__button--next',
            prevEl:'.swiper__button--prev',
          },
          on: {
            init: () => document.querySelector('.swiper-drawer').removeAttribute('style')
          }
        });
      }
    }

    toggle() {
      if (!this.toggleState) {
        this.open();
      } else {
        this.close();
      }
    }

    open() {
      this.toggleState = true;
      document.querySelector('body').classList.add('overflow-hidden');
      this.classList.add('is--open');
      if (this.layoutMode === "multi") this.classList.add('is--open--blocks');
      this.opened();
    }

    close() {
      this.toggleState = false;
      document.querySelector('body').classList.remove('overflow-hidden');
      this.classList.remove('is--open');
      if (this.layoutMode === "multi") {
        this.classList.remove('is--open--blocks');
        this.classList.remove('is--open--product');
      }
      this.closed();
      this.toggleAriaExpanded();
    }

    openProduct() {
      if (this.layoutMode === "single") this.open();
      this.classList.add('is--open--product');
    }

    closeProduct() {
      if (this.layoutMode === "single") this.close();
      this.classList.remove('is--open--product');
    }

    openWithIndex(event, index) {
      if (this.swiperDrawer.length > 1) {
        const drawers = document.querySelectorAll('.shoppable');
        const clickedElement = event.target.closest('.shoppable');
        const drawer_index = Array.from(drawers).indexOf(clickedElement);

        this.swiperDrawer[drawer_index].slideTo(parseInt(index, 0));
      } else {
        this.swiperDrawer.slideTo(parseInt(index, 0));
      }
      setTimeout(() => {
        this.open();
        this.toggleAriaExpanded(event);
      }, 200);
    }

    openWithTag(event, index) {
      const currentId = `shoppable-drawer__tags--${index}`;
      this.querySelectorAll('.shoppable-drawer__tags').forEach((container) => {
        container.classList.add('hidden');
        if (container.getAttribute('id') === currentId) {
          container.classList.remove('hidden');
        }
      });
      this.open();
      this. toggleAriaExpanded(event);
    }

    toggleAriaExpanded(event) {
      if (event) {
        if (event.target.closest('button')) event.target.closest('button').setAttribute('aria-expanded', true);
        this.querySelector('.button--close').setAttribute('aria-expanded', true);
      } else {
        document.querySelectorAll('[aria-controls="shoppable-drawer"]').forEach((button) => {
          button.setAttribute('aria-expanded', false);
        });
      }
    }

    opened () {
      const openedEvent = new Event('opened', { bubbles: true });
      this.dispatchEvent(openedEvent);
    }

    closed () {
      const closedEvent = new Event('closed', { bubbles: true });
      this.dispatchEvent(closedEvent);
    }

  }

  customElements.define('shoppable-drawer', ShoppableDrawer );
}
