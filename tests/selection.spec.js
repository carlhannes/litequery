import { select } from "../src/base";
import { default as jsdom } from "mocha-jsdom";
import { expect } from "chai";

describe( "Selection", () => {
	jsdom();

	it( "should return correct first and last item", function () {
		let na = [];

		na.push( document.createElement( "test1" ) );
		na.push( document.createElement( "test2" ) );

		na[0].className = "test1";
		na[1].className = "test2";

		let n = select( na );

		expect( n.first().elements[0].className ).to.be.equal( "test1" );
		expect( n.last().elements[0].className ).to.be.equal( "test2" );
	} );

	it( "should return parent elements correctly", function () {
		document.body.innerHTML = "<div class='parent'> <span class='child'>...</span> </div>";

		expect( select( "span.child" ).parent().elements[0].className ).to.be.equal( "parent" );
	} );

	it( "should return children elements correctly", function () {
		document.body.innerHTML = "<div class='parent'> <span class='child'>...</span> </div>";

		expect( select( "div.parent" ).children().elements.length ).to.be.equal( 1 );
		expect( select( "div.parent" ).children().elements[0].className ).to.be.equal( "child" );
	} );

	it( "should find elements in elements correctly", function () {
		document.body.innerHTML = "<div class='parent'> <span class='child'>...</span> </div>";

		expect( select( "div.parent" ).find( ".child" ).elements.length ).to.be.equal( 1 );
		expect( select( "div.parent" ).find( ".child" ).elements[0].className ).to.be.equal( "child" );
	} );

} );
