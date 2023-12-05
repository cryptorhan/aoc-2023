const fs = require('fs')
const buffer = fs.readFileSync('05/input.txt')
const data = buffer.toString()

const calculateLocation = (data) =>{
    const [rawSeeds, ...sourceMaps] = data.split("\n\n");
    const seeds = rawSeeds.split(": ")[1].split(" ").map(Number)
    const dataSets = sourceMaps.map((sm) => sm.split("\n").slice(1).map((y) => y.split(" ").map(Number)));

    const locations = []
    for(let seed of seeds){
        for(const data of dataSets){
            for(const value of data){

                const destination = value[0]
                const source = value[1]
                const range = value[2]

                if(source <= seed && source + range > seed){
                    const indx = seed - source
                    seed = destination + indx
                    break;
                }
            }
        }
        locations.push(current)
    }
    return Math.min(...locations)
}

console.log("Min location is:", calculateLocation(data))