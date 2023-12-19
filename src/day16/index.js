import run from 'aocrunner'

const parseInput = (rawInput) =>
    rawInput.split('\n').map((line) => line.split(''))

const UP = 'up'
const DOWN = 'down'
const LEFT = 'left'
const RIGHT = 'right'

const pathKey = (i, j, dir) => `${i}_${j}_${dir}`

const move = (input, paths, visited, moves) => {
    let move = moves.shift(),
        i = move[0],
        j = move[1],
        dir = move[2]

    if (
        paths.has(pathKey(i, j, dir)) ||
        i >= input.length ||
        j >= input[0].length ||
        i < 0 ||
        j < 0
    )
        return 0

    let energized = !visited.has(`${i}_${j}`)

    paths.add(pathKey(i, j, dir))
    visited.add(`${i}_${j}`)

    let pos = input[i][j]

    if (dir === RIGHT) {
        if (pos === '.' || pos === '-') moves.push([i, j + 1, RIGHT])
        else if (pos === '\\') moves.push([i + 1, j, DOWN])
        else if (pos === '/') moves.push([i - 1, j, UP])
        else moves.push([i + 1, j, DOWN], [i - 1, j, UP])
    } else if (dir === LEFT) {
        if (pos === '.' || pos === '-') moves.push([i, j - 1, LEFT])
        else if (pos === '\\') moves.push([i - 1, j, UP])
        else if (pos === '/') moves.push([i + 1, j, DOWN])
        else moves.push([i + 1, j, DOWN], [i - 1, j, UP])
    } else if (dir === UP) {
        if (pos === '.' || pos === '|') moves.push([i - 1, j, UP])
        else if (pos === '\\') moves.push([i, j - 1, LEFT])
        else if (pos === '/') moves.push([i, j + 1, RIGHT])
        else moves.push([i, j + 1, RIGHT], [i, j - 1, LEFT])
    } else if (dir === DOWN) {
        if (pos === '.' || pos === '|') moves.push([i + 1, j, DOWN])
        else if (pos === '\\') moves.push([i, j + 1, RIGHT])
        else if (pos === '/') moves.push([i, j - 1, LEFT])
        else moves.push([i, j + 1, RIGHT], [i, j - 1, LEFT])
    }

    return energized
}

const part1 = (rawInput) => startMoving(parseInput(rawInput), [[0, 0, RIGHT]])

const startMoving = (input, moves) => {
    const paths = new Set(),
        visited = new Set()

    let sum = 0

    while (moves.length !== 0) {
        sum += move(input, paths, visited, moves)
    }

    return sum
}

const part2 = (rawInput) => {
    const input = parseInput(rawInput)

    let max = 0

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (
                i === 0 ||
                j === 0 ||
                i === input.length - 1 ||
                j === input[0].length - 1
            ) {
                let moves = []
                if (i === 0) moves.push([i, j, DOWN])
                if (j === 0) moves.push([i, j, RIGHT])
                if (i === input.length - 1) moves.push([i, j, UP])
                if (j === input[0].length - 1) moves.push([i, j, LEFT])

                if (moves.length !== 0) {
                    let res = startMoving(input, moves)
                    if (res > max) max = res
                }
            }
        }
    }

    return max
}

run({
    part1: {
        tests: [
            {
                input: `
                .|...\\....
                |.-.\\.....
                .....|-...
                ........|.
                ..........
                .........\\
                ..../.\\\\..
                .-.-/..|..
                .|....-|.\\
                ..//.|....`,
                expected: 46
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            // {
            //     input: `
            //     .|...\\....
            //     |.-.\\.....
            //     .....|-...
            //     ........|.
            //     ..........
            //     .........\\
            //     ..../.\\\\..
            //     .-.-/..|..
            //     .|....-|.\\
            //     ..//.|....`,
            //     expected: 51
            // }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
