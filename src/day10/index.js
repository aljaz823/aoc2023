import run from 'aocrunner'

const parseInput = (rawInput) => {
  let map = JSON.parse(
    JSON.stringify(rawInput.split('\n').map((line) => line.split('')))
  )

  let currentPosition

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'S') currentPosition = [y, x]
    }
  }

  return { map, currentPosition }
}

let movesTo = {
  up: ['|', 'F', '7', 'S'],
  down: ['|', 'L', 'J', 'S'],
  left: ['-', 'L', 'F', 'S'],
  right: ['-', 'J', '7', 'S']
}

let movesFrom = {
  down: ['|', 'F', '7', 'S'],
  up: ['|', 'L', 'J', 'S'],
  right: ['-', 'L', 'F', 'S'],
  left: ['-', 'J', '7', 'S']
}

const getNextPosition = (
  map,
  position,
  previousPosition,
  windingNumbers,
  previousMove
) => {
  for (const move of Object.keys(movesTo)) {
    try {
      let y = position[0],
        x = position[1],
        windingNumber = 0

      if (move === 'up') {
        y--
        windingNumber = 1
      } else if (move === 'down') {
        y++
        windingNumber = -1
      } else if (move === 'left') {
        x--
        if (previousMove === 'down') windingNumber = -1
        else if (previousMove === 'up') windingNumber = 1
      } else if (move === 'right') {
        x++
        if (previousMove === 'down') windingNumber = -1
        else if (previousMove === 'up') windingNumber = 1
      }

      if (
        movesTo[move].includes(map[y][x]) &&
        movesFrom[move].includes(map[position[0]][position[1]]) &&
        (!previousPosition ||
          y !== previousPosition[0] ||
          x !== previousPosition[1])
      ) {
        !!windingNumbers &&
          (windingNumbers[position[0]][position[1]] = windingNumber)

        return { nextPosition: [y, x], nextMove: move }
      }
    } catch (error) {}
  }
}

const calculatePipeline = (map, currentPosition) => {
  let previousPosition,
    previousMove,
    windingNumbers = JSON.parse(JSON.stringify(map)).map((line) =>
      line.fill('')
    ),
    length = 0

  do {
    let { nextPosition, nextMove } = getNextPosition(
      map,
      currentPosition,
      previousPosition,
      windingNumbers,
      previousMove
    )
    previousPosition = currentPosition
    previousMove = nextMove
    currentPosition = nextPosition
    length++
  } while (map[currentPosition[0]][currentPosition[1]] !== 'S')

  return { length, windingNumbers }
}

// simply count the length of the pipeline and halve it
const part1 = (rawInput) => {
  let { map, currentPosition } = parseInput(rawInput)

  let previousPosition,
    i = 0

  do {
    let { nextPosition } = getNextPosition(
      map,
      currentPosition,
      previousPosition
    )
    previousPosition = currentPosition
    currentPosition = nextPosition
    i++
  } while (map[currentPosition[0]][currentPosition[1]] !== 'S')

  return Math.ceil(i / 2)
}

// use the even-odd raycasting rule (https://en.wikipedia.org/wiki/Even%E2%80%93odd_rule)
const part2 = (rawInput) => {
  let { map, currentPosition } = parseInput(rawInput)

  let { windingNumbers } = calculatePipeline(map, currentPosition)

  let raycasting = JSON.parse(JSON.stringify(map)).map((line) => line.fill(''))

  for (let y = 0; y < windingNumbers.length; y++) {
    let ray = 0,
      previousWn

    for (let x = windingNumbers[y].length - 1; x >= 0; x--) {
      let wn = windingNumbers[y][x]

      if ((wn === 1 && previousWn !== 1) || (wn === -1 && previousWn !== -1)) {
        ray += wn
      } else if (wn === '') {
        raycasting[y][x] = ray
      }

      if (wn !== 0) previousWn = wn
    }
  }

  return raycasting.reduce(
    (sum, rays) =>
      sum + rays.reduce((sum2, ray) => sum2 + [1, -1].includes(ray), 0),
    0
  )
}

run({
  part1: {
    tests: [
      {
        input: `
                .....
                .S-7.
                .|.|.
                .L-J.
                .....`,
        expected: 4
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `
                .....
                .S-7.
                .|.|.
                .L-J.
                .....`,
        expected: 1
      },
      {
        input: `
                ...........
                .S-------7.
                .|F-----7|.
                .||.....||.
                .||.....||.
                .|L-7.F-J|.
                .|..|.|..|.
                .L--J.L--J.
                ...........`,
        expected: 4
      },
      {
        input: `
                ..........
                .S------7.
                .|F----7|.
                .||....||.
                .||....||.
                .|L-7F-J|.
                .|..||..|.
                .L--JL--J.
                ..........`,
        expected: 4
      },
      {
        input: `
                .F----7F7F7F7F-7....
                .|F--7||||||||FJ....
                .||.FJ||||||||L7....
                FJL7L7LJLJ||LJ.L-7..
                L--J.L7...LJS7F-7L7.
                ....F-J..F7FJ|L7L7L7
                ....L7.F7||L7|.L7L7|
                .....|FJLJ|FJ|F7|.LJ
                ....FJL-7.||.||||...
                ....L---J.LJ.LJLJ...`,
        expected: 8
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
