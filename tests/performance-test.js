const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch();
  const options = { port: chrome.port };
  const runnerResult = await lighthouse('http://localhost:3000', options);

  // Output the performance results
  console.log('Performance score:', runnerResult.lhr.categories.performance.score);
  console.log('Loading speed (First Contentful Paint):', runnerResult.lhr.audits['first-contentful-paint'].numericValue);

  await chrome.kill();
})();
