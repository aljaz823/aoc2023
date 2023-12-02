import run from 'aocrunner'

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const red = 12,
    green = 13,
    blue = 14

  let gameSum = 0

  for (let game of input.split('\n')) {
    let goodGame = true
    let gameSp = game.split(':')
    let gameNum = parseInt(gameSp[0].substring(5))

    let draws = gameSp[1].trim().split(';')
    for (let draw of draws) {
      let good = true

      for (let card of draw.split(',')) {
        if (!good) break

        let cardSp = card.trim().split(' ')
        let cardNum = parseInt(cardSp[0])
        let cardCol = cardSp[1]

        if (
          (cardCol == 'red' && cardNum > red) ||
          (cardCol == 'green' && cardNum > green) ||
          (cardCol == 'blue' && cardNum > blue)
        ) {
          good = false
          break
        }
      }

      if (!good) {
        goodGame = false
        break
      }
    }

    if (goodGame) {
      gameSum += gameNum
    }
  }

  return gameSum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let gameSum = 0

  for (let game of input.split('\n')) {
    let gameSp = game.split(':')

    let maxRed = 0,
      maxGreen = 0,
      maxBlue = 0

    let draws = gameSp[1].trim().split(';')
    for (let draw of draws) {
      for (let card of draw.split(',')) {
        let cardSp = card.trim().split(' ')
        let cardNum = parseInt(cardSp[0])
        let cardCol = cardSp[1]

        if (cardCol == 'red' && cardNum > maxRed) {
          maxRed = cardNum
        } else if (cardCol == 'green' && cardNum > maxGreen) {
          maxGreen = cardNum
        } else if (cardCol == 'blue' && cardNum > maxBlue) {
          maxBlue = cardNum
        }
      }
    }

    let gamePow = maxRed * maxBlue * maxGreen
    gameSum += gamePow
  }

  return gameSum
}

run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `,
        expected: 8
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
