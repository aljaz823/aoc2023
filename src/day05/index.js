import run from 'aocrunner'

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
    const input = parseInput(rawInput)

    let seeds = []
    let maps = {}

    let source, dest
    for (const line of input.split('\n')) {
        if (!line) continue
        if (line.startsWith('seeds: ')) {
            seeds = line
                .split('seeds: ')[1]
                .split(' ')
                .map((seed) => parseInt(seed))
            continue
        }

        if (line.endsWith('map:')) {
            let lineSp = line.split(' map:')[0].split('-to-')
            source = lineSp[0]
            dest = lineSp[1]
            maps[getKey(source, dest)] = []
        } else {
            maps[getKey(source, dest)].push(
                line.split(' ').map((el) => parseInt(el))
            )
        }
    }

    let minDestination = Number.MAX_SAFE_INTEGER

    for (const seed of seeds) {
        let source = seed
        let destination

        for (const map in maps) {
            destination = getDestination(source, maps[map])
            source = destination
        }

        if (destination < minDestination) {
            minDestination = destination
        }
    }

    return minDestination
}

const getDestination = (source, map) => {
    for (const mapping of map) {
        let s = mapping[1],
            d = mapping[0],
            r = mapping[2]

        if (source >= s && source <= s + r) {
            return d + (source - s)
        }
    }

    return source
}

const getSource = (destination, map) => {
    for (const mapping of map) {
        let s = mapping[1],
            d = mapping[0],
            r = mapping[2]

        if (destination >= d && destination <= d + r) {
            return s + (destination - d)
        }
    }

    return destination
}

const getKey = (s, d) => {
    return s + '-' + d
}

const part2 = (rawInput) => {
    const input = parseInput(rawInput)

    let ranges = []
    let maps = {}

    let currMap
    for (const line of input.split('\n')) {
        if (!line) continue

        if (line.startsWith('seeds: ')) {
            let seedRange = line
                .split('seeds: ')[1]
                .split(' ')
                .map((seed) => parseInt(seed))

            for (let i = 0; i < seedRange.length - 1; i += 2) {
                ranges.push([seedRange[i], seedRange[i] + seedRange[i + 1]])
            }
        } else {
            if (line.endsWith('map:')) {
                currMap = line.split(' map:')[0]
                maps[currMap] = []
            } else {
                maps[currMap].push(line.split(' ').map((el) => parseInt(el)))
            }
        }
    }

    for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
        let seed = getSource(
            getSource(
                getSource(
                    getSource(
                        getSource(
                            getSource(
                                getSource(i, maps['humidity-to-location']),
                                maps['temperature-to-humidity']
                            ),
                            maps['light-to-temperature']
                        ),
                        maps['water-to-light']
                    ),
                    maps['fertilizer-to-water']
                ),
                maps['soil-to-fertilizer']
            ),
            maps['seed-to-soil']
        )

        for (const range of ranges) {
            if (seed >= range[0] && seed <= range[1]) return i
        }
    }
}

run({
    part1: {
        tests: [
            {
                input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4
        `,
                expected: 35
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `
                seeds: 79 14 55 13

                seed-to-soil map:
                50 98 2
                52 50 48
                
                soil-to-fertilizer map:
                0 15 37
                37 52 2
                39 0 15
                
                fertilizer-to-water map:
                49 53 8
                0 11 42
                42 0 7
                57 7 4
                
                water-to-light map:
                88 18 7
                18 25 70
                
                light-to-temperature map:
                45 77 23
                81 45 19
                68 64 13
                
                temperature-to-humidity map:
                0 69 1
                1 0 69
                
                humidity-to-location map:
                60 56 37
                56 93 4`,
                expected: 46
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
