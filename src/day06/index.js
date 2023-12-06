import run from 'aocrunner'
import { log } from 'console'

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
    const input = parseInput(rawInput)

    let times = input
        .split('\n')[0]
        .split(':')[1]
        .trim()
        .split(' ')
        .map(Number)
        .filter((el) => el)

    let distances = input
        .split('\n')[1]
        .split(':')[1]
        .trim()
        .split(' ')
        .map(Number)
        .filter((el) => el)

    let res = 1

    for (let i = 0; i < times.length; i++) {
        let time = times[i]
        let distance = distances[i]

        let wonCount = 0

        for (let holdFor = 1; holdFor < time; holdFor++) {
            if (distance < (time - holdFor) * holdFor) wonCount++
        }

        if (wonCount > 0) res *= wonCount
    }

    return res
}

const part2 = (rawInput) => {
    const input = parseInput(rawInput)

    let time = parseInt(
        input
            .split('\n')[0]
            .split(':')[1]
            .trim()
            .split(' ')
            .reduce((acc, curr) => (acc += curr), '')
    )

    let distance = parseInt(
        input
            .split('\n')[1]
            .split(':')[1]
            .trim()
            .split(' ')
            .reduce((acc, curr) => (acc += curr), '')
    )

    let wonFrom, wonTo

    for (let holdFor = 1; holdFor < time; holdFor++) {
        if (distance < (time - holdFor) * holdFor) {
            wonFrom = holdFor
            break
        }
    }

    for (let holdFor = time - 1; holdFor > 0; holdFor--) {
        if (distance < (time - holdFor) * holdFor) {
            wonTo = holdFor
            break
        }
    }

    return wonTo - wonFrom + 1
}

run({
    part1: {
        tests: [
            {
                input: `
            Time:      7  15   30
            Distance:  9  40  200
            `,
                expected: 288
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
                Time:      7  15   30
                Distance:  9  40  200`,
                expected: 71503
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
