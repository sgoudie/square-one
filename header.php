<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Square One
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php get_template_part('template-parts/mobile-menu'); ?>

<div id="page" class="hfeed site">
	<a class="skip-link sr-only" href="#content"><?php esc_html_e( 'Skip to content', 'root-academi' ); ?></a>

	<header id="masthead" class="SiteHeader" role="banner">
		<div class="container">
			<h1 class="SiteHeader-title">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
					<?php bloginfo( 'name' ); ?>
					<!-- If you have an image, go ahead  -->
					<!-- <img src="<?php //bloginfo('template_directory'); ?>/assets/img/<image>" alt="<?php //bloginfo( 'name' ); ?>" /> -->
				</a>
			</h1>
			<!-- Desktop menu -->
			<nav id="site-navigation" class="SiteHeader-nav hidden-sm hidden-xs pull-right" role="navigation">
				<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?>
			</nav>
			<!-- Mobile menu -->
			<div class="SiteHeader-mobileMenu visible-sm visible-xs pull-right">
        <button class="SiteHeader-mobileMenu-toggle" data-action="showMenu"><i class="fa fa-bars"></i> Menu</button>
        <!-- <button class="hide-menu"><i class="fa fa-close"></i> Close</button> -->
      </div>
			<!-- #site-navigation -->
		</div>
	</header><!-- #masthead -->

	<div id="content" class="site-content">
