(function () {
  var INTERVAL_MS = 2700;
  var THEME_SLIDE_INDEX = 2; // index of the dash pair (light/dark variants)

  function getTheme() {
    return document.body.classList.contains('light-mode') ? 'light' : 'dark';
  }

  function updateThemeSlide(deskImgs, mobileImgs) {
    var theme = getTheme();
    var desk = deskImgs[THEME_SLIDE_INDEX];
    var mobile = mobileImgs[THEME_SLIDE_INDEX];
    if (desk && desk.dataset.srcLight) {
      desk.src = theme === 'light' ? desk.dataset.srcLight : desk.dataset.srcDark;
    }
    if (mobile && mobile.dataset.srcLight) {
      mobile.src = theme === 'light' ? mobile.dataset.srcLight : mobile.dataset.srcDark;
    }
  }

  function goToSlide(index, deskImgs, mobileImgs) {
    deskImgs.forEach(function (img, i) {
      img.classList.toggle('active', i === index);
    });
    mobileImgs.forEach(function (img, i) {
      img.classList.toggle('active', i === index);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var deskImgs = Array.from(document.querySelectorAll('.slide-desk'));
    var mobileImgs = Array.from(document.querySelectorAll('.slide-mobile'));
    if (!deskImgs.length) return;

    // Ensure the theme-specific slide has the correct src on load
    updateThemeSlide(deskImgs, mobileImgs);

    var current = 0;
    goToSlide(0, deskImgs, mobileImgs);

    setInterval(function () {
      current = (current + 1) % deskImgs.length;
      if (current === THEME_SLIDE_INDEX) {
        updateThemeSlide(deskImgs, mobileImgs);
      }
      goToSlide(current, deskImgs, mobileImgs);
    }, INTERVAL_MS);

    // Keep dash slide in sync when theme is toggled
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        // theme.js flips the class synchronously, so a short delay isn't needed,
        // but we wait one tick to be safe in case of async class updates
        setTimeout(function () {
          updateThemeSlide(deskImgs, mobileImgs);
        }, 0);
      });
    }
  });
})();
