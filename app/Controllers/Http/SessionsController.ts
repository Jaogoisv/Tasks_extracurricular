import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const token = await auth.attempt(email, password)
      return token
    } catch (error) {
      return response.status(401).json({ error: 'invalid credentials' })
    }
  }

  public async destroy({ response, auth }: HttpContextContract) {
    await auth.logout()
    return response.status(203)
  }
}
