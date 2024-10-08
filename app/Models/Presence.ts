import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Enrollement from './Enrollement'

export default class Presence extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public enrollements_id:number

  @hasMany(() => Enrollement)
  public enrollement: HasMany<typeof Enrollement>

  @column()
  public date: string

  @column()
  public present: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
