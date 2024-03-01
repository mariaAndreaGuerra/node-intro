const fs = require('fs');
const axios = require('axios');

function cat(path, outputFile) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
    } else {
      if (outputFile) {
        fs.writeFile(outputFile, data, 'utf8', (writeErr) => {
          if (writeErr) {
            console.error(`Error writing to file: ${writeErr.message}`);
          } else {
            console.log(`Contents written to ${outputFile}`);
          }
        });
      } else {
        console.log(`Contents of ${path}:\n${data}`);
      }
    }
  });
}

async function webCat(url, outputFile) {
  try {
    const response = await axios.get(url);

    if (outputFile) {
      fs.writeFile(outputFile, response.data, 'utf8', (writeErr) => {
        if (writeErr) {
          console.error(`Error writing to file: ${writeErr.message}`);
        } else {
          console.log(`Contents written to ${outputFile}`);
        }
      });
    } else {
      console.log(`Contents of ${url}:\n${response.data}`);
    }
  } catch (error) {
    console.error(`Error fetching URL: ${error.message}`);
  }
}

if (process.argv.length < 3) {
  console.error('Usage: node script.js [--out output-filename.txt] <file_path_or_url>');
} else {
  let outputFile;
  let argumentIndex = 2;

  if (process.argv[2] === '--out') {
    outputFile = process.argv[3];
    argumentIndex = 4;
  }

  const argument = process.argv[argumentIndex];

  if (argument.startsWith('http://') || argument.startsWith('https://')) {
    webCat(argument, outputFile);
  } else {
    cat(argument, outputFile);
  }
}
