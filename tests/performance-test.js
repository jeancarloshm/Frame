const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const http = require('http'); // Require 'http' module for the local server

(async () => {
  const port = 41421; // Replace with your desired port number
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  // Start a local server (Outside page.evaluate())
  const server = http.createServer((req, res) => {
    res.end('Hello, World!');
  });
  server.listen(3000);

  // Get the local server URL
  const serverURL = `http://localhost:3000`;

  try {
    const options = { port };
    const lighthouseResult = await lighthouse(serverURL, options);

    // Output the performance results
    console.log('Performance score:', lighthouseResult.lhr.categories.performance.score);
    console.log('Loading speed (First Contentful Paint):', lighthouseResult.lhr.audits['first-contentful-paint'].numericValue);
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    // Close the browser and stop the local server
    await browser.close();
    server.close();
  }
})();
