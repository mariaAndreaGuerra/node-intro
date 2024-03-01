const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      console.log(`Contents of ${path}:\n${data}`);
    }
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);

    console.log(`Contents of ${url}:\n${response.data}`);
  } catch (error) {
    console.error(`Error fetching URL: ${error.message}`);
  }
}

if (process.argv.length < 3) {
  console.error('Usage: node script.js <file_path_or_url>');
} else {
  const argument = process.argv[2];

  if (argument.startsWith('http://') || argument.startsWith('https://')) {
    webCat(argument);
  } else {
    cat(argument);
  }
}
