// File: seo-score.js
// Description: Script untuk menampilkan SEO Score sebuah website menggunakan Google Lighthouse CLI
// Dibuat oleh PuGaGo IT - https://pugago.co.id

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { 
    logLevel: 'info', 
    output: 'json', 
    onlyCategories: ['seo'], 
    port: chrome.port 
  };

  const runnerResult = await lighthouse(url, options);

  const seoScore = runnerResult.lhr.categories.seo.score * 100;
  console.log(`SEO Score for ${url}: ${seoScore}`);

  await chrome.kill();
}

// Ganti URL di bawah ini dengan website yang ingin Anda cek
const url = process.argv[2];
if (!url) {
  console.log('Usage: node seo-score.js <url>');
  process.exit(1);
}

runLighthouse(url);
