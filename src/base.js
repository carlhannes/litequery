import { error } from "./core/errors";

import { classes } from "./core/classes";
import { content } from "./core/content";
import { events } from "./core/events";
import { selection } from "./core/selection";

export function select( selectItem = window, baseElement = document ) {
	let obj = {};

	if ( typeof selectItem === "string" ) {
		try {
			obj.elements = baseElement.querySelectorAll( selectItem );
		} catch ( e ) {
			// TODO check if we can just reset the elements perhaps rather than throwing an error?
			error( true, e );
			obj.elements = [];
		}
	} else {
		obj.elements = [ ...selectItem ];
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
