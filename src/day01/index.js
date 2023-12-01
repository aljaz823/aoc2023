import run from 'aocrunner'

const parseInput = (rawInput) => rawInput

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let sum = 0

  for (let line of input.split('\n')) {
    let num = []

    for (let c of line) {
      if (nums.includes(c)) {
        num.push(c)
      }
    }

    sum += parseInt(num[0] + num[num.length - 1])
  }

  return sum.toString()
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let sum = 0

  for (let line of input.split('\n')) {
    let num = []

    for (let i = 0; i < line.length; i++) {
      if (line.startsWith('one', i)) {
        num.push('1')
      } else if (line.startsWith('two', i)) {
        num.push('2')
      } else if (line.startsWith('three', i)) {
        num.push('3')
      } else if (line.startsWith('four', i)) {
        num.push('4')
      } else if (line.startsWith('five', i)) {
        num.push('5')
      } else if (line.startsWith('six', i)) {
        num.push('6')
      } else if (line.startsWith('seven', i)) {
        num.push('7')
      } else if (line.startsWith('nine', i)) {
        num.push('9')
      } else if (line.startsWith('eight', i)) {
        num.push('8')
      }

      if (nums.includes(line.charAt(i))) {
        num.push(line.charAt(i))
      }
    }

    sum += parseInt(num[0] + num[num.length - 1])
  }

  return sum.toString()
}

run({
  part1: {
    tests: [
      {
        input: `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
        `,
        expected: '142'
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        `,
        expected: '281'
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
