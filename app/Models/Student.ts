import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Enrollement from './Enrollement'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cpf: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public date: string

  @column()
  public Token: string | null

  @hasMany(() => Enrollement, {
    foreignKey: 'student_id',
  })
  public enrollements: HasMany<typeof Enrollement>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(student: Student) {
    if (student.$dirty.password) {
      student.password = await Hash.make(student.password)
    }
  }
}
