import { select } from "../base";

let globalEventRegistry = {};

/**
 * Traverse an event through the DOM, by testing all children of the currentElement
 *
 * @param  {Object} event           An event object
 * @param  {Object} currentElement  The current element to check for event
 * @param  {Object} registeredEvent	The cached/registered event by the litequery event handler
 * @return {Undefined}              Does not return anything
 */
function traverseEventThroughDOM( event, currentElement, registeredEvent ) {
	if ( currentElement === event.target || currentElement === event.srcElement ) {
		registeredEvent.callback.call( select( event.target ), event );
	}
	for ( let i = 0, len = currentElement.children.length; i < len; i++ ) {
		traverseEventThroughDOM( event, currentElement.children[i], registeredEvent );
	}
}

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
				globalEventRegistry[trigger].forEach( function ( registeredEvent ) {
					let targets = select( registeredEvent.selector );

					targets.apply( ( currentElement ) => {
						traverseEventThroughDOM( event, currentElement, registeredEvent );
					} );
				} );
			} );
		}

		return obj;
	};

	/**
	 * Trigger events
	 *
	 * @param  {String} trigger Event to trigger
	 * @return {Object}
	 */
	obj.trigger = function( trigger ) {
		let newEvent = function() {
			let event;
			if ( document.createEvent ) {
				event = document.createEvent( "HTMLEvents" );
				event.initEvent( trigger, true, true );
			} else {
				event = document.createEventObject();
				event.eventType = trigger;
			}

			event.eventName = trigger;
			return event;
		};

		if ( document.createEvent ) {
			obj.apply( ( item ) => {
				item.dispatchEvent( newEvent() );
			} );
		} else {
			obj.apply( ( item ) => {
				let event = newEvent();
				item.fireEvent( "on" + event.eventType, event );
			} );
		}

		return obj;
	};
}
