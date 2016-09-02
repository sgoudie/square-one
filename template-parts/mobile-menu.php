<div class="Overlay" data-action="hideMenu"></div>

<div class="MobileMenu">
  <div class="MobileMenu-inner">
    <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
    <p class="MobileMenu-close">
      <span data-action="hideMenu"><i class="fa fa-close"></i> Close Menu</span>
    </p>
  </div>
</div>
