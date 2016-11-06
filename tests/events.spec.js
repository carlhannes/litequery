import { select } from "../src/base";
import { default as jsdom } from "mocha-jsdom";
import { expect } from "chai";

describe( "Events", () => {
	jsdom();

	it( "should fire single events correctly", function () {
		document.body.innerHTML = "<div class='test'></div>";
		let test = false;

		select( "div.test" ).on( "click", () => { test = true; } );
		select( "div.test" ).trigger( "click" );

		expect( test ).to.be.true;

	} );

	it( "should fire multiple events correctly", function () {
		document.body.innerHTML = "<div class='test'></div><div class='test'></div><div class='test'></div><div class='test'></div>";
		let test = 0;

		select( "div.test" ).on( "click", () => { test++; } );
		select( "div.test" ).trigger( "click" );

		expect( test ).to.be.equal( 4 );

	} );

} );
