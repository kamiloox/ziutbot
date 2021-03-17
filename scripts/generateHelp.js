const fs = require('fs');
const path = require('path');

const findFilesRecursiveByName = (dirPath, fileName) => {
  const files = [];

  const readDirectory = (dir) => {
    const currentFiles = fs.readdirSync(dir, { withFileTypes: true });
    currentFiles.forEach((file) => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) readDirectory(filePath);
      if (file.name === fileName) files.push(filePath);
    });
  };
  readDirectory(dirPath);

  return files;
};

const dirPath = path.join(__dirname, '..', 'commands');
const files = findFilesRecursiveByName(dirPath, 'help.json');

const result = [];
files.forEach((filePath) => {
  const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
  const parsedData = JSON.parse(data);
  result.push(parsedData);
});

const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const dataFile = path.join(dataDir, 'mainHelp.json');
fs.writeFile(dataFile, JSON.stringify(result), (err) => {
  if (err) return console.log('generateHelp: Failure', err);
  console.log('generateHelp: Success');
});
