import run from 'aocrunner'

const parseInput = (rawInput, part2 = false) => {
    rawInput = rawInput.split('\n')

    let instructions = rawInput.shift()
    let currentPositions = []
    let destinations = {}

    for (let line of rawInput) {
        if (!line) continue

        line = line
            .replace('(', '')
            .replace(')', '')
            .replaceAll(' ', '')
            .split('=')

        let pos = line[0]
        destinations[pos] = line[1].split(',')

        if (pos === 'AAA' || (part2 && pos.endsWith('A')))
            currentPositions.push(pos)
    }

    return { instructions, destinations, currentPositions }
}

const part1 = (rawInput) => getSteps(...Object.values(parseInput(rawInput)))[0]

const part2 = (rawInput) =>
    getSteps(...Object.values(parseInput(rawInput, true)), true).reduce(lcm)

const getSteps = (instructions, destinations, currentPositions, part2) => {
    let steps = []

    for (let i = 0; i < currentPositions.length; i++) {
        let currPos = currentPositions[i],
            numOfSteps = 0

        while (true) {
            let intermediateStep =
                destinations[currPos][
                    instructions[numOfSteps % instructions.length] === 'L'
                        ? 0
                        : 1
                ]

            numOfSteps++

            if (
                intermediateStep === 'ZZZ' ||
                (part2 && intermediateStep.endsWith('Z'))
            ) {
                break
            }

            currPos = intermediateStep
        }

        steps.push(numOfSteps)
    }

    return steps
}

const gcd = (a, b) => (a ? gcd(b % a, a) : b)

const lcm = (a, b) => (a * b) / gcd(a, b)

run({
    part1: {
        tests: [
            {
                input: `
                LLR

                AAA = (BBB, BBB)
                BBB = (AAA, ZZZ)
                ZZZ = (ZZZ, ZZZ)`,
                expected: 6
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
                LR

                11A = (11B, XXX)
                11B = (XXX, 11Z)
                11Z = (11B, XXX)
                22A = (22B, XXX)
                22B = (22C, 22C)
                22C = (22Z, 22Z)
                22Z = (22B, 22B)
                XXX = (XXX, XXX)`,
                expected: 6
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
