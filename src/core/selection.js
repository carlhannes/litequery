import { select } from "../base";

export function selection( obj ) {
	/**
	 * Return the first element as an object
	 *
	 * @return {Object}
	 */
	obj.first = function() {
		return select( obj.elements[0] );
	};
}
