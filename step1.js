const fs = require('fs');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      console.log(`Contents of ${path}:\n${data}`);
    }
  });
}

if (process.argv.length < 3) {
  console.error('Usage: node script.js <file_path>');
} else {
  const filePath = process.argv[2];

  cat(filePath);
}
