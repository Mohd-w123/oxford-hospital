const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(process.cwd(), '.next', 'standalone');

if (fs.existsSync(standaloneDir)) {
  console.log('Copying assets to standalone folder...');
  try {
    fs.cpSync('public', path.join(standaloneDir, 'public'), { recursive: true });
    fs.cpSync(path.join('.next', 'static'), path.join(standaloneDir, '.next', 'static'), { recursive: true });
    console.log('✅ Assets copied to standalone folder.');
  } catch (err) {
    console.error('Warning during asset copy:', err.message);
  }
} else {
  console.log('Standalone output not found (e.g. running on Vercel), skipping standalone copy.');
}
