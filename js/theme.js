document.addEventListener('DOMContentLoaded', function () {
  var toggleBtn = document.getElementById('theme-toggle');
  var logo = document.getElementById('nav-logo');
  var themeMeta = document.querySelector('meta[name="theme-color"]');

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
});
