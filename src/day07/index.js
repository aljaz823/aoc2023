import run from 'aocrunner'

const parseInput = (rawInput) => {
    return rawInput.split('\n').map((line) => line.split(' '))
}

const CARDS = {
    A: 13,
    K: 12,
    Q: 11,
    J: 10,
    T: 9,
    9: 8,
    8: 7,
    7: 6,
    6: 5,
    5: 4,
    4: 3,
    3: 2,
    2: 1
}

const comparePart1 = (a, b) => {
    CARDS.J = 10
    return compare(a, b)
}

const comparePart2 = (a, b) => {
    CARDS.J = 0
    return compare(a, b, true)
}

const compare = (a, b, part2 = false) => {
    let aCards = a[0],
        bCards = b[0]

    let aType = getType(aCards, part2)
    let bType = getType(bCards, part2)

    if (aType === bType) {
        for (let i = 0; i < 5; i++) {
            let astr = CARDS[aCards[i]],
                bstr = CARDS[bCards[i]]

            if (astr === bstr) continue
            else return astr > bstr ? 1 : -1
        }
    } else {
        return aType > bType ? 1 : -1
    }
}

const getType = (cards, part2 = false) => {
    let type

    if (part2 && cards.includes('J')) {
        for (let card in CARDS) {
            let potentialType = getHandType(
                buildHand(cards.replaceAll('J', card))
            )

            type = !type || potentialType > type ? potentialType : type
        }
    } else {
        type = getHandType(buildHand(cards))
    }

    return type
}

const buildHand = (cards) => {
    let hand = new Map()

    for (let c of cards) {
        hand.set(c, hand.get(c) ? hand.get(c) + 1 : 1)
    }

    return hand
}

const getHandType = (hand) => {
    if (hand.size === 1) return 6
    if (hand.size === 4) return 1
    if (hand.size === 5) return 0

    if (hand.size === 3) return Array.from(hand.values()).includes(3) ? 3 : 2

    if (hand.size === 2)
        return [1, 4].includes(hand.values().next().value) ? 5 : 4
}

const part1 = (rawInput) => {
    return parseInput(rawInput)
        .sort(comparePart1)
        .reduce((sum, line, i) => sum + parseInt(line[1]) * (i + 1), 0)
}

const part2 = (rawInput) => {
    return parseInput(rawInput)
        .sort(comparePart2)
        .reduce((sum, line, i) => sum + parseInt(line[1]) * (i + 1), 0)
}

run({
    part1: {
        tests: [
            {
                input: `
                32T3K 765
                T55J5 684
                KK677 28
                KTJJT 220
                QQQJA 483`,
                expected: 6440
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
                32T3K 765
                T55J5 684
                KK677 28
                KTJJT 220
                QQQJA 483`,
                expected: 5905
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
