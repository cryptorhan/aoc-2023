const fs = require('fs')
const buffer = fs.readFileSync('09/input.txt')
const data = buffer.toString()

const generateNumberTree = (tree, line) => {
    tree.push(line)
    const last = tree[tree.length -1]
    if(Number(last.join("")) === 0) return tree.filter(layer => layer.length)
    const next = last.map((n, indx) => (last[indx +1]) - n).filter(n => !isNaN(n))
    return generateNumberTree(tree, next)
}

const findNextNumber = (line, isLeft) => {
    const diffTree = generateNumberTree([], isLeft ? line.reverse() : line)
    const nextValue = diffTree.reduce((acc, curr) => acc + curr[curr.length -1], 0)
    return nextValue
}

const main = (isLeft) => {
    const lines = data.split("\n").map(line => line.split(" ").map(n => Number(n)))
    const foundNumbers = lines.map(l => findNextNumber(l, isLeft))
    const total = foundNumbers.reduce((acc, curr) => acc + curr, 0)
    console.log(`Sum of the ${isLeft ? "LEFT" : "RIGHT"} extrapolated values: `, total)
}

// main()
main(true)