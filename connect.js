const { chromium } = require('playwright');

(async () => {
    try {
        // 连接到已打开的 Chrome
        const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');

        // 获取已有的浏览器上下文（或新建一个）
        const context = browser.contexts()[0] || await browser.newContext();
        
        // 在已有的浏览器窗口中打开新页面
        const page = await context.newPage();
        await page.goto('https://www.baidu.com');

        // 获取页面标题
        console.log(await page.title());

        // 你可以继续操作页面，比如点击按钮、输入文本等
        await page.fill('input[name="wd"]', 'Playwright'); // 修正百度搜索框的selector
        await page.keyboard.press('Enter');

        // 不关闭浏览器，只断开 Playwright 连接
        await browser.disconnect(); // 使用disconnect而不是close
    } catch (error) {
        console.error('连接出错:', error);
    }
})();