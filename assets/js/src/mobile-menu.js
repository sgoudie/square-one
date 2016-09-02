jQuery(document).ready(function ($) {
  $('[data-action="showMenu"]').click(function(){
    $('.MobileMenu').addClass('is-expanded');
    $('.Overlay').show();
  });

  $('[data-action="hideMenu"]').click(function(){
    $('.MobileMenu').removeClass('is-expanded');
    $('.Overlay').hide();
  });
});
