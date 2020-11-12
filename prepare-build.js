const fs = require('fs');
const path = require('path');

const { render } = require('micromustache');

const manifestSrc = path.join(__dirname, 'manifest.json');
const manifestDest = path.join(__dirname, 'dist', 'manifest.json');

const htmlSrc = path.join(__dirname, 'dist', 'index.html');
const htmlDest = path.join(__dirname, 'dist', 'popup.html');

const manifestContents = fs.readFileSync(manifestSrc, 'utf8');

const jsBundleFileName = fs
  .readdirSync(path.join(__dirname, 'dist'))
  .find(fname => fname.startsWith('slack-it-to-me') && fname.endsWith('.js'));

fs.writeFileSync(manifestDest, render(manifestContents, { jsBundleFileName }));

const readStream = fs.createReadStream(htmlSrc);
const writeStream = fs.createWriteStream(htmlDest);

writeStream.once('finish', () => {
  fs.unlinkSync(htmlSrc);
  // Parcel v2 is broken and is straight up ignoring the --public-url flag
  const htmlContents = fs.readFileSync(htmlDest, 'utf8');
  fs.writeFileSync(htmlDest, htmlContents.replace(`/${jsBundleFileName}`, `./${jsBundleFileName}`), 'utf8');
});

readStream.pipe(writeStream);
