require('dotenv').config()
require('debug')('weathermap')

const Koa = require('koa')
const router = require('koa-router')()
const koaBody = require('koa-body')
const fetch = require('node-fetch')
const cors = require('kcors')

const appId = process.env.APPID || ''

const mapURI =
  process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5'

const port = process.env.PORT || 9000

const app = new Koa()

app.use(cors())

const fetchForecast = async ({ lat, lon }) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${appId}&`
  const response = await fetch(endpoint)

  return response ? response.json() : {}
}

router.get('/api/weather', async ctx => {
  // default location set to Helsinki
  const forecastData = await fetchForecast({ lat: 60, lon: 25 })

  ctx.type = 'application/json; charset=utf-8'
  ctx.body = forecastData || {}
})

router.post('/api/weather', koaBody(), async ctx => {
  // get location from browser
  const forecastData = await fetchForecast(ctx.request.body)

  ctx.type = 'application/json; charset=utf-8'
  ctx.body = forecastData || {}
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port)

console.log(`App listening on port ${port}`)
