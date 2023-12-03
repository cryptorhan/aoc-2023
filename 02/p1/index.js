const fs = require('fs');

const total = {
    red: 12,
    green: 13,
    blue: 14
}

const processLine = (line) => {
    const [gameNo, gameInfo] = line.split(":")
    const gameIndex = gameNo.split(" ")[1]
    let isValid = true;
    for(const set of gameInfo.split(";")){
        let setMap = {}
        const cubes = set.split(",")
        for(const c of cubes){
            const [amount, color] = c.trimStart().split(" ")
            setMap[color] = parseInt(amount)
        }
        for(const key of Object.keys(total)){
            if(setMap[key]){
                if(setMap[key] > total[key]){
                    isValid = false
                }
            }
        }
    }

    if(isValid) return parseInt(gameIndex)
    return 0
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