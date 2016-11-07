export function classes( obj ) {
	/**
	 * Adds a class to all affected elements
	 *
	 * @param {String} className The class to add
	 * @return {Object}
	 */
	obj.hasClass = function( className ) {
		let found = false;

		obj.apply( ( item ) => {
			let classList = item.className.split( " " );

			if ( !found && classList.indexOf( className ) !== -1 ) {
				found = true;
			}
		} );

		return found;
	};

	/**
	 * Deduplicate classes on an element
	 *
	 * @return {Object}
	 */
	obj.dedupClass = function() {
		obj.apply( ( item ) => {
			let output = [];
			let classList = item.className.split( " " );

			classList.forEach( ( className ) => {
				className = className.trim();
				if ( className && output.indexOf( className ) === -1 ) {
					output.push( className );
				}
			} );

			item.className = output.join( " " );
		} );

		return obj;
	};

	/**
	 * Adds a class to all affected elements
	 *
	 * @param {String} className The class to add
	 * @return {Object}
	 */
	obj.addClass = function( className ) {
		obj.apply( ( item ) => {
			let classList = item.className.split( " " );

			classList.push( className );

			item.className = classList.join( " " );
		} );

		return obj.dedupClass();
	};

	/**
	 * Removes a class from all affected elements
	 * (also deduplicates)
	 *
	 * @param {String} className The class to add
	 * @return {Object}
	 */
	obj.removeClass = function( className ) {
		obj.apply( ( item ) => {
			let output = [];
			let classList = item.className.split( " " );

			classList.forEach( ( curClass ) => {
				curClass = curClass.trim();
				if ( curClass && output.indexOf( curClass ) === -1 && curClass !== className ) {
					output.push( curClass );
				}
			} );

			item.className = output.join( " " );
		} );

		return obj;
	};

	/**
	 * Toggle a class
	 *
	 * @param  {String} className The class name to toggle
	 * @return {Object}
	 */
	obj.toggleClass = function( className ) {
		if ( obj.hasClass( className ) ) {
			obj.removeClass( className );
		} else {
			obj.addClass( className );
		}

		return obj;
	};
}
