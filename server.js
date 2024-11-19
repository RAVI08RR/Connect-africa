// const express = require('express');
// const puppeteer = require('puppeteer');
// const cors = require('cors');
// const https = require('https');
// const fs = require('fs');
// const path = require('path');

// const app = express();

// app.use(cors()); // Enable CORS
// app.use(express.static('public'));

// app.get('/proxy', async (req, res) => {
//   const { url } = req.query;
//   if (!url) {
//     return res.status(400).send('URL query parameter is required');
//   }

//   try {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox']
//     });
//     const page = await browser.newPage();

//     // Set viewport size to improve rendering of responsive sites
//     await page.setViewport({ width: 1280, height: 800 });

//     // Go to the requested URL and wait for the network to be idle
//     await page.goto(url, { waitUntil: 'networkidle2' });

//     // Evaluate JavaScript to ensure the page content is fully loaded
//     await page.evaluate(() => {
//       return new Promise((resolve) => {
//         const interval = setInterval(() => {
//           if (document.readyState === 'complete') {
//             clearInterval(interval);
//             resolve();
//           }
//         }, 100);
//       });
//     });

//     // Capture the full page content
//     const content = await page.content();

//     await browser.close();
    
//     // Set the appropriate content type and send the content
//     res.setHeader('Content-Type', 'text/html');
//     res.send(content);
//   } catch (error) {
//     console.error('Error fetching the requested URL:', error);
//     res.status(500).send('Error fetching the requested URL');
//   }
// });

// // Read your SSL certificate and key files
// const options = {
//   key: fs.readFileSync('C:/Users/Travash/localhost.key'),
//   cert: fs.readFileSync('C:/Users/Travash/localhost.crt'),
//   //ca: fs.readFileSync('/path/to/your/ca_bundle.crt') // if you have a CA bundle file
// };

// // Create an HTTPS server
// https.createServer(options, app).listen(3002, () => {
//   console.log('Puppeteer server running on https://localhost:3002');
// });
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS
app.use(express.static('public'));

app.get('/proxy', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL query parameter is required');
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set viewport size to improve rendering of responsive sites
    await page.setViewport({ width: 1280, height: 800 });

    // Go to the requested URL and wait for the network to be idle
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Evaluate JavaScript to ensure the page content is fully loaded
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (document.readyState === 'complete') {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      });
    });

    // Capture the full page content
    const content = await page.content();

    await browser.close();
    
    // Set the appropriate content type and send the content
    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    console.error('Error fetching the requested URL:', error);
    res.status(500).send('Error fetching the requested URL');
  }
});

// Create an HTTP server
app.listen(3001, () => {
  console.log('Puppeteer server running on http://localhost:3001');
});
