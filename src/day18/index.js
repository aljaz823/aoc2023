import run from 'aocrunner'

const parseInput = (rawInput) =>
  rawInput.split('\n').map((line) => line.split(' '))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let terrain = Array(800)
      .fill('.')
      .map((_) => Array(800).fill('.')),
    pos = [400, 400],
    sum = 0

  for (let line of input) {
    let dir = line[0],
      distance = line[1]

    for (let i = 0; i < distance; i++) {
      let nextPos
      if (dir === 'R') nextPos = [pos[0], pos[1] + 1]
      if (dir === 'L') nextPos = [pos[0], pos[1] - 1]
      if (dir === 'U') nextPos = [pos[0] - 1, pos[1]]
      if (dir === 'D') nextPos = [pos[0] + 1, pos[1]]

      terrain[nextPos[0]][nextPos[1]] = '#'

      sum++
      pos = nextPos
    }
  }

  let stack = [[0, 0]]

  let i = 0
  while (stack.length !== 0) {
    let pos = stack.shift()

    if (terrain[pos[0]][pos[1]] !== '.') {
      continue
    }

    i++
    terrain[pos[0]][pos[1]] = '-'

    let moves = [
      [pos[0] - 1, pos[1]],
      [pos[0] + 1, pos[1]],
      [pos[0], pos[1] - 1],
      [pos[0], pos[1] + 1]
    ]

    for (let move of moves) {
      try {
        if (terrain[move[0]][move[1]] === '.') {
          stack.push(move)
        }
      } catch (e) {}
    }
  }

  return 800 * 800 - i
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
                R 6 (#70c710)
                D 5 (#0dc571)
                L 2 (#5713f0)
                D 2 (#d2c081)
                R 2 (#59c680)
                D 2 (#411b91)
                L 5 (#8ceee2)
                U 2 (#caa173)
                L 1 (#1b58a2)
                U 2 (#caa171)
                R 2 (#7807d2)
                U 3 (#a77fa3)
                L 2 (#015232)
                U 2 (#7a21e3)`,
        expected: 62
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
