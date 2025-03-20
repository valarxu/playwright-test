const { chromium } = require('playwright');

(async () => {
    const browserServer = await chromium.launchServer();
    console.log(`Browser Server running at: ${browserServer.wsEndpoint()}`);
})();
