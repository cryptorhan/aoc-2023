const fs = require('fs');

const TOTAL_LINE = 204;

const calculateMatchSize = (line) => {
  let [myNumbers, realNumbers] = line.split(":")[1].split("|").map(a => a.trimStart().trimEnd().split(" ").filter(i => i))
  const matches = []
  for(const value of myNumbers){
      if(realNumbers.includes(value)){
          matches.push(value)
      }
  }
  return matches
}

const calculateTotalCards = (lines) => {
  const allCards = [{card: 1, totalCards: 1},{card: TOTAL_LINE, totalCards: 1}]

  for(let i = 1; i<=lines.length; i++){
    const exist = allCards.find(c => c.card === i)
    if(!exist){
      allCards.push({
        card: i,
        totalCards: 1
      })
    }
    const matches = calculateMatchSize(lines[i - 1])
    if(matches.length > 0){
      console.log(`${lines[i-1].split(":")[0]} has ${matches.length} match: `, matches)
      for(let k = 1; k <= matches.length ; k++){
        const nextCardIndex = i + k
        const foundIndx = allCards.findIndex(c => c.card === nextCardIndex)
        const currentCardSize = !exist ? 1 : allCards.find(c => c.card === i).totalCards
        if(foundIndx !== -1){
          allCards[foundIndx].totalCards += currentCardSize
        } else{
          allCards.push({
            card: nextCardIndex,
            totalCards: currentCardSize + 1
          })
        }
      }
      console.log("all: ", allCards.sort((a,b) => a.card - b.card))
    }
  }
  console.log("ALL CARDS::", allCards.sort((a,b) => a.card - b.card))
  return allCards.reduce((acc, curr) => {
    return  acc + curr.totalCards
  }, 0)
}

const readFileLineByLine = (filename) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename);
    const rl = require('readline').createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let totalCards = 0;
    const lines = []
    let counter = 0;
    rl.on('line', (line) => {
        lines.push(line)
        counter += 1
        if(counter === TOTAL_LINE){
          totalCards += calculateTotalCards(lines)
        }
    });

    rl.on('close', () => {
      resolve(totalCards);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  const inputFile = `${__dirname}/../input.txt`;
  try {
    const cardNo = await readFileLineByLine(inputFile);
    console.log('Sum of card numbers:', cardNo);
  } catch (err) {
    console.error('Error reading file:', err);
  }
};

main();