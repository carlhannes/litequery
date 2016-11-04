import { select } from "../base";

let globalEventRegistry = {};

export function events( obj ) {
	/**
	 * Attach an event listener to an item
	 *
	 * @param  {String} trigger  	Event trigger
	 * @param  {Function} callback 	Callback function
	 * @return {Object}
	 */
	obj.attachEvent = function( trigger, callback ) {
		obj.apply( ( item ) => {
			item.addEventListener( trigger, callback );
		} );

		return obj;
	};

	/**
	 * The selector.on function matches items based on selector
	 * and using a single global event listener rather than
	 * per item
	 *
	 * @param  {String} trigger  	Event trigger
	 * @param  {Function} callback 	Callback function
	 * @return {Object}
	 */
	obj.on = function( trigger, callback ) {
		// Fallback to attaching events if no selector is present
		if ( obj.selector === null ) {
			return obj.attachEvent( trigger, callback );
		}

		let register = false;

		if ( !globalEventRegistry[trigger] ) {
			globalEventRegistry[trigger] = [];
			register = true;
		}

		globalEventRegistry[trigger].push( {
			selector: obj.selector,
			callback: callback
		} );

		if ( register ) {
			window.addEventListener( trigger, ( event ) => {
				globalEventRegistry[trigger].forEach( function ( item ) {
					let targets = select( obj.selector );

					targets.apply( ( currentTarget ) => {
						if ( currentTarget === event.target || currentTarget === event.srcElement ) {
							item.callback.call( select( event.target ), event );
						}
					} );
				} );
			} );
		}

		return obj;
	};
}
