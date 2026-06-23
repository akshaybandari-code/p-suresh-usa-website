import fs from 'fs';

let content = fs.readFileSync('./src/admin/services/cmsService.js', 'utf8');

const correctWithTimeout = `// Helper to prevent infinite hangs on Sanity fetch
const withTimeout = (promise, ms = 8000) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Sanity request timed out')), ms);
  });
  return Promise.race([ promise, timeoutPromise ]).finally(() => clearTimeout(timeoutId));
};`;

content = content.replace(
  /\/\/ Helper to prevent infinite hangs on Sanity fetch[\s\S]*?\]\);\n\};/,
  correctWithTimeout
);

fs.writeFileSync('./src/admin/services/cmsService.js', content, 'utf8');
console.log('Fixed withTimeout unhandled rejection');
