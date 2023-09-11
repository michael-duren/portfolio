class Carousel extends HTMLElement {
  intervalId: null | NodeJS.Timeout = null;
  slideIndex = 0;
  connectedCallback() {
    const slides: HTMLLIElement[] = Array.from(this.querySelectorAll('li'));

    const showSlide = (n: number) => {
      slides.forEach((slide) => {
        delete slide.dataset.active;
      });
      if (n >= slides.length) this.slideIndex = 0;
      if (n < 0) this.slideIndex = slides.length - 1;
      slides[this.slideIndex]!.dataset.active = 'true';
    };
    const nextSlide = () => showSlide((this.slideIndex += 1));

    this.intervalId = setInterval(nextSlide, 2000);
  }
}

document.addEventListener('astro:page-load', () => {
  if (!customElements.get('custom-carousel')) {
    customElements.define('custom-carousel', Carousel);
  }
});
