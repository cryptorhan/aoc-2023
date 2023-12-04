const fs = require('fs');


const calculateLineWinValue = (line) => {
    let [myNumbers, realNumbers] = line.split(":")[1].split("|").map(a => a.trimStart().trimEnd().split(" ").filter(i => i))
    const matches = []
    for(const value of myNumbers){
        if(realNumbers.includes(value)){
            matches.push(value)
        }
    }
    console.log(`${line.split(":")[0]}  matches:`, matches)
    if(matches.length === 0) return 0
    if(matches.length === 1) return 1
    return 2 ** (matches.length - 1)
}

const readFileLineByLine = (filename) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename);
    const rl = require('readline').createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let totalWin = 0;
    rl.on('line', (line) => {
        totalWin += calculateLineWinValue(line)
    });

    rl.on('close', () => {
      resolve(totalWin);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  const inputFile = `${__dirname}/../input.txt`;
  try {
    const winSum = await readFileLineByLine(inputFile);
    console.log('Sum of winner values:', winSum);
  } catch (err) {
    console.error('Error reading file:', err);
  }
};

main();