/**
 * Module containing the backend service
 * for fetching name info.
 */


export class BackendService {
    #url = 'http://localhost:3000/'

    async #fetch (url) {
        const res = await window.fetch(url)

        if (res.status >= 300) {
            throw new Error(res.status + ' Failed to fetch data')
        }

        return res.json()
    }

    async search(name) {
        const res = await this.#fetch(this.#url + name)
        return res.meaning
    }
}