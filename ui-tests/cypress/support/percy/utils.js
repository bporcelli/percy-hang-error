/**
 * Helpers for generating Percy snapshots.
 */

/**
 * Waits for the DOM to stabilize.
 * Useful for detecting when DOM changes are complete after a window resize.
 *
 * @param {Window} win Window object.
 * @param {Number} idleTimeout Number of milliseconds DOM must be idle for to be considered stable.
 * @param {Number} timeout Maximum amount of time to wait for DOM stabilization before resolving.
 *
 * @return Promise Promise that resolves when DOM is stable or `timeout` is exceeded.
 */
export function waitForStableDOM(win, idleTimeout = 50, timeout = 3000) {
    return new Promise(resolve => {
        let fallbackTimer, timer;

        const observer = new MutationObserver(() => {
            clearTimeout(timer);
            timer = setTimeout(handleTimeout, idleTimeout);
        });

        const handleTimeout = () => {
            clearTimeout(timer);
            clearTimeout(fallbackTimer);
            observer.disconnect();
            resolve();
        };

        const observerConfig = {
            attributes: true,
            subtree: true,
            childList: true,
        };
        observer.observe(win.document.body, observerConfig);

        fallbackTimer = setTimeout(handleTimeout, timeout);
    });
}

/**
 * Generates a default name for a Percy snapshot.
 * Defaults to `<page_path> page after scroll` in keeping with existing
 * snapshot naming conventions.
 *
 * @param {Window} win Window object.
 *
 * @return {String} Snapshot name.
 */
export function generateSnapshotName(win) {
	return `${win.location.pathname} page after scroll`;
}
