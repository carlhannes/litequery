import { select } from "../base";
import { warn } from "./errors";

export function selection( obj ) {
	/**
	 * Require the object to be single, otherwise show a warning and return the first object.
	 *
	 * @return {Object}
	 */
	obj.single = function() {
		if ( obj.elements.length === 1 ) {
			return obj;
		}

		let bestChoice = obj.first();

		warn( "This method requires a single item, will return", bestChoice );
		return bestChoice;
	};

	/**
	 * Return the first element as an object
	 *
	 * @return {Object}
	 */
	obj.first = function() {
		return select( obj.elements[0] || "" );
	};

	/**
	 * Return the last element as an object
	 *
	 * @return {Object}
	 */
	obj.last = function() {
		return select( obj.elements[ obj.elements.length - 1] );
	};

	/**
	 * Return the last element as an object
	 *
	 * @return {Object}
	 */
	obj.parent = function() {
		return select( obj.single().elements[0].parentElement );
	};

	/**
	 * Return the the children of all selected objects objects
	 *
	 * @return {Object}
	 */
	obj.children = function() {
		let items = [];

		obj.apply( ( item ) => {
			items.push( ...item.children );
		} );

		return select( items );
	};

	/**
	 * Return the the children of all selected objects objects
	 *
	 * @return {Object}
	 */
	obj.find = function( selectItem ) {
		let items = [];

		obj.apply( ( baseItem ) => {
			items.push( ...select( selectItem, baseItem ).elements );
		} );

		return select( items );
	};
}
