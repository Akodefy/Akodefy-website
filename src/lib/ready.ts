// Lets intro animations wait until the loader has revealed the page.
let isReady = false
const waiting = new Set<() => void>()

export function markReady() {
  isReady = true
  waiting.forEach((fn) => fn())
  waiting.clear()
}

export function whenReady(): Promise<void> {
  if (isReady) return Promise.resolve()
  return new Promise((resolve) => waiting.add(resolve))
}
