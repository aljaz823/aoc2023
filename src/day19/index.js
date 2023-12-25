import run from 'aocrunner'

class Workflow {
  constructor(rulesString) {
    this.rules = []
    for (let rule of rulesString.split(',')) {
      if (rule.includes(':')) {
        this.rules.push(
          new Rule(
            rule[0],
            rule[1],
            parseInt(rule.split(':')[0].substring(2)),
            rule.split(':')[1]
          )
        )
      } else {
        this.rules.push(new Rule(undefined, undefined, undefined, rule))
      }
    }
  }

  getDestination = (part) => {
    for (let rule of this.rules) {
      if (rule.category) {
        if (
          (rule.operator === '>' && part[rule.category] > rule.value) ||
          (rule.operator === '<' && part[rule.category] < rule.value)
        )
          return rule.destination
      } else {
        return rule.destination
      }
    }
  }
}

class Rule {
  constructor(category, operator, value, destination) {
    this.category = category
    this.operator = operator
    this.value = value
    this.destination = destination
  }
}

class Part {
  constructor(x, m, a, s) {
    this.x = x
    this.m = m
    this.a = a
    this.s = s
  }
}

const parseInput = (rawInput) => {
  let workflows = {},
    parts = []

  for (let line of rawInput.split('\n')) {
    if (!line) continue

    if (line[0] !== '{') {
      let wf = line.split('{')
      workflows[wf[0]] = new Workflow(wf[1].substring(0, wf[1].length - 1))
    } else {
      let p = line.replaceAll('{', '').replaceAll('}', '').split(',')
      parts.push(
        new Part(
          parseInt(p[0].substring(2)),
          parseInt(p[1].substring(2)),
          parseInt(p[2].substring(2)),
          parseInt(p[3].substring(2))
        )
      )
    }
  }

  return { workflows, parts }
}

const part1 = (rawInput) => {
  const { workflows, parts } = parseInput(rawInput)

  let sum = 0

  for (let part of parts) {
    let destination = 'in'
    while (destination !== 'R' && destination !== 'A') {
      destination = workflows[destination].getDestination(part)
    }

    if (destination === 'A') {
      sum += part.x + part.m + part.a + part.s
    }
  }

  return sum
}

const getCombinationsCount = (workflowName, ranges, workflows) => {
  let workflow = workflows[workflowName]

  let sum = 0

  let differenceRuleRanges = {
    x: new Set([...ranges.x]),
    m: new Set([...ranges.m]),
    a: new Set([...ranges.a]),
    s: new Set([...ranges.s])
  }

  for (let rule of workflow.rules) {
    let currentRuleRanges = {
      x: new Set([...differenceRuleRanges.x]),
      m: new Set([...differenceRuleRanges.m]),
      a: new Set([...differenceRuleRanges.a]),
      s: new Set([...differenceRuleRanges.s])
    }

    if (rule.category) {
      let ruleSet = new Set(),
        i = 1 + (rule.operator === '<' ? 0 : rule.value),
        conditionValue = rule.operator === '<' ? rule.value : 4001

      for (i; i < conditionValue; i++) ruleSet.add(i)

      // intersection
      let intersection = new Set(
        [...currentRuleRanges[rule.category]].filter((x) => ruleSet.has(x))
      )

      // difference
      let difference = new Set(
        [...currentRuleRanges[rule.category]].filter((x) => !ruleSet.has(x))
      )

      currentRuleRanges[rule.category] = intersection
      differenceRuleRanges[rule.category] = difference
    }

    sum +=
      rule.destination === 'A'
        ? currentRuleRanges.x.size *
          currentRuleRanges.m.size *
          currentRuleRanges.a.size *
          currentRuleRanges.s.size
        : rule.destination in workflows
        ? getCombinationsCount(rule.destination, currentRuleRanges, workflows)
        : 0
  }

  return sum
}

const part2 = (rawInput) => {
  const { workflows } = parseInput(rawInput)

  let ranges = {
    x: new Set(),
    m: new Set(),
    a: new Set(),
    s: new Set()
  }

  for (let i = 1; i < 4001; i++) {
    ranges.x.add(i)
    ranges.m.add(i)
    ranges.a.add(i)
    ranges.s.add(i)
  }

  return getCombinationsCount('in', ranges, workflows)
}

run({
  part1: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}

        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}`,
        expected: 19114
      }
    ],
    solution: part1
  },
  part2: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}
        
        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}`,
        expected: 167409079868000
      }
    ],
    solution: part2
  },
  trimTestInputs: true,
  onlyTests: false
})
