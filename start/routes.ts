import Route from '@ioc:Adonis/Core/Route'

Route.post('/Session', 'SessionsController.store')
Route.delete('/Session', 'SessionsController.destroy').middleware('auth')

Route.resource('/Students', 'StudentsController').apiOnly()
Route.resource('/Activity', 'ActivitiesController').apiOnly()
Route.resource('/Presence', 'PresencesController').apiOnly()

Route.group(() => {
  Route.resource('/Enrollements', 'EnrollementsController').apiOnly()
}).middleware('auth')
