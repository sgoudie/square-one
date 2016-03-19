<?php
/**
 * Theme functions and definitions
 *
 * @package Square One
 */

if ( ! function_exists( 'square_one_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function square_one_setup() {
    /*
     * Make theme available for translation.
     * Translations can be filed in the /languages/ directory.
     * If you're building a theme based on Square One, use a find and replace
     * to change 'square-one' to the name of your theme in all the template files
     */
    load_theme_textdomain( 'square-one', get_template_directory() . '/languages' );

    // Add default posts and comments RSS feed links to head.
    add_theme_support( 'automatic-feed-links' );

    /*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
    add_theme_support( 'title-tag' );

    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
     */
    add_theme_support( 'post-thumbnails' );

    // This theme uses wp_nav_menu() in one location.
    register_nav_menus( array(
        'primary' => esc_html__( 'Primary Menu', 'square-one' ),
    ) );

    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );

    /*
     * Enable support for Post Formats.
     * See http://codex.wordpress.org/Post_Formats
     */
    add_theme_support( 'post-formats', array(
        'aside',
        'image',
        'video',
        'quote',
        'link',
    ) );

    // Set up the WordPress core custom background feature.
    add_theme_support( 'custom-background', apply_filters( 'square_one_custom_background_args', array(
        'default-color' => 'ffffff',
        'default-image' => '',
    ) ) );
}
endif; // square_one_setup
add_action( 'after_setup_theme', 'square_one_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function square_one_content_width() {
    $GLOBALS['content_width'] = apply_filters( 'square_one_content_width', 640 );
}
add_action( 'after_setup_theme', 'square_one_content_width', 0 );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function square_one_widgets_init() {
    register_sidebar( array(
        'name'          => esc_html__( 'Sidebar', 'square-one' ),
        'id'            => 'sidebar-1',
        'description'   => '',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'square_one_widgets_init' );

/**
 * Enqueue scripts and styles.
 */

// function google_fonts() {
//     $query_args = array(
//         'family' => 'Oswald:700,400|Merriweather:400italic,400,300italic,700'
//     );
//     wp_register_style( 'google_fonts', add_query_arg( $query_args, "//fonts.googleapis.com/css" ), array(), null );
//     wp_enqueue_style( 'google_fonts' );
// }
//
// add_action('wp_enqueue_scripts', 'google_fonts');

function square_one_scripts() {

    wp_enqueue_style( 'square-one-style', get_template_directory_uri() . '/dist/styles/main.min.css', false, null );

    wp_enqueue_style( 'square-one-fontawesome', get_template_directory_uri() . '/assets/vendor/fontawesome/css/font-awesome.min.css', false, null );

    wp_enqueue_script( 'square-one-jquery', get_template_directory_uri() . '/assets/vendor/jquery/dist/jquery.js', array(), '20120206', true );

    wp_enqueue_script( 'square-one-jquery-fastclick', get_template_directory_uri() . '/assets/vendor/fastclick/lib/fastclick.js', array('square-one-jquery'), '20120206', true );

    wp_enqueue_script( 'square-one-jquery-validate', get_template_directory_uri() . '/assets/vendor/jquery-validation/dist/jquery.validate.js', array('square-one-jquery'), '20120206', true );

    wp_enqueue_script( 'square-one-bootstrap_js', get_template_directory_uri() . '/assets/vendor/bootstrap/dist/js/bootstrap.js', array('square-one-jquery'), null, true );

    wp_enqueue_script( 'square-one-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

    wp_enqueue_script( 'square-one-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'square_one_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

//Remove p tags around images
function filter_ptags_on_images($content){
   return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}

add_filter('the_content', 'filter_ptags_on_images');

//Add responsive div to video embeds
function bootstrap_wrap_oembed( $html ){
  $html = preg_replace( '/(width|height)="\d*"\s/', "", $html ); // Strip width and height #1
  return'<div class="video-container embed-responsive embed-responsive-16by9">'.$html.'</div>'; // Wrap in div element and return #3 and #4
}
add_filter( 'embed_oembed_html','bootstrap_wrap_oembed',10,1);

//If on localhost load LiveReload
if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
  wp_register_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
  wp_enqueue_script('livereload');
}

//Get Featured Image URL
function wp_get_thumbnail_url($id){
    if(has_post_thumbnail($id)){
        $imgArray = wp_get_attachment_image_src( get_post_thumbnail_id( $id ), 'single-post-thumbnail' );
        $imgURL = $imgArray[0];
        return $imgURL;
    }else{
        return false;
    }
}

//Page Slug Body Class
function add_slug_body_class( $classes ) {
    global $post;
    if ( isset( $post ) ) {
    $classes[] = $post->post_type . '-' . $post->post_name;
    }
    return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );
