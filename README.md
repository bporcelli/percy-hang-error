# percy-hang-error
Reproducible test case for Percy hang error reported in https://github.com/percy/cli/issues/742#issuecomment-1054700031.

To reproduce:
- Push or create a PR.
- Observe that the Cypress Run step hangs after Percy logs "Finalizing snapshot..." and the job is eventually cancelled after it exceeds the configured 15m timeout.
