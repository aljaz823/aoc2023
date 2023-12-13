import run from 'aocrunner'

const parseInput = (rawInput) => {
    let input = rawInput.split('\n')

    let patterns = []
    let pattern = []
    for (let line of input) {
        if (line == '') {
            patterns.push(pattern)
            pattern = []
        } else {
            pattern.push(line)
        }
    }
    patterns.push(pattern)

    return patterns
}

const reversePattern = (pattern) => {
    let patternReversed = []

    for (let j = 0; j < pattern[0].length; j++) {
        let line = ''
        for (let i = 0; i < pattern.length; i++) {
            line += pattern[i][j]
        }
        patternReversed.push(line)
    }

    return patternReversed
}

const findReflection = (pattern, notPossibleReflection) => {
    for (let reflection = 1; reflection < pattern[0].length; reflection++) {
        let goodReflection = true
        for (let y = 0; y < pattern.length; y++) {
            let line = pattern[y]

            let left = line
                .substring(0, reflection)
                .split('')
                .reverse()
                .join('')
            let right = line.substring(reflection)

            if (
                (left.length < right.length && !right.startsWith(left)) ||
                (left.length === right.length && left !== right) ||
                (left.length > right.length && !left.startsWith(right)) ||
                (notPossibleReflection && reflection === notPossibleReflection)
            ) {
                goodReflection = false
                break
            }
        }

        if (goodReflection) return reflection
    }

    return 0
}

const findReflections = (pattern, notPossibleReflection = 0) => {
    let reflection1 = findReflection(pattern, notPossibleReflection)
    let reflection2 =
        100 *
        findReflection(reversePattern(pattern), notPossibleReflection / 100)

    return reflection1 !== 0 ? reflection1 : reflection2
}

const part1 = (rawInput) => {
    let patterns = parseInput(rawInput)

    let sum = 0

    for (let i = 0; i < patterns.length; i++) {
        let reflection = findReflection(patterns[i])

        if (reflection === 0) {
            reflection = 100 * findReflection(reversePattern(patterns[i]))
        }

        sum += reflection
    }

    return sum
}

const part2 = (rawInput) => {
    let patterns = parseInput(rawInput)

    let sum = 0

    for (let i = 0; i < patterns.length; i++) {
        let pattern = patterns[i]

        let reflection = findReflections(pattern)

        let repaired = false

        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {
                let newPattern = [...pattern]

                newPattern[y] =
                    newPattern[y].substring(0, x) +
                    (pattern[y].charAt(x) === '#' ? '.' : '#') +
                    newPattern[y].substring(x + 1)

                let newReflection = findReflections(newPattern, reflection)

                if (newReflection !== 0) {
                    sum += newReflection
                    repaired = true
                    break
                }
            }

            if (repaired) break
        }
    }

    return sum
}

run({
    part1: {
        tests: [
            {
                input: `
                #.##..##.
                ..#.##.#.
                ##......#
                ##......#
                ..#.##.#.
                ..##..##.
                #.#.##.#.
                
                #...##..#
                #....#..#
                ..##..###
                #####.##.
                #####.##.
                ..##..###
                #....#..#`,
                expected: 405
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
                #.##..##.
                ..#.##.#.
                ##......#
                ##......#
                ..#.##.#.
                ..##..##.
                #.#.##.#.

                #...##..#
                #....#..#
                ..##..###
                #####.##.
                #####.##.
                ..##..###
                #....#..#`,
                expected: 400
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
