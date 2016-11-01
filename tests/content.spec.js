import { select } from "../src/base";
import { default as jsdom } from "mocha-jsdom";
import { expect } from "chai";

describe( "Content manipulation", () => {
	jsdom();

	it( "should change innerHTML correctly", function () {
		let n = document.createElement( "asdf" );

		n = select( n );

		n.html( "test" );

		expect( n.elements[0].innerHTML ).to.be.equal( "test" );
		expect( n.html() ).to.be.equal( "test" );
	} );

} );
