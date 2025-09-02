/**
 * The name-form component module.
 *
 * @author Julia Lind <jl225vf@student.lnu.se>
 * @version 1.1.1
 */

const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host,
    * {
      box-sizing: border-box;
    }

    .hidden {
      display: none;
    }
  </style>
  <form>
    <label for="name">What is your name?</label>
    <input type="text" id="name" name="name" required />
    <button type="submit">Submit</button>
  </form>
  <hello-box class="hidden"></hello-box>
`

customElements.define('name-form',
    /**
     * Represents a name-form element.
     */
    class extends HTMLElement {
        #form
        #helloBox
        #name
        #abortController = new AbortController()

        /**
         * Creates an instance of current class.
         */
        constructor() {
            super()

            this.attachShadow({ mode: 'open' })
                .append(template.content.cloneNode(true))
            this.#form = this.shadowRoot.querySelector('form')
            this.#helloBox = this.shadowRoot.querySelector('hello-box')
            this.#name = this.shadowRoot.querySelector('#name')
        }

        /**
         * Called when the element is added to the document.
         */
        connectedCallback() {
            this.#form.addEventListener('submit', this.#onSubmit,
                {
                    signal: this.#abortController.signal
                })
            this.#helloBox.addEventListener('close', this.#onClose,
                {
                    signal: this.#abortController.signal
                })
        }

        /**
         * Handles the form submission.
         *
         * @param {SubmitEvent} event - the submit event fired when the form is submitted.
         */
        #onSubmit = (event) => {
            event.preventDefault()

            this.#helloBox.setAttribute('name', this.#name.value)
            this.#helloBox.classList.remove('hidden')
        }

        /**
         * Called when the hello-box is closed.
         *
         * @param {CustomEvent} event - close event
         */
        #onClose = (event) => {
            this.#helloBox.classList.add('hidden')
            this.#form.reset()
        }

        /**
         * Called when the element is removed from the document.
         */
        disconnectedCallback() {
            this.#abortController.abort()
        }
    })

