const fs = require('fs');

const processLine = (line) => {
    const [_, gameInfo] = line.split(":")
    let initial = {
        green:0,
        blue: 0,
        red: 0 
    }
    for(const set of gameInfo.split(";")){
        const cubes = set.split(",")
        for(const c of cubes){
            const [amount, color] = c.trimStart().split(" ")
            if(initial[color] < parseInt(amount)){
                initial[color] = parseInt(amount)
            }
        }
    }
    return initial.green * initial.blue * initial.red
}

const readFileLineByLine = (filename) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename);
    const rl = require('readline').createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
    let totalGame = 0
    rl.on('line', (line) => {
        totalGame += processLine(line)
    });

    rl.on('close', () => {
      resolve(totalGame);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  const inputFile = `${__dirname}/../input.txt`;
  try {
    const validGameSum = await readFileLineByLine(inputFile);
    console.log('Total value of valid games: ', validGameSum);
  } catch (err) {
    console.error('Error reading file:', err);
  }
};

main();