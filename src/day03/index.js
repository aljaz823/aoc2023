import run from 'aocrunner'

const parseInput = (rawInput) => rawInput

const visit = (board, lineNum, x) => {
  board[`${lineNum}_${x}`] = true
}

const notVisited = (board, lineNum, x) => {
  return !visited(board, lineNum, x)
}

const visited = (board, lineNum, x) => {
  return `${lineNum}_${x}` in board
}

const isSymbol = (char) => {
  return !isNumber(char) && char !== '.'
}

const isNumber = (char) => {
  let res = char.charCodeAt(0) > 47 && char.charCodeAt(0) < 58
  return res
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split('\n')

  let sum = 0
  let visitedBoard = {}

  for (let lineNumber = 0; lineNumber < input.length; lineNumber++) {
    let line = input[lineNumber]

    for (let x = 0; x < line.length; x++) {
      let symbol
      if (isSymbol((symbol = line[x]))) {
        // check the surroundings of a symbol
        for (let visitingLineNumber of [
          Math.max(lineNumber - 1, 0),
          lineNumber,
          Math.min(lineNumber + 1, input.length - 1)
        ]) {
          for (let visitingX of [
            Math.max(x - 1, 0),
            x,
            Math.min(x + 1, line.length - 1)
          ]) {
            if (
              notVisited(visitedBoard, visitingLineNumber, visitingX) &&
              isNumber(input[visitingLineNumber][visitingX])
            ) {
              sum += getFullNumber(
                input,
                visitingLineNumber,
                visitingX,
                visitedBoard
              )
            }
          }
        }
      }
    }
  }

  return sum
}

const getFullNumber = (input, lineNumber, startIndex, board) => {
  let fullNumberString = ''

  // walk to the start
  let index = startIndex
  let reachedStartOfNumber = false

  while (index >= 0 && !reachedStartOfNumber) {
    let visitingNumber
    if (isNumber((visitingNumber = input[lineNumber][index]))) {
      visit(board, lineNumber, index)
      fullNumberString = visitingNumber + fullNumberString
    } else {
      reachedStartOfNumber = true
    }

    index--
  }

  // walk to the end
  index = startIndex + 1
  let reachedEndOfNumber = false

  while (index < input[lineNumber].length && !reachedEndOfNumber) {
    let visitingNumber
    if (isNumber((visitingNumber = input[lineNumber][index]))) {
      visit(board, lineNumber, index)
      fullNumberString = fullNumberString + visitingNumber
    } else {
      reachedEndOfNumber = true
    }

    index++
  }

  return parseInt(fullNumberString)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split('\n')

  let sum = 0
  let visitedBoard = {}

  for (let lineNumber = 0; lineNumber < input.length; lineNumber++) {
    let line = input[lineNumber]

    for (let x = 0; x < line.length; x++) {
      let symbol
      if (isSymbol((symbol = line[x]))) {
        // check the surroundings of a symbol
        let nums = []

        for (let visitingLineNumber of [
          Math.max(lineNumber - 1, 0),
          lineNumber,
          Math.min(lineNumber + 1, input.length - 1)
        ]) {
          for (let visitingX of [
            Math.max(x - 1, 0),
            x,
            Math.min(x + 1, line.length - 1)
          ]) {
            if (
              notVisited(visitedBoard, visitingLineNumber, visitingX) &&
              isNumber(input[visitingLineNumber][visitingX])
            ) {
              let fullNumber = getFullNumber(
                input,
                visitingLineNumber,
                visitingX,
                visitedBoard
              )

              nums.push(fullNumber)
            }
          }
        }

        if (nums.length === 2) {
          sum += nums[0] * nums[1]
        }
      }
    }
  }

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 4361
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..`,
        expected: 467835
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
