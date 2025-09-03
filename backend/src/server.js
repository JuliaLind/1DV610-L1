/**
 * The starting point of the application.
 *
 * @author Julia Lind
 * @version 1.0.0
 */
import { createApp } from './config/create-app.js'

process.env.PORT = process.env.PORT || 3000

try {
  const app = createApp()
  // Starts the HTTP server listening for connections.
  const server = app.listen(process.env.PORT, '0.0.0.0', () => {
    const address = server.address()
    const host = address.address === '::' ? 'localhost' : address.address
    const port = address.port
    console.log(`Server running at http://${host}:${port}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
