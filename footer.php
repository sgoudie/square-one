<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Square One
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="SiteFooter" role="contentinfo">
		<div class="container">
			<div class="site-info">
				<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'square-one' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'square-one' ), 'WordPress' ); ?></a>
				<span class="sep"> | </span>
				<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'square-one' ), 'square-one', '<a href="http://samuelgoudie.co.uk" rel="designer">sgoudie</a>' ); ?>
			</div><!-- .site-info -->
		</div>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
