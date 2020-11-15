const fs = require('fs');
const path = require('path');

const { render } = require('micromustache');

const iconSrc = path.join(__dirname, 'public', 'icon.png');
const iconDest = path.join(__dirname, 'dist', 'icon.png');
const manifestSrc = path.join(__dirname, 'manifest.json');
const manifestDest = path.join(__dirname, 'dist', 'manifest.json');

const builtFiles = fs.readdirSync(path.join(__dirname, 'dist'));
const contentScript = builtFiles.find(fp => fp.endsWith('content.js'));
const backgroundScript = builtFiles.find(fp => fp.endsWith('background.js'));

const contents = fs.readFileSync(manifestSrc, 'utf8');
fs.writeFileSync(manifestDest, render(contents, { backgroundScript, contentScript }), 'utf8');

fs.createReadStream(iconSrc).pipe(fs.createWriteStream(iconDest));
