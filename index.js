const { chromium } = require('playwright');

(async () => {
  // 启动浏览器（设置为非无头模式以便观察）
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 打开推特登录页面
  await page.goto('https://twitter.com/login');

  // 输入用户名和密码
  await page.fill('input[name="text"]', 'valar128507');
  await page.click('text=下一步');
  await page.fill('input[name="password"]', 'BlackstoneTT0122');
  await page.click('div[role="button"]:has-text("登录")');

  // 等待登录完成
  await page.waitForNavigation();

  // 搜索并浏览内容
  await page.fill('input[aria-label="搜索查询"]', 'AI');
  await page.press('input[aria-label="搜索查询"]', 'Enter');

  // 等待搜索结果加载
  await page.waitForSelector('div[data-testid="tweet"]');

  // 提取推文内容
  const tweets = await page.$$eval('div[data-testid="tweet"]', nodes => 
    nodes.map(node => node.innerText)
  );
  console.log(tweets);

  // 关闭浏览器
  await browser.close();
})();