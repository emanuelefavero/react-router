/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} description
 * @property {string} category
 * @property {string} image
 * @property {Object} rating
 * @property {number} rating.rate
 * @property {number} rating.count
 */

/**
 * @typedef {
 *   | { step: 'idle' }
 *   | { step: 'loading' }
 *   | { step: 'success', data: Product[] }
 *   | { step: 'error', error: Error }
 * } ProductsState
 */

/**
 * @typedef {
 *   | { step: 'idle' }
 *   | { step: 'loading' }
 *   | { step: 'success', data: Product }
 *   | { step: 'error', error: Error }
 * } ProductState
 */
