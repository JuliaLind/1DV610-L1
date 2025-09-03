/**
 * Main module
 */
import './components/name-form'
import './components/hello-box'
import { BackendService } from "./services/backend-service.js"

function main() {
    const nameForm = document.querySelector('name-form')
    const helloBox = document.querySelector('hello-box')
    const backendService = new BackendService()

    nameForm.addEventListener('submit', async (event) => {
        helloBox.setAttribute('name', event.detail.name)
        helloBox.classList.remove('hidden')
        const info = await backendService.search(event.detail.name)
        helloBox.updateInfo(info)
    })

    helloBox.addEventListener('close', () => {
        nameForm.reset()
        helloBox.classList.add('hidden')
        helloBox.updateInfo('')
    })
}

main()
