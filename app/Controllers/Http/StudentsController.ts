import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {
  public async index({}: HttpContextContract) {
    const student = await Student.query()
    return student
  }

  public async store({ request }: HttpContextContract) {
    const { name, cpf, email, password, date } = request.only([
      'name',
      'cpf',
      'email',
      'password',
      'date',
    ])
    const student = await Student.create({
      name,
      cpf,
      email,
      password,
      date,
    })
    return student
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const student = await Student.findByOrFail('id', params.id)
      return student
    } catch (error) {
      return response.status(400).json({ error: 'Student Not Found' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const { name, cpf, email, password, date } = request.only([
        'name',
        'cpf',
        'email',
        'password',
        'date',
      ])
      const student = await Student.findByOrFail('id', params.id)
      student.merge({ name, cpf, email, password, date })
      await student.save()
      return student
    } catch (error) {
      return response.status(400).json({ error: 'Student Not Found' })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const student = await Student.findByOrFail('id', params.id)
      await student.delete()
      return response.status(203)
    } catch (error) {
      return response.status(408).json({ error: 'Student Not Found' })
    }
  }
}
