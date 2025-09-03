/**
 * Main module
 */
import './components/name-form'
import './components/hello-box'
import { BackendService } from './services/backend-service.js'

/**
 * Called when the name-form is submitted.
 *
 * @param {HTMLElement} helloBox - box that displays the greeting and meaning fo the submitted name.
 * @param {HTMLElement} nameForm - form for submitting the name.
 */
const onSubmit = async (helloBox, nameForm) => {
  const backendService = new BackendService()

  helloBox.setAttribute('name', event.detail.name)
  nameForm.classList.add('hidden')
  helloBox.classList.remove('hidden')
  try {
    const info = await backendService.search(event.detail.name)
    helloBox.updateInfo(info)
  } catch (error) {
    console.error('Error fetching name info:', error)
  }
}

/**
 * Called when the hello-box is closed.
 *
 * @param {HTMLElement} helloBox - box that displays the greeting and meaning fo the submitted name.
 * @param {HTMLElement} nameForm - form for submitting the name.
 */
const onClose = (helloBox, nameForm) => {
  nameForm.reset()
  nameForm.classList.remove('hidden')
  helloBox.classList.add('hidden')
  helloBox.updateInfo('')
}

/**
 * The main function that starts the application.
 */
function main () {
  const nameForm = document.querySelector('name-form')
  const helloBox = document.querySelector('hello-box')

  nameForm.addEventListener('submit', async (event) => {
    onSubmit(helloBox, nameForm)
  })

  helloBox.addEventListener('close', () => {
    onClose(helloBox, nameForm)
  })
}

main()
