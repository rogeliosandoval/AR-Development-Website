document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.getElementById('theme-toggle');
  var logo = document.getElementById('nav-logo');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('nav');

  var DARK_LOGO = '/images/horizontal-logo-white.svg';
  var LIGHT_LOGO = '/images/horizontal-logo-black.svg';

  function syncUI() {
    var isLight = document.body.classList.contains('light-mode');
    logo.src = isLight ? LIGHT_LOGO : DARK_LOGO;
    toggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    if (themeMeta) {
      themeMeta.setAttribute('content', isLight ? '#f2f6fc' : '#0a101d');
    }
  }

  syncUI();

  toggleBtn.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    var isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    syncUI();
  });

  // Hamburger menu
  function closeMenu() {
    nav.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
  }

  hamburger.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('nav-open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && nav.classList.contains('nav-open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && nav.classList.contains('nav-open')) {
      closeMenu();
    }
  });
});
