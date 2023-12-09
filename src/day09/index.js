import run from 'aocrunner'

const parseInput = (rawInput) =>
    rawInput.split('\n').map((line) => line.split(' ').map(Number))

const part1 = (rawInput) => {
    return parseInput(rawInput).reduce(
        (sum, line) => sum + extrapolate(buildArrays(line), 0),
        0
    )
}

const part2 = (rawInput) => {
    return parseInput(rawInput).reduce(
        (sum, line) => sum + extrapolate(buildArrays(line), 0, true),
        0
    )
}

const extrapolate = (arrays, index, part2 = false) => {
    return arrays[index].every((i) => i === 0)
        ? 0
        : part2
        ? arrays[index].at(0) - extrapolate(arrays, index + 1, part2)
        : extrapolate(arrays, index + 1) + arrays[index].at(-1)
}

const buildArrays = (line) => {
    let arrays = [line],
        currArr = line,
        newArr = []

    while (currArr.some((i) => i != 0)) {
        for (let i = 1; i < currArr.length; i++) {
            newArr.push(currArr[i] - currArr[i - 1])
        }

        arrays.push(newArr)
        currArr = newArr
        newArr = []
    }

    return arrays
}

run({
    part1: {
        tests: [
            {
                input: `
                0 3 6 9 12 15
                1 3 6 10 15 21
                10 13 16 21 30 45`,
                expected: 114
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
                0 3 6 9 12 15
                1 3 6 10 15 21
                10 13 16 21 30 45`,
                expected: 2
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
