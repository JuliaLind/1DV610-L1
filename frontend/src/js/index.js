/**
 * Main module
 */
import './components/name-form'
import './components/hello-box'

function main() {
    const nameForm = document.querySelector('name-form')
    const helloBox = document.querySelector('hello-box')

    nameForm.addEventListener('submit', (event) => {
        
            console.log(event.detail.name)
        helloBox.setAttribute('name', event.detail.name)
        helloBox.classList.remove('hidden')
    })

    helloBox.addEventListener('close', () => {
        nameForm.reset()
        helloBox.classList.add('hidden')
    })
}

main()
