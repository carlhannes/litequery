export function events( obj ) {
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
}
