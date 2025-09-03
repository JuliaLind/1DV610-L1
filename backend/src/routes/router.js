/**
 * Contains the main router.
 *
 * @version 1.0.0
 */
import createError from 'http-errors'
import express from 'express'
import { Controller } from '../controllers/controller.js'

export const router = express.Router()

const controller = new Controller()

router.get('/:name',
  (req, res, next) => controller.get(req, res, next))


router.get('/',
  (req, res) => {
    res.status(200).json({
      message: 'Welcome to the name server API',
      version: '1.0.0'
    })
  })


router.use((req, res, next) => {
  next(createError(404))
})

