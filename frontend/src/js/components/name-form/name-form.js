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

    :host {
      display: block;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      padding: calc(var(--space) * 1.5);
      transition: box-shadow .2s ease, transform .2s ease, border-color .2s ease;
    }

    :host(:focus-within) {
      box-shadow: var(--shadow), 0 0 0 4px rgba(59,130,246,0.08);
      transform: translateY(-1px);
      border-color: rgba(59,130,246,0.35);
    }

    form {
      display: grid;
      gap: .75rem;
    }

    label {
      font-weight: 600;
      font-size: .95rem;
    }

    input[type="text"] {
      width: 100%;
      padding: .7rem .85rem;
      font-size: 1rem;
      border: 1px solid var(--border);
      border-radius: .75rem;
      background: #fff;
      color: var(--text);
      outline: none;
      transition: border-color .15s ease, box-shadow .15s ease;
    }

    input[type="text"]:focus {
      border-color: var(--primary);
      box-shadow: var(--focus-ring);
    }

    button[type="submit"] {
      padding: .75rem 1rem;
      font-weight: 600;
      border: 0;
      border-radius: .75rem;
      background: var(--primary);
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
      transition: transform .05s ease, background .15s ease, opacity .15s ease;
    }

    button[type="submit"]:hover { background: var(--primary-600); }
    button[type="submit"]:active { transform: translateY(1px); }

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
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .append(template.content.cloneNode(true))
      this.#form = this.shadowRoot.querySelector('form')
      this.#name = this.shadowRoot.querySelector('#name')
    }

    /**
     * Called when the element is added to the document.
     */
    connectedCallback () {
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

    /**
     * Empties the name-field.
     */
    reset () {
      this.#form.reset()
    }

    /**
     * Called when the element is removed from the document.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }
  })
