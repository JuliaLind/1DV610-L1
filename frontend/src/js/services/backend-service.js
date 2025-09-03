/**
 * Module containing the backend service
 * for fetching name info.
 */

/**
 * The backend service for fetching name info.
 */
export class BackendService {
  #url = 'http://localhost:3000/'

  /**
   * Fetches the data from the provided url.
   *
   * @param {string} url - url address to backend.
   * @returns {Promise<any>} - the fetched data.
   */
  async #fetch (url) {
    const res = await window.fetch(url)

    if (res.status >= 300) {
      throw new Error(res.status + ' Failed to fetch data')
    }

    return res.json()
  }

  /**
   * Searches for the meaning of a name.
   *
   * @param {string} name - The name to search for.
   * @returns {Promise<string>} - The meaning of the name.
   */
  async search (name) {
    const res = await this.#fetch(this.#url + name)
    return res.meaning
  }
}
