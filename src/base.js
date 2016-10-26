import { classes } from "./core/classes";
import { content } from "./core/content";
import { events } from "./core/events";
import { selection } from "./core/selection";

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
	 * Extend the functionality
	 *
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	obj.extend = function( callback ) {
		callback( obj );
	};

	/**
	 * Extend the obj with all the parts
	 */
	obj.extend( classes );
	obj.extend( content );
	obj.extend( events );
	obj.extend( selection );

    return obj;
}
