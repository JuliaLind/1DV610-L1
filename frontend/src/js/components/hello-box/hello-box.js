/**
 * The hello-box component module.
 *
 * @author Julia Lind <jl225vf@student.lnu.se>
 * @version 1.1.1
 */

import { randomFromArray } from "./lib/functions.js"
import { WebScraper } from "./lib/webscraper.js"

const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host,
        * {
        box-sizing: border-box;
        }
    </style>
    <div>
        <header>
            <button id="close-btn">✕</button>
        </header>
        <div>
            <p><span id="greeting">Hello</span>, <span id="name"></span>!</p>
        </div>
        <div>
            <p id="info"></p>
        </div>
    </div>
`

customElements.define('hello-box',
    /**
     * Represents a hello-box element.
     */
    class extends HTMLElement {
        #greetingOptions = ['Hello', 'Hi', 'Hey', 'Greetings', 'Hey there']
        #closeBtn
        #greeting
        #name
        #info
        #webScraper = new WebScraper()

        /**
         * Creates an instance of current class.
         */
        constructor() {
            super()

            this.attachShadow({ mode: 'open' })
                .append(template.content.cloneNode(true))
            this.#closeBtn = this.shadowRoot.querySelector('#close-btn')
            this.#greeting = this.shadowRoot.querySelector('#greeting')
            this.#name = this.shadowRoot.querySelector('#name')
            this.#info = this.shadowRoot.querySelector('#info')
        }

        /**
         * Called when the element is added to the document.
         */
        connectedCallback() {
            this.#closeBtn.addEventListener('click', this.#onClose)
        }

        /**
         * Handles the close button click.
         *
         * @param {MouseEvent} event - the click event fired when the close button is clicked.
         */
        #onClose = (event) => {
            this.#info.textContent = ''
            this.dispatchEvent(new CustomEvent('close', {
                bubbles: true
            }))
        }

        /**
         * Called when the element is removed from the document.
         */
        disconnectedCallback() {
            this.#closeBtn.removeEventListener('click', this.#onClose)
        }

        /**
         * Attributes to monitor for changes.
         *
         * @returns {string[]} A string array of attributes to monitor.
         */
        static get observedAttributes() {
            return ['name']
        }

        async #updateInfo(name) {
            const info = await this.#webScraper.search(name)
            this.#info.textContent = info || ''
        }

        /**
         * Called by the browser engine when an attribute changes.
         *
         * @param {string} name of the attribute.
         * @param {any} oldValue the old attribute value.
         * @param {any} newValue the new attribute value.
         */
        async attributeChangedCallback (name, oldValue, newValue) {
            if (name === 'name') {
                this.#name.textContent = newValue
                this.#greeting.textContent = randomFromArray(this.#greetingOptions)
                await this.#updateInfo(newValue)
            }
        }

    })
