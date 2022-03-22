export function replaceState(oldState: Dictionary, newState: Dictionary) {
  const result = Object.assign({}, oldState, newState)
  return result
}

export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}
