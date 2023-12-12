import run from 'aocrunner'

const parseInput = (rawInput, expansion) => {
    let space = [],
        lines = rawInput.split('\n'),
        stepsVertical = [],
        stepsHorizontal = []

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].split(''),
            hasGalaxies = true

        if (!line.includes('#')) hasGalaxies = false

        space.push(line)

        stepsVertical.push(hasGalaxies ? 1 : expansion)
    }

    for (let i = 0; i < space[0].length; i++) {
        let hasGalaxies = false

        for (let j = 0; j < space.length; j++) {
            if (space[j][i] === '#') hasGalaxies = true
        }

        stepsHorizontal.push(hasGalaxies ? 1 : expansion)
    }

    let galaxies = []
    for (let i = 0; i < space.length; i++) {
        for (let j = 0; j < space[i].length; j++) {
            if (space[i][j] === '#') galaxies.push([i, j])
        }
    }

    return { galaxies, stepsVertical, stepsHorizontal }
}

const calculateDistances = (galaxies, stepsVertical, stepsHorizontal) => {
    let sum = 0

    for (let i = 0; i < galaxies.length - 1; i++) {
        let galaxy = galaxies[i]
        for (let j = i + 1; j < galaxies.length; j++) {
            let otherGalaxy = galaxies[j],
                distance = 0

            for (
                let y = Math.min(galaxy[0], otherGalaxy[0]);
                y < Math.max(galaxy[0], otherGalaxy[0]);
                y++
            ) {
                distance += stepsVertical[y]
            }

            for (
                let x = Math.min(galaxy[1], otherGalaxy[1]);
                x < Math.max(galaxy[1], otherGalaxy[1]);
                x++
            ) {
                distance += stepsHorizontal[x]
            }

            sum += distance
        }
    }

    return sum
}

const part1 = (rawInput) =>
    calculateDistances(...Object.values(parseInput(rawInput, 2)))

const part2 = (rawInput) =>
    calculateDistances(...Object.values(parseInput(rawInput, 10)))

run({
    part1: {
        tests: [
            {
                input: `
                ...#......
                .......#..
                #.........
                ..........
                ......#...
                .#........
                .........#
                ..........
                .......#..
                #...#.....`,
                expected: 374
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
                ...#......
                .......#..
                #.........
                ..........
                ......#...
                .#........
                .........#
                ..........
                .......#..
                #...#.....`,
                expected: 1030
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
