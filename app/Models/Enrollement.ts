import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Activity from './Activity'

export default class Enrollement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public studentId: number

  @belongsTo(() => Student)
  public student: BelongsTo<typeof Student>

  @column()
  public activityId: number

  @belongsTo(() => Activity)
  public activity: BelongsTo<typeof Activity>

  @column()
  public date_enrollement: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
