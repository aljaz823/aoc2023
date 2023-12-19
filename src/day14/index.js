import run from 'aocrunner'

const parseInput = (rawInput) =>
    rawInput.split('\n').map((line) => line.split(''))

const part1 = (rawInput) => {
    let input = parseInput(rawInput)

    let sum = 0

    for (let i = 0; i < input[0].length; i++) {
        let currentStrength = input[0].length

        for (let j = 0; j < input.length; j++) {
            let currChar = input[j][i]
            if (currChar === '#') currentStrength = input.length - j - 1
            else if (currChar === 'O') {
                sum += currentStrength
                currentStrength--
            }
        }
    }

    return sum
}

const part2 = (rawInput) => {
    const input = parseInput(rawInput)

    return
}

run({
    part1: {
        tests: [
            {
                input: `
                O....#....
                O.OO#....#
                .....##...
                OO.#O....O
                .O.....O#.
                O.#..O.#.#
                ..O..#O..O
                .......O..
                #....###..
                #OO..#....`,
                expected: 136
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
