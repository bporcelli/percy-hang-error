// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Test Blog page', () => {
	it('Visits the Blog page', () => {
		cy.visit('/blog/');
		cy.percySnapshot();
	});
});
