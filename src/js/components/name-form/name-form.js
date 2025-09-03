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
  </style>
  <form>
    <label for="name">What is your name?</label>
    <input type="text" id="name" name="name" required />
    <button type="submit">Submit</button>
  </form>

`

customElements.define('name-form',
    /**
     * Represents a name-form element.
     */
    class extends HTMLElement {
        #form
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
        }

        /**
         * Handles the form submission.
         *
         * @param {SubmitEvent} event - the submit event fired when the form is submitted.
         */
        #onSubmit = (event) => {
            event.preventDefault()

            this.dispatchEvent(new CustomEvent('submit', {
                detail: {
                    name: this.#name.value
                },
                bubbles: true
            }))
        }


        reset () {
            this.#form.reset()
        }

        /**
         * Called when the element is removed from the document.
         */
        disconnectedCallback() {
            this.#abortController.abort()
        }
    })

