const fs = require('fs');

const calculateLineValue = (line) => {
  let lineValue = ""
  for(const char of line){
      if(isNaN(parseInt(char))){
          continue;
      }else{
          lineValue+=char
      }
  }
  if(lineValue.length === 1){
      lineValue = parseInt(lineValue+lineValue)
  }
  if(lineValue.length === 2){
      lineValue = parseInt(lineValue)
  }
  if(lineValue.length > 2){
      lineValue = parseInt(lineValue[0]+lineValue[lineValue.length -1 ])
  }
  return lineValue
}
const readFileLineByLine = (filename) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename);
    const rl = require('readline').createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let calibrationSum = 0;
    rl.on('line', (line) => {
      calibrationSum += calculateLineValue(line)
    });

    rl.on('close', () => {
      resolve(calibrationSum);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  const inputFile = `${__dirname}/../input.txt`;
  try {
    const calibrationSum = await readFileLineByLine(inputFile);
    console.log('Sum of calibration values:', calibrationSum);
  } catch (err) {
    console.error('Error reading file:', err);
  }
};

main();