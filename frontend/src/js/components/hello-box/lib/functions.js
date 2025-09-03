/**
 * Returns a random element from the given array.
 *
 * @param {Array} arr - The array to select a random element from.
 * @returns {*} A random element from the array.
 */
export function randomFromArray (arr) {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}
