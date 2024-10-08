import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Presence from 'App/Models/Presence'

export default class PresencesController {
  public async index({ response }: HttpContextContract) {
    const presences = await Presence.query()
    return response.json(presences)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['enrollements_id', 'date', 'present'])
    data.enrollements_id = Number(data.enrollements_id)
    const presence = await Presence.create(data)
    return response.status(201).json(presence)
  }

  public async show({ params, response }: HttpContextContract) {
    const presence = await Presence.query().where('id', params.id).firstOrFail()
    return response.json(presence)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const presence = await Presence.findOrFail(params.id)
    const data = request.only(['enrollement_id', 'date', 'present'])
    presence.merge(data)
    await presence.save()
    return response.json(presence)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const presence = await Presence.findOrFail(params.id)
    await presence.delete()
    return response.status(204)
  }
}
