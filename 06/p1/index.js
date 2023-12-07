const fs = require('fs')
const buffer = fs.readFileSync('06/input.txt')
const data = buffer.toString()

const main = () => {
    const times = data.split("\n")[0].split(":")[1].trimStart().trimEnd().split(" ").filter(i => i)
    const distances = data.split("\n")[1].split(":")[1].trimStart().trimEnd().split(" ").filter(i => i)
    console.log("time::", times)
    console.log("distances::", distances)
    const possibleRecords = []
    for(let k = 0; k<times.length; k++){
        const time = Number(times[k])
        const start = 1
        const end = time - 1
        console.log("time:", times[k], " distance: ", distances[k])
        for(let pushTime = start; pushTime<= end; pushTime++){
            const travel = pushTime * (time - pushTime)
            console.log("Pushtime:", pushTime, "Travel::", travel)
            if(Number(distances[k]) < travel){
                console.log("Yooo, new record found: ", travel)
                if(possibleRecords.length < k+1){
                    possibleRecords[k] = 1
                }else{
                    possibleRecords[k] += 1
                }
            }

        }
        console.log("\n#############\n") 
    }
    const result = possibleRecords.reduce((accumulator, currentValue) => {
        return accumulator * currentValue;
      }, 1);

    console.log("RESULT: ", result)
}

main()