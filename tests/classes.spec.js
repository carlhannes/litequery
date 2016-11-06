import { select } from "../src/base";
import { default as jsdom } from "mocha-jsdom";
import { expect } from "chai";

describe( "Class manipulation", () => {
	jsdom();

	it( "should handle addClass and hasClass correctly", function () {
		let n = document.createElement( "test" );

		n = select( n );

		n.addClass( "test" );

		expect( n.elements[0].className ).to.be.equal( "test" );
		expect( n.hasClass( "test" ) ).to.be.true;
	} );

	it( "should deduplicate classes", function () {
		let n = document.createElement( "test" );

		n.className = "duplicate duplicate";

		n = select( n ).dedupClass();

		expect( n.elements[0].className ).to.be.equal( "duplicate" );
	} );

	it( "should deduplicate classes", function () {
		let n = document.createElement( "test" );

		n.className = "test1 test2";

		n = select( n ).removeClass( "test2" );

		expect( n.elements[0].className ).to.be.equal( "test1" );
	} );

} );
