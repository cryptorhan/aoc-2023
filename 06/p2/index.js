const fs = require('fs')
const buffer = fs.readFileSync('06/input.txt')
const data = buffer.toString()

const main = () => {
    let time = Number(data.split("\n")[0].split(":")[1].trimStart().trimEnd().split(" ").filter(i => i).join(""))
    let distance = Number(data.split("\n")[1].split(":")[1].trimStart().trimEnd().split(" ").filter(i => i).join(""))
    const start = 1
    const end = time - 1

    let firstRecord = 0
    for(let pushTime = start; pushTime<= end; pushTime++){
        const travel = pushTime * (time - pushTime)
        if(distance < travel){
            firstRecord = pushTime
            break;
        }
    }

    let lastRecord = 0
    for(let pushTime = end; pushTime > firstRecord; pushTime --){
        const travel = pushTime * (time - pushTime)
        if(distance < travel){
            lastRecord = pushTime
            break;
        }
    }
    
    const result = lastRecord - firstRecord + 1
    console.log("RESULT: ", result)
}

main()