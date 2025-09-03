/**
 * The hello-box component module.
 *
 * @author Julia Lind <jl225vf@student.lnu.se>
 * @version 1.1.1
 */

import { randomFromArray } from './lib/functions.js'

const template = document.createElement('template')

template.innerHTML = `
    <style>
    :host,
        * {
            box-sizing: border-box;
        }

    :host {
        display: block;
    }

.card {
      background: var(--card-bg);
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: calc(var(--space) * 1.5);
      max-width: 480px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    header {
      display: flex;
      justify-content: flex-end;
    }

    #close-btn {
      appearance: none;
      border: 0;
      background: transparent;
      font-size: 1.2rem;
      line-height: 1;
      padding: .4rem .6rem;
      border-radius: .5rem;
      cursor: pointer;
      transition: background .15s ease, transform .05s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.96); }
      to   { opacity: 1; transform: scale(1); }
    }

    .greeting {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--primary-600);
      margin: 0.5rem 0 0;
      text-align: center;
    }
    .greeting p {
      margin: 0;
    }

    #info {
      margin: 0.5rem 0 0;
      font-size: 1rem;
      line-height: 1.6;
      color: var(--muted);
      text-align: left;
      width: 48rem;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
    </style>
    <div>
        <header>
            <button id="close-btn">✕</button>
        </header>
        <div>
            <p class="greeting"><span id="greeting">Hello</span>, <span id="name"></span>!</p>
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

    /**
     * Creates an instance of current class.
     */
    constructor () {
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
    connectedCallback () {
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
    disconnectedCallback () {
      this.#closeBtn.removeEventListener('click', this.#onClose)
    }

    /**
     * Attributes to monitor for changes.
     *
     * @returns {string[]} A string array of attributes to monitor.
     */
    static get observedAttributes () {
      return ['name']
    }

    /**
     * Displays the information about the name that has been received from backend.
     *
     * @param {string} newInfo - Information about the name that has been sent from the backend.
     */
    updateInfo (newInfo) {
      this.#info.textContent = newInfo || ''
    }

    /**
     * Called by the browser engine when an attribute changes.
     *
     * @param {string} name of the attribute.
     * @param {any} oldValue the old attribute value.
     * @param {any} newValue the new attribute value.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'name') {
        this.#name.textContent = newValue
        this.#greeting.textContent = randomFromArray(this.#greetingOptions)
      }
    }
  })
