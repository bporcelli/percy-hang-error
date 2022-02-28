// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe( 'Testing about us', function () {
	it( 'Visits the about us page', function () {
		cy.visit( '/about-us/' );
		cy.percySnapshot();
	} );
} );
