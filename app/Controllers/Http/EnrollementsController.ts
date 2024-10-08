import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollement from 'App/Models/Enrollement'

export default class EnrollementsController {
  public async index({ response }: HttpContextContract) {
    const enrollements = await Enrollement.query().preload('activity')
    return response.json(enrollements)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['studentId', 'activityId', 'date_enrollement'])
    data.activityId = Number(data.activityId)
    data.studentId = Number(data.studentId)
    if (!data.activityId || !data.studentId) {
      return response.status(400).json({ message: 'studentId and activityId are required' })
    }
  
    const enrollement = await Enrollement.create(data)
    return response.status(201).json(enrollement)
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const enrollement = await Enrollement.query()
        .where('id', params.id)
        .preload('student')
        .preload('activity')
        .firstOrFail()
      return enrollement
    } catch (error) {
      return response.status(404).json({ message: 'Enrollement not found' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const enrollement = await Enrollement.findOrFail(params.id)
    const data = request.only(['studentId', 'activityId', 'date_enrollement'])
    enrollement.merge(data)
    await enrollement.save()
    return response.json(enrollement)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const enrollement = await Enrollement.findOrFail(params.id)
    await enrollement.delete()
    return response.status(204)
  }
}
