(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash);
    if (section) {
      e.preventDefault();

      let navbar = select('#navbar');
      let header = select('#header');
      let sections = select('section', true);
      let navlinks = select('#navbar .nav-link', true);

      navlinks.forEach((item) => {
        item.classList.remove('active');
      });

      this.classList.add('active');

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top');
        sections.forEach((item) => {
          item.classList.remove('section-show');
        });
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top');
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show');
          });
          section.classList.add('section-show');
        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show');
        });
        section.classList.add('section-show');
      }

      scrollto(this.hash);
    }
  }, true);

  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash);

      if (initial_nav) {
        let header = select('#header');
        let navlinks = select('#navbar .nav-link', true);

        header.classList.add('header-top');

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });

        setTimeout(function() {
          initial_nav.classList.add('section-show');
        }, 350);

        scrollto(window.location.hash);
      }
    }
  });

  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }

  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);
      let frontendBackendFilters = select('#frontend-backend-filters');

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

        // Ocultar opciones de frontend y backend cuando se selecciona algo diferente a "Desarrollo Web"
        if (
          this.getAttribute('data-filter') !== '.filter-web' &&
          this.getAttribute('data-filter') !== '.filter-frontend' &&
          this.getAttribute('data-filter') !== '.filter-backend'
        ) {
          frontendBackendFilters.style.display = 'none';
        } else {
          frontendBackendFilters.style.display = 'flex';
        }
      }, true);
    }
  });

  // Opciones de Frontend y Backend inicialmente ocultas
  let frontendBackendFilters = select('#frontend-backend-filters');
  frontendBackendFilters.style.display = 'none';

  new PureCounter();

    /**
   * Document Title
   */
    let previousTitle = document.title;
    window.addEventListener('blur', ()=>{
      previousTitle = document.title;
      document.title = '¡No te vayas! ¡Vuelve!';
    });
  
    window.addEventListener('focus', ()=>{
      document.title = previousTitle;
    })
})();
