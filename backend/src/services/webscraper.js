/**
 * Module containing the webscraper
 * for fetching name info.
 */

import { JSDOM } from 'jsdom'

/**
 * The webscraper service.
 */
export class WebScraper {
  #url = 'https://www.meaningofthename.com/'

  /**
   * Fetches an html page from the given url and returns it as text.
   *
   * @param {string} url - the url address to fetch the page from.
   * @returns {Promise<string>} - the fetched html content.
   */
  async #fetch (url) {
    const res = await fetch(url)

    if (res.status >= 300) {
      throw new Error(res.status + ' Failed to fetch data')
    }

    return res.text()
  }

  /**
   * Parses the given html content and extracts the name meaning.
   *
   * @param {string} html - the html content to parse.
   * @returns {string} - The meaning of the name.
   */
  #parse (html) {
    const doc = (new JSDOM(html)).window.document
    const titles = doc.querySelectorAll('h3')
    let meaning = ''

    for (const title of titles) {
      if (title.textContent.trim() === 'More info') {
        meaning = title.nextElementSibling.textContent.trim()
        break
      }
    }
    return meaning
  }

  /**
   * Searches for the meaning of a name.
   *
   * @param {string} name - The name to search for.
   * @returns {Promise<string>} - The meaning of the name.
   */
  async search (name) {
    const html = await this.#fetch(this.#url + name)
    return this.#parse(html)
  }
}
