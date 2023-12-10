const fs = require('fs')
const buffer = fs.readFileSync('08/input.txt')
const data = buffer.toString()
const { performance } = require('perf_hooks');

const gcd = (a, b) => {
    if (!b) {
      return a;
    }
    return gcd(b, a % b);
  };
  
const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
};

const main = () => {
    const raw = data.split("\n");
    const lrList = raw[0].split("");

    const rawLines = raw.slice(2)
    const routes = {}
    let startPoints = []
    let totalEndZ = [];
    for(let i = 0; i<rawLines.length; i++){
        const rawLine = rawLines[i].split("=");
        const start = rawLine[0].trimEnd()
        const ways = rawLine[1].match(/\(([^)]+)\)/)[1].split(",")

        routes[start] = ways.map(w => {
            const value = w.trimStart()
            if(value.endsWith("Z")){
                totalEndZ.push(value)
            }
            return value
        })

        if(start.endsWith("A")){
            startPoints.push(start)
        }
        if(start.endsWith("Z")){
            totalEndZ.push(start)
        }

    }
    let side = 0;
    let total = 0;
    let indx = 0;
    let all = [];
    for(let i = 0; i< startPoints.length; i++){ 
        let nextPoint = startPoints[i]
        while(!nextPoint.endsWith("Z")){
            side = lrList[indx] === 'L' ?  0 : 1
            nextPoint = routes[nextPoint][side]
            indx += 1
            if(indx > lrList.length - 1){
                indx = 0
            }
            total += 1
        }
        all[i] = total
        total = 0;
    }
    console.log("Found ways::", all)
    console.log("LCM of the ways (result): ", all.reduce((a,b)=>lcm(a,b)))
}
let startTime = performance.now();
main();
let endTime = performance.now();
let runningTime = endTime - startTime;

console.log(`Running time: ${runningTime} ms`);