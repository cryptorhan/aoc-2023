const fs = require('fs')
const buffer = fs.readFileSync('07/input.txt')
const data = buffer.toString()

const CARDS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse()
const JOKER_CARDS = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2','J'].reverse()

const cardAmounts = (hand) => {
    let charAndSize = {}
    for(let i = 0; i < hand.length; i++) {
        if(!charAndSize[hand[i]]) {
            charAndSize[hand[i]] = 1
        }else{
            charAndSize[hand[i]] += 1
        }
    }
    return charAndSize
};

const orderSameType = (hand1, hand2, joker=false) => {
    const cards = joker ? JOKER_CARDS : CARDS
    const h1 = hand1.split("")
    const h2 = hand2.split("")
    for(let i = 0; i < h1.length; i++){
       if(h1[i] !== h2[i]){
        const h1Value = cards.indexOf(h1[i])
        const h2Value = cards.indexOf(h2[i])
        return h1Value > h2Value ? [1,0] : [0,1]
       }
    }
}

const charValues = (charAndSize) => {
    return Object.values(charAndSize).sort((a,b) => b - a).join("")
}

const calculateJokerStrength = (hand, cardAmount, strength) => {
    const uniqueCards = Object.keys(cardAmount)
    if(cardAmount["J"] === hand.length || cardAmount["J"] === hand.length - 1){
        return `${hand.length}`
    }

    if(uniqueCards.length === hand.length){
        return `${2}${strength.slice(1)}`
    }
    const info = {...cardAmount}
    delete info["J"]
    const bestCard = Object.keys(info).reduce((a, b) => (info[a] > info[b] ? a : b));
    info[bestCard] += cardAmount["J"]

    return charValues(info)
        
}

const main = (jokerEnabled=false) => {
    const lines = data.split("\n")
    const handInfos = []
    for(let i = 0; i < lines.length; i++){
        let hand = lines[i].split(" ")[0]
        let bet = lines[i].split(" ")[1]
        let cardAmount = cardAmounts(hand)
        let strength = charValues(cardAmount)

        if(jokerEnabled && hand.includes('J')){
            strength = calculateJokerStrength(hand, cardAmount, strength)
        }
        handInfos.push({
            hand,
            bet,
            value: cardAmount,
            strength
        })
    }

    const sortedCards = handInfos.sort((a, b) => {
        if(Number(a.strength.split("")[0]) < Number(b.strength.split("")[0])){
          return -1;
        }

        if(Number(a.strength.split("")[0]) > Number(b.strength.split("")[0])){
          return 1;
        }

        if(Number(a.strength) > Number(b.strength)){
          return -1;
        }

        if(Number(a.strength) < Number(b.strength)){
          return 1;
        }

        //Same type. Let's compare values
        const [hand1Value, hand2Value] = orderSameType(a.hand, b.hand, jokerEnabled)

        if(hand1Value < hand2Value){
          return - 1
        }
        if(hand1Value > hand2Value){
          return 1;
        }
      
        return 0;
    })
    let total = 0
    for(let i = 0; i < sortedCards.length; i++){
        total += sortedCards[i].bet * (i + 1)
    }
    console.log("sorted::", sortedCards)
    console.log("TOTAL::", total) 
}

// main()
main(true)