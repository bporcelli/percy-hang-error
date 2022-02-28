# Seltzer UI Tests

This folder contains all the UI tests for Seltzer.

For `production`, it runs on a few known sites to verify behavior is still the same across all sites.

## Handy commands
- `yarn install` Probably a no-brainer command, but this will at least ensure Cypress is installed.

- `cd ui-tests; yarn cypress open --project $PWD`
- (or `yarn cypress open --project $PWD/ui-tests`)

This will open the interactive GUI, so you can work on the spec files
    - If cypress asks to "select manually", select the `ui-tests` folder and it should setup correctly.

`cypress run --config baseUrl=https://sparkreale.wpengine.com/` 
This will run a headless test with your own configured Sites 2.0 domain.
(Also, this will not send it to the Cypress dashboard)

`yarn test` This will run the files in CI mode and upload the results to the Cypress dashboard
(This **will** send the results to the Cypress dashboard)
