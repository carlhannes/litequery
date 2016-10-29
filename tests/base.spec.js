import { select } from "../src/base";
import { default as jsdom } from "mocha-jsdom";
import { expect } from "chai";

describe( "Basic handling", () => {
	jsdom();

	it( "should add single item correctly", function () {
		let n = document.createElement( "test" );

		n = select( n );

		expect( n.elements.length ).to.be.equal( 1 );
	} );

	it( "should add multiple items correctly", function () {
		let na = [];

		na.push( document.createElement( "test1" ) );
		na.push( document.createElement( "test2" ) );

		expect( select( na ).elements.length ).to.be.equal( 2 );
	} );

	it( "should DOM items correctly", function () {
		document.body.innerHTML = "<div>...</div> <div>...</div>";

		expect( select( "div" ).elements.length ).to.be.equal( 2 );
	} );

	it( "should apply on all elements", function () {
		let na = [];

		na.push( document.createElement( "test1" ) );
		na.push( document.createElement( "test2" ) );

		let n = select( na );

		n.apply( ( item ) => {
			item.className = "applyTest";
		} );

		expect( n.elements[0].className ).to.be.equal( "applyTest" );
		expect( n.elements[1].className ).to.be.equal( "applyTest" );
	} );

} );
