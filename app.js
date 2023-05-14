//Dependencies
const fs = require('fs');
const readline = require('readline');
const utils = require('./utils');

//Global Variables
const READER = readline.createInterface({
  input: fs.createReadStream(CONFIG.csvFilePath),
});
const START = new Date(); //Time for execution stats
const USERPROFILES = {}; //Records result
let SCHEMA = undefined; //Based on CSV HEADER
let USER_ID_SCHEMA_INDEX = -1; //Set by finding index in header. It's rely on the config.
let CREATION_DATE_SCHEMA_INDEX = -1; //Set by finding index in header. It's rely on the config.
let IS_FIRST_LINE_EMPTY = true; //Flag to find header
var CONFIG = {
  csvFilePath: './data.csv',
  outputFilePath: './user.json',
  userIdColumnName: 'uid',
  createdAtColumnName: 'createdAt',
};

//Arguments
process.argv.slice(2).forEach((val, index, array) => {
  const splitedValue = val.split('=');
  if (splitedValue.length > 1) {
    const propName = splitedValue[0];
    const propValue = splitedValue[1];
    CONFIG[propName] = propValue;
  }
});
console.log('Config: ', CONFIG);

//Main
//Read file from config csvFilePath
READER.on('line', (line) => {
  splittedLine = line.split(/,(?![^{}]*})/g); //Ensure to split line with JSON Support
  //Set schema parametters from CSV Header
  if (IS_FIRST_LINE_EMPTY) {
    IS_FIRST_LINE_EMPTY = !splittedLine.length; //Ensure that header is not empty
    SCHEMA = splittedLine;
    USER_ID_SCHEMA_INDEX = splittedLine.findIndex(
      (column) => column === CONFIG.userIdColumnName,
    );
    CREATION_DATE_SCHEMA_INDEX = splittedLine.findIndex(
      (column) => column === CONFIG.createdAtColumnName,
    );
  }
  //Parse CSV
  else if (
    utils.isLatestRecord(
      USERPROFILES,
      splittedLine,
      USER_ID_SCHEMA_INDEX,
      CREATION_DATE_SCHEMA_INDEX,
      CONFIG.createdAtColumnName,
    )
  ) {
    utils.addRecord(USERPROFILES, splittedLine, SCHEMA, USER_ID_SCHEMA_INDEX);
  }
});
//Save output in path set by config outputFilePath
READER.on('close', () => {
  console.log(`CSV Parsed in: ${new Date() - START}ms`); //Log execution time
  //Write outputData to JSON file
  const outputData = Object.values(USERPROFILES);
  fs.writeFile(
    CONFIG.outputFilePath,
    JSON.stringify(outputData, null, 2),
    (err) => {
      if (err) {
        console.error('Error writing output file:', err);
      } else {
        console.log(`JSON ${outputData.length} records`);
        console.log('Extraction completed successfully!');
      }
    },
  );
});
