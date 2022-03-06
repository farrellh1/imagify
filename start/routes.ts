/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//Authenthication
Route.post('/register', 'AuthController.register').as('auth.register')
Route.post('/login', 'AuthController.login').as('auth.login')
Route.post('/logout', 'AuthController.logout').as('auth.logout')
Route.put('/reset/:username', 'PasswordResets.passwordReset').as('auth.reset').middleware('auth')

//User
Route.get('/:username', 'UsersController.index')

//Foto
Route.get('/items', 'ItemsController.index').middleware('auth')
Route.get('/items/:id', 'ItemsController.show').middleware('auth')
Route.post('/items', 'ItemsController.store').middleware('auth')
Route.post('/items/:id', 'ItemsController.destroy').middleware('auth')

//follow
Route.post('/follow/:id', 'FollowsController.follow').middleware('auth')
Route.delete('/follow/:id', 'FollowsController.unfollow').middleware('auth')
Route.get('/follower/:id', 'FollowsController.follower')
Route.get('/following/:id', 'FollowsController.following')

//likes
Route.get('/likes/:itemid', 'ReactionsController.likes')
Route.post('/likes/:itemid', 'ReactionsController.like').middleware('auth')
Route.delete('/likes/:itemid', 'ReactionsController.unlike').middleware('auth')

