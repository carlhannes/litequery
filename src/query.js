export function selector( query ) {
    let elements = document.querySelectorAll( query );

    function obj() {
        return elements;
    }

	/**
	 * Apply a callback for each element in this object
	 *
	 * @param  {Function} callback Callback function
	 */
	obj.apply = function( callback ) {
		for ( let i = 0; i < elements.length; i++ ) {
			callback( elements[i] );
		}

		return obj;
	};

	/**
	 * Fire a callback on an event
	 *
	 * @param  {String} trigger  	Event trigger
	 * @param  {Function} callback 	Callback function
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
	 */
	obj.addClass = function( className ) {
		obj.apply( ( item ) => {
			let classes = item.className.split( " " );

			classes.push( className );

			item.className = classes.join( " " );
		} );

		return obj;
	};

    return obj;
}
