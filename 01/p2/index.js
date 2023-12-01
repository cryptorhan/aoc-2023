const fs = require('fs');

const numberMap = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

const calculateLineValue = (line) => {
  const result = []
  for(const number of Object.keys(numberMap).concat(Object.values(numberMap))){
    const firstIndex = line.indexOf(number)
    const lastIndex = line.lastIndexOf(number)
    if(firstIndex !== -1){
      const num = isNaN(parseInt(number)) ? numberMap[number] : parseInt(number) 
      result.push({index: parseInt(firstIndex), value: num})
      if(firstIndex !== lastIndex){
        result.push({index: parseInt(lastIndex), value: num})
      }
    }
  }
  result.sort((a,b) => a.index - b.index)
  
  if(result.length === 1) return parseInt(String(result[0].value) + String(result[0].value))
  if(result.length === 2) return parseInt(String(result[0].value) + String(result[1].value))
  return parseInt(String(result[0].value) + String(result[result.length -1].value))
  
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
      const total = calculateLineValue(line)
      calibrationSum += total
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