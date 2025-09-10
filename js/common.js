// Common utility functions
class CommonUtils {
  // Header scroll effect
  static initHeaderScroll() {
    const header = document.querySelector(".middle");
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("acter");
      } else {
        header.classList.remove("acter");
      }
    };

    window.addEventListener("scroll", handleScroll);
  }

  // Counter animation
  static animateCounters() {
    const counters = document.querySelectorAll('.num');
    if (counters.length === 0) return;
    
    const duration = 3000;
    const interval = 50;
    const steps = duration / interval;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-val'));
      if (isNaN(target)) return;
      
      const increment = target / steps;
      let current = 0;
      
      // Reset current value based on initial text
      const initialText = counter.textContent;
      if (initialText === "+000") current = 0;
      else if (initialText === "00") current = 0;
      else if (initialText === "0") current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          current = target;
          
          if (initialText === "+000") {
            counter.textContent = `+${Math.floor(current)}`;
          } else {
            counter.textContent = Math.floor(current);
          }
        } else {
          if (initialText === "+000") {
            counter.textContent = `+${Math.floor(current).toString().padStart(3, '0')}`;
          } else if (initialText === "00") {
            counter.textContent = Math.floor(current).toString().padStart(2, '0');
          } else {
            counter.textContent = Math.floor(current);
          }
        }
      }, interval);
    });
  }

  // Image gallery filter
  static initGalleryFilter() {
    const filterButtons = document.querySelectorAll(".list");
    const items = document.querySelectorAll(".itembox");
    
    console.log('initGalleryFilter called');
    console.log('Found filter buttons:', filterButtons.length);
    console.log('Found items:', items.length);

    if (filterButtons.length === 0 || items.length === 0) {
      console.warn('No filter buttons or items found');
      return;
    }

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        console.log('Filter button clicked:', this.getAttribute('data-filter'));
        
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        items.forEach(item => {
          item.classList.remove('active');
          item.classList.add('hide');

          if (item.getAttribute('data-item') === filterValue || filterValue === 'Hepsi') {
            item.classList.remove('hide');
            item.classList.add('active');
          }
        });
      });
    });
    
    console.log('Gallery filter initialized successfully');
  }

  // Fullscreen image viewer
  static initFullscreenViewer() {
    document.querySelectorAll('.itembox img').forEach(img => {
      img.addEventListener('click', function(e) {
        e.stopPropagation();
        
        if (this.classList.contains('fullscreen-img')) {
          this.classList.remove('fullscreen-img');
          this.style.transform = 'scale(1)';
          document.body.style.overflow = 'auto';
        } else {
          const fullscreenDiv = document.createElement('div');
          fullscreenDiv.className = 'fullscreen';
          
          const clonedImg = this.cloneNode();
          clonedImg.classList.add('fullscreen-img');
          
          fullscreenDiv.appendChild(clonedImg);
          document.body.appendChild(fullscreenDiv);
          document.body.style.overflow = 'hidden';
          
          fullscreenDiv.addEventListener('click', function() {
            document.body.removeChild(fullscreenDiv);
            document.body.style.overflow = 'auto';
          });
        }
      });
    });
  }

  // Image slider
  static initImageSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    const slideInterval = 3000;
    
    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }
    
    // Start the slider
    setInterval(nextSlide, slideInterval);
  }

  // Tiny slider initialization
  static initTinySlider(container, options = {}) {
    if (typeof tns === 'undefined') {
      console.warn('Tiny Slider not loaded');
      return;
    }
    
    const defaultOptions = {
      slideBy: 1,
      autoplay: true,
      gutter: 30,
      controls: false,
      autoplayButtonOutput: false,
      mouseDrag: true,
      nav: false,
      autoplayTimeout: 3000,
      items: 4,
      responsive: {
        0: {
          gutter: 16,
          edgePadding: 16,
          items: 1,
        },
        640: {
          gutter: 20,
          edgePadding: 20,
          items: 2,
        },
        900: {
          gutter: 24,
          edgePadding: 24,
          items: 3,
        },
        1200: {
          gutter: 30,
          edgePadding: 32,
          items: 4,
        },
      },
    };

    return tns({
      container: container,
      ...defaultOptions,
      ...options
    });
  }

  // Mobile menu functionality
  static initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    if (!menuToggle || !mobileMenu || !menuOverlay) {
      console.warn('Mobile menu elements not found');
      return;
    }
    
    // Menüyü aç/kapat
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      mobileMenu.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
      
      // Menü ikonunu değiştir
      const icon = menuToggle.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Overlay'e tıklayarak menüyü kapat
    menuOverlay.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
      
      // Menü ikonunu değiştir
      const icon = menuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
    
    // ESC tuşu ile menüyü kapat
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Menü ikonunu değiştir
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Menü linklerine tıklandığında menüyü kapat
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Menü ikonunu değiştir
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // Initialize all common functionality
  static init() {
    this.initHeaderScroll();
    this.initMobileMenu();
    this.initImageSlider();
    this.animateCounters();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  CommonUtils.init();
});