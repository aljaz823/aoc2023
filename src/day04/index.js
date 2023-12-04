import run from 'aocrunner'

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
    const input = parseInput(rawInput)

    let sum = 0

    for (let line of input) {
        line = line.split(':')[1].split('|')

        let winning = line[0].trim().split(' ')
        let cards = line[1].trim().split(' ')

        let numOfWinning = 0
        for (const card of cards) {
            if (!!card && winning.includes(card)) {
                numOfWinning++
            }
        }

        let score = 0
        for (let i = 0; i < numOfWinning; i++) {
            if (i === 0) {
                score++
            } else {
                score = score * 2
            }
        }

        sum += score
    }

    return sum
}

const part2 = (rawInput) => {
    const input = parseInput(rawInput)

    let times = {}

    for (let line of input) {
        line = line.split(':')

        let gameNum = line[0].substring(5).trim()
        let gameNumInt = parseInt(gameNum)

        times[gameNum] = !times[gameNum] ? 1 : times[gameNum] + 1

        line = line[1].split('|')

        let winning = line[0].trim().split(' ')
        let cards = line[1].trim().split(' ')

        let numOfWinning = getNumOfWinning(winning, cards)

        for (let i = gameNumInt + 1; i <= gameNumInt + numOfWinning; i++) {
            let key = i.toString()
            times[key] = !times[key] ? 0 : times[key]
            times[key] = times[key] + 1 * times[gameNum]
        }
    }

    let sum = 0

    for (let key in times) {
        sum += times[key]
    }

    return sum
}

const getNumOfWinning = (winning, cards) => {
    let numOfWinning = 0
    for (const card of cards) {
        if (!!card && winning.includes(card)) {
            numOfWinning++
        }
    }

    return numOfWinning
}

run({
    part1: {
        // tests: [
        //     {
        //         input: `
        //         Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        //         Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        //         Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        //         Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        //         Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        //         Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        //         expected: 13
        //     }
        // ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
              Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
              Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
              Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
              Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
              Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
              Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
              `,
                expected: 30
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
