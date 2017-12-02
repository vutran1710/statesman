export const _deepClone = jsobject => Object.keys(jsobject).reduce(
  (result, key) => Object.defineProperty(result, key, {
    value: jsobject[key],
    writable: true,
    enumerable: true
  }), {}
)

export const _pick = props => source => props.reduce(
  (result, key) => source.hasOwnProperty(key) ? Object.assign({ [key]: source[key] }, result) : result,
  {}
)
