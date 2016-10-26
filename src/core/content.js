export function content( obj ) {
	/**
	 * Sets the HTML of all affected elements
	 *
	 * @param  {String} html The HTML to set
	 * @return {Object}
	 */
	obj.html = function( html ) {
		obj.apply( ( item ) => {
			item.innerHTML = html;
		} );

		return obj;
	};
}
