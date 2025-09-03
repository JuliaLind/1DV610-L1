/**
 * Module containing the webscraper
 * for fetching name info.
 */

import { JSDOM } from 'jsdom'

export class WebScraper {
    #url = 'https://www.meaningofthename.com/'

    async #fetch (url) {
        const res = await fetch(url)

        if (res.status >= 300) {
            throw new Error(res.status + ' Failed to fetch data')
        }

        return res.text()
    }

    #parse(html) {
        const doc = (new JSDOM(html)).window.document
        const titles = doc.querySelectorAll('h3')

        for (const title of titles) {
            if (title.textContent.trim() === 'More info') {
                return title.nextElementSibling.textContent.trim()
            }
        }
    }

    async search(name) {
        const html = await this.#fetch(this.#url + name)
        return this.#parse(html)
    }
}