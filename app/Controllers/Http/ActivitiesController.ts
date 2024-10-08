import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Activity from 'App/Models/Activity'

export default class ActivitiesController {
  public async index({}: HttpContextContract) {
    const activity = await Activity.query()
    return activity
  }

  public async store({ request }: HttpContextContract) {
    const { name, description, date_start, date_end } = request.only([
      'name',
      'description',
      'date_start',
      'date_end',
    ])
    const activity = await Activity.create({
      name,
      description,
      date_start,
      date_end,
    })
    return activity
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const activity = await Activity.findByOrFail('id', params.id)
      return activity
    } catch (error) {
      return response.status(400).json({ error: 'Activity Not Found' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { name, description, date_start, date_end } = request.only([
        'name',
        'description',
        'date_start',
        'date_end',
      ])
      const activity = await Activity.findByOrFail('id', params.id)
      activity.merge({ name, description, date_start, date_end })
      await activity.save()
      return activity
    } catch (error) {
      return response.status(400).json({ error: 'Activity Not Found' })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const activity = await Activity.findByOrFail('id', params.id)
      await activity.delete()
      return response.status(203)
    } catch (error) {
      return response.status(408).json({ error: 'Activity Not Found' })
    }
  }
}
