// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Test Active Listing page', () => {
	it('Visits an active listing page', () => {
		cy.visit('/properties/');
		cy.get('.home-junction-block .listings-card-grid__item').first().click();
		cy.url().should('match', /\/featured-listings\/.*\/$/);
		cy.percySnapshot();
	});
});
