const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const http = require('http');

(async () => {
  const port = 3000;
  const browser = await puppeteer.launch({ args: ['--no-sandbox'], headless: true });
  const page = await browser.newPage();

  const server = http.createServer((req, res) => {
    res.end('Hello, World!');
  });
  server.listen(port);

  const serverURL = `http://localhost:${port}`;

  try {
    const options = {
      port: port,
      budgets: null, // Disable budgets if not needed
      // Increase the timeout value (default is 1 minute)
      disableStorageReset: true,
      settings: {
        maxWaitForFcp: 60000, // Increase the timeout for First Contentful Paint (FCP)
        maxWaitForLoad: 60000, // Increase the timeout for page load
      },
    };

    const lighthouseResult = await lighthouse(serverURL, options);

    console.log('Performance score:', lighthouseResult.lhr.categories.performance.score);
    console.log('Loading speed (First Contentful Paint):', lighthouseResult.lhr.audits['first-contentful-paint'].numericValue);

    // Generate and log the full Lighthouse report
    const report = lighthouseResult.report;
    console.log(report);
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await browser.close();
    server.close();
  }
})();


