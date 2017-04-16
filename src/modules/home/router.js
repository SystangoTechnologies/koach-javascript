import * as home from './controller'

export const baseUrl = '/'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      home.getHome
    ]
  },
  {
    method: 'GET',
    route: 'login',
    handlers: [
      home.getLogin
    ]
  }
]
