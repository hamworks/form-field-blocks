<?php
/**
 * Plugin Name:     form-field-blocks
 * Plugin URI:      https://github.com/team-hamworks/form-field-blocks
 * Description:     form-field-blocks.
 * Author:          hamworks
 * Author URI:      https://ham.works
 * Text Domain:     form-field-blocks
 * Domain Path:     /languages
 * Version: 0.0.1
 *
 * @package         HAMWORKS\Form_Builder_Blocks
 */

namespace HAMWORKS\Form_Builder_Blocks;

defined( 'ABSPATH' ) || exit;

const PLUGIN_FILE = __FILE__;


add_action(
	'init',
	function () {
		$asset_path = dirname( PLUGIN_FILE ) . '/build/index.asset.php';
		if ( file_exists( $asset_path ) ) {
			$asset_file = include( $asset_path );
			wp_register_script(
				'form-field-blocks',
				plugins_url( 'build/index.js', PLUGIN_FILE ),
				$asset_file['dependencies'],
				$asset_file['version']
			);

			register_block_type(
				'form-field-blocks/form',
				array(
					'editor_script' => 'form-field-blocks',
				)
			);
		}
	}
);
