import run from 'aocrunner'

const parseInput = (rawInput) => rawInput.split(',')

class Lens {
    constructor(label, focal) {
        this.label = label
        this.focal = focal
        this.hash = hash(label)
    }
}

const hash = (str) =>
    str.split('').reduce((hash, c) => ((hash + c.charCodeAt(0)) * 17) % 256, 0)

const part1 = (rawInput) =>
    parseInput(rawInput).reduce((sum, str) => sum + hash(str), 0)

const part2 = (rawInput) => {
    let boxes = {}
    let lenses = {}

    parseInput(rawInput).forEach((input) => {
        if (input.includes('=')) {
            let lens = new Lens(input.split('=')[0], input.split('=')[1])

            lenses[lens.label] = lens

            if (!boxes[lens.hash]) boxes[lens.hash] = []

            let targetBox = boxes[lens.hash]

            if (targetBox.includes(lens.label)) {
                targetBox[
                    targetBox.findIndex(
                        (targetLens) => targetLens === lens.label
                    )
                ] = lens.label
            } else {
                targetBox.push(lens.label)
            }
        } else {
            let lens = lenses[input.split('-')[0]]
            if (!lens) return

            let targetBox = boxes[lens.hash]

            if (targetBox?.includes(lens.label)) {
                targetBox.splice(
                    targetBox.findIndex(
                        (targetLens) => targetLens === lens.label
                    ),
                    1
                )
            }
        }
    })

    return Object.keys(boxes).reduce(
        (boxesPower, key) =>
            boxesPower +
            boxes[key].reduce(
                (boxPower, label, slotIndex) =>
                    boxPower +
                    (parseInt(key) + 1) * (slotIndex + 1) * lenses[label].focal,
                0
            ),
        0
    )
}

run({
    part1: {
        tests: [
            {
                input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
                expected: 1320
            }
        ],
        solution: part1
    },
    part2: {
        tests: [
            {
                input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
                expected: 145
            }
        ],
        solution: part2
    },
    trimTestInputs: true,
    onlyTests: false
})
