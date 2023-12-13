import run from 'aocrunner'

const parseInput = (rawInput) => {
    return rawInput.split('\n').map((line) => {
        line = line.split(' ')
        return {
            str: line[0],
            numbers: line[1].split(',').map(Number)
        }
    })
}

const cache = new Map()

const countArrangements = (str, numbers) => {
    if (cache.has(`${str}_${numbers.join()}`))
        return cache.get(`${str}_${numbers.join()}`)

    // base case
    if (!str) return !numbers || numbers.length === 0
    if (str && (!numbers || numbers.length === 0)) return !str.includes('#')

    let count = 0

    // first way - act as '.'
    if (['.', '?'].includes(str[0]))
        count += countArrangements(str.substring(1), numbers)

    // second way - act as '#'
    if (
        ['#', '?'].includes(str[0]) &&
        str.length >= numbers[0] &&
        str.substring(0, numbers[0]).includes('.') === false &&
        (numbers[0] === str.length || ['.', '?'].includes(str[numbers[0]]))
    ) {
        count += countArrangements(
            str.substring(numbers[0] + 1),
            numbers.slice(1)
        )
    }

    cache.set(`${str}_${numbers.join()}`, count)

    return count
}

const part1 = (rawInput) =>
    parseInput(rawInput).reduce(
        (sum, { str, numbers }) => sum + countArrangements(str, numbers),
        0
    )

const part2 = (rawInput) =>
    parseInput(rawInput).reduce(
        (sum, { str, numbers }) =>
            sum +
            countArrangements(
                str + '?' + str + '?' + str + '?' + str + '?' + str,
                [...numbers, ...numbers, ...numbers, ...numbers, ...numbers]
            ),
        0
    )

run({
    part1: {
        tests: [
            {
                input: `
                ???.### 1,1,3
                .??..??...?##. 1,1,3
                ?#?#?#?#?#?#?#? 1,3,1,6
                ????.#...#... 4,1,1
                ????.######..#####. 1,6,5
                ?###???????? 3,2,1`,
                expected: 21
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
                ???.### 1,1,3
                .??..??...?##. 1,1,3
                ?#?#?#?#?#?#?#? 1,3,1,6
                ????.#...#... 4,1,1
                ????.######..#####. 1,6,5
                ?###???????? 3,2,1`,
                expected: 525152
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
