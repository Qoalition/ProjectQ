const next = require('next')
// const express = require('express')
const express = require('express-observer')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // server.use(bodyParser.json())
  // add custom path here
  // server.post('/request/custom', custom);

  server.get('*', (req, res) => {
    console.log('GOT A REQUEST :D')
    return handle(req, res)
  })

  server.listen(5000, (err) => {
    if (err) throw err
    console.log('Ready on http://localhost:5000')
  })
})