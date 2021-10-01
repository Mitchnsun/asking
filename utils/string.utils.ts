export const normalize = (str = ''): string => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const editDistance = (string1: string, string2: string): number => {
  const s1 = string1.toLowerCase()
  const s2 = string2.toLowerCase()

  const costs = []
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j
      else {
        if (j > 0) {
          let newValue = costs[j - 1]
          if (s1.charAt(i - 1) != s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
          }
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
    }

    if (i > 0) costs[s2.length] = lastValue
  }

  return costs[s2.length]
}

export const similarity = (s1: string, s2: string): number => {
  const longer = s1.length < s2.length ? s2 : s1
  const shorter = s1.length < s2.length ? s1 : s2

  const longerLength = longer.length

  if (longerLength == 0) {
    return 1.0
  }

  return (longerLength - editDistance(longer, shorter)) / longerLength
}
