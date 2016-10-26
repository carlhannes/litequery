export function select( selectItem = window ) {
	let obj = {};

	if ( typeof selectItem === "string" ) {
		obj.elements = document.querySelectorAll( selectItem );
	} else {
		obj.elements = [ selectItem ];
	}

	/**
	 * Apply a callback for each element in this object
	 *
	 * @param  {Function} callback Callback function
	 * @return {Object}
	 */
	obj.apply = function( callback ) {
		for ( let i = 0; i < obj.elements.length; i++ ) {
			callback( obj.elements[i] );
		}

		return obj;
	};

	/**
	 * Return the first element as an object
	 *
	 * @return {Object}
	 */
	obj.first = function() {
		return select( obj.elements[0] );
	};

	/**
	 * Fire a callback on an event
	 *
	 * @param  {String} trigger  	Event trigger
	 * @param  {Function} callback 	Callback function
	 * @return {Object}
	 */
	obj.on = function( trigger, callback ) {
		obj.apply( ( item ) => {
			item.addEventListener( trigger, callback );
		} );

		return obj;
	};

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

	/**
	 * Adds a class to all affected elements
	 *
	 * @param {String} className The class to add
	 * @return {Object}
	 */
	obj.hasClass = function( className ) {
		let found = false;

		obj.apply( ( item ) => {
			let classes = item.className.split( " " );

			if ( !found && classes.indexOf( className ) !== -1 ) {
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
			let classes = item.className.split( " " );

			classes.forEach( ( className ) => {
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
			let classes = item.className.split( " " );

			classes.push( className );

			item.className = classes.join( " " );
		} );

		return obj.dedupClass();
	};

    return obj;
}
