const fs = require('fs')
const buffer = fs.readFileSync('08/input.txt')
const data = buffer.toString()

const FINISH = 'ZZZ'
const START = 'AAA'
const { performance } = require('perf_hooks');

const main = () => {
    const raw = data.split("\n");
    const lrList = raw[0].split("");

    const rawLines = raw.slice(2)
    const routes = {}
    for(let i = 0; i<rawLines.length; i++){
        const rawLine = rawLines[i].split("=");
        const start = rawLine[0].trimEnd()
        const ways = rawLine[1].match(/\(([^)]+)\)/)[1].split(",")
        routes[start] = ways.map(w => w.trimStart())
    }

    let nextPoint = START;
    console.log("Starting point: ", nextPoint)
    let side = 0;
    let total = 0;
    let indx = 0;
    while(nextPoint !== FINISH){
        side = lrList[indx] === 'L' ?  0 : 1
        nextPoint = routes[nextPoint][side]
        indx += 1
        if(indx > lrList.length - 1){
            console.log("Restarting search from start....")
            indx = 0
        }
        total += 1

    }

    console.log(`Found ${FINISH} in ${total} steps`)
}
let startTime = performance.now();
main();
let endTime = performance.now();
let runningTime = endTime - startTime;

console.log(`Running time: ${runningTime} ms`);