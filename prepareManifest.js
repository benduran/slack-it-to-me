const fs = require('fs');
const path = require('path');

const { render } = require('micromustache');

const manifestSrc = path.join(__dirname, 'manifest.json');
const manifestDest = path.join(__dirname, 'dist', 'manifest.json');

const jsBundleFileName = fs.readdirSync(path.join(__dirname, 'dist')).find(fp => fp.endsWith('.js'));

const contents = fs.readFileSync(manifestSrc, 'utf8');
fs.writeFileSync(manifestDest, render(contents, { jsBundleFileName }), 'utf8');
