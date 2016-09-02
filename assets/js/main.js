'use strict';

// Initialise FastClick
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}
'use strict';

jQuery(document).ready(function ($) {
  $('[data-action="showMenu"]').click(function () {
    $('.MobileMenu').addClass('is-expanded');
    $('.Overlay').show();
  });

  $('[data-action="hideMenu"]').click(function () {
    $('.MobileMenu').removeClass('is-expanded');
    $('.Overlay').hide();
  });
});