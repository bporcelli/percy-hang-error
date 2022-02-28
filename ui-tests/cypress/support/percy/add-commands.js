/**
 * Registers commands for Percy.
 */

import {
	waitForStableDOM,
	generateSnapshotName,
} from './utils';

const scrollToBottom = require('scroll-to-bottomjs');
const {percy, isPercyEnabled} = require('@percy/sdk-utils');

/**
 * Stabilizes the DOM before passing it off to Percy for a snapshot.
 * The goal is to ensure the DOM is in a stable and consistent state
 * before Percy captures it to reduce flakiness in visual diffs.
 */
Cypress.Commands.add('stabilizeDOMForPercy', () => {
	// Scroll to bottom to trigger lazy loading and scroll animations.
	cy.window().then(win => scrollToBottom({remoteWindow: win}));

	// Remove the `loading="lazy"` attribute from images so they are
	// loaded during Percy's asset discovery and uploaded to Percy.
	cy.get('img', {includeShadowDom: true})
		.filter('[src]')
		.filter(':visible')
		.then(($imgs) => {
			return $imgs.map((i, /** @type {HTMLImageElement} */ img) => {
				img.removeAttribute('loading');
				return img;
			});
		});

	// Wait for DOM to stabilize before taking snapshot.
	return cy.window().then(win => waitForStableDOM(win));
});

/**
 * Takes a Percy DOM snapshot after stabilizing the page.
 *
 * @param {string} name Snapshot name. Defaults to '/page-path/ page after scroll'.
 * @param {Object} options Per-screenshot config to pass to `cy.percySnapshot()`.
 */
Cypress.Commands.add('takePercySnapshot', (name = '', options = {}) => {
	cy.stabilizeDOMForPercy();
	cy.percySnapshot(name, options);

	// return cy.window().then((win) => {
	// 	const snapshotName = name || generateSnapshotName(win);

	// 	cy.stabilizeDOMForPercy();
	// 	return cy.percySnapshot(snapshotName, options);
	// });
});
