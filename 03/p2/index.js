const fs = require('fs');

const GEAR = '*'
const COLUMN_SIZE = 140
const LAST_LINE = 140
const SearchSide = {
  Up: 'up',
  Down: 'down',
  Direct: 'same-line'
}

const findLineIndex = (lineNo, side) => {
  switch (side) {
    case SearchSide.Up:
      return lineNo - 1 <= 0 ? 0 : lineNo - 1
    case SearchSide.Down:
      return lineNo + 1 > LAST_LINE - 1 ? LAST_LINE - 1 :  lineNo + 1
    case SearchSide.Direct:
      return lineNo       
    default:
      throw new Error('Provide correct side to find match')
  }
}

const isNumber = (x) => {
  return !isNaN(parseInt(x))
}

const extractNumber = (line, index, direction='right') => {
    let finalNumber = ""
    let search = []
    if(direction === 'left'){
      search = [...line.slice(0, index).reverse()]
    }else{
      search = [...line.slice(index)]
    }
    for(const char of search){
      if(isNumber(char)){
        finalNumber+=char
      }else{
        break;
      }
    }
  
    if(direction === 'left'){
      finalNumber = finalNumber.split('').reverse().join('')
    }
    const result = isNumber(finalNumber) ? parseInt(finalNumber) : 0
    console.log(`${direction}: ${result}`)
    // console.log("sarch::", search.join(""))
    return result
  }
  

const getGearValue = (lines, lineNo, charNo, side) => {
    console.log(`---- [${lineNo +1}][${charNo}]${lines[lineNo][charNo]} side: ${side}-----`)
    const index = findLineIndex(lineNo, side)
    const line = lines[index]
  
    const adjs = [line[charNo -1], line[charNo], line[charNo + 1]]
    console.log("ADJ::", adjs)
    const numberSize = adjs.filter(a => isNumber(a)).length
    if( numberSize === 0){
      console.log("No adj found")
      return []
    }
    if(numberSize === 3){
      console.log("Straigt:", parseInt(adjs.join("")))
      return [adjs.join("")]
    }
  
    if(!isNumber(adjs[0])){
      const s1 = extractNumber(line, charNo , 'right')
      if(s1 === 0){
        const s2 = extractNumber(line, charNo + 1 , 'right')
        if(s2 > 0){
            return [s2]
        }else{
            return []
        }
      }
      return [s1]
    }
  
    if(!isNumber(adjs[1])){
      const left = extractNumber(line, charNo, 'left')
      const right = extractNumber(line, charNo + 1, 'right')
      return [left, right]
    }
  
    if(!isNumber(adjs[2])){
      return [extractNumber(line, charNo + 1, 'left')]
    }
}


const calculateValidTotal = (lines) => {
  let total = 0
  for(let k = 0; k < lines.length; k++){
    for(let i = 0; i < 140; i++){
      
      if(GEAR === lines[k][i]){
        const direct = getGearValue(lines, k, i, SearchSide.Direct)
        const up = getGearValue(lines, k, i, SearchSide.Up)
        const down = getGearValue(lines, k, i, SearchSide.Down)
        const all = [...direct, ...up, ...down].filter(n => n > 0)
        console.log("ALL::", all)
        if(all.length === 2){
            console.log("TOTAL GEAR: ", all[0] * all[1])
            total += all[0] * all[1]
        }
        console.log("######################")
        // total += gear
      }
    }
  }
  return total
}

const readFileLineByLine = (filename) => {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(filename);
    const rl = require('readline').createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    const lines = []
    let totalValue = 0;
    let counter = 0;
    rl.on('line', (line) => {
      lines.push(line.split(""))
      counter+=1
      if(counter === LAST_LINE){
        totalValue = calculateValidTotal(lines)
      }
    });

    rl.on('close', () => {
      resolve(totalValue);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
};

const main = async () => {
  const inputFile = `${__dirname}/../input.txt`;
  try {
    const total = await readFileLineByLine(inputFile);
    console.log('Sum of values:', total);
  } catch (err) {
    console.error('Error reading file:', err);
  }
};

main();