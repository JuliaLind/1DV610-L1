/**
 * Module for the controller.
 *
 * @author Julia Lind
 * @version 1.0.0
 */

import { WebScraper } from '../services/webscraper.js'

/**
 * Encapsulates a controller.
 */
export class Controller {
  /**
   * Gets a name's meaning.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async get (req, res, next) {
    const { name } = req.params

    try {
      const meaning = await new WebScraper().search(name)
      res.status(200).json({ meaning })
    } catch (error) {
      next(error)
    }
  }
}

