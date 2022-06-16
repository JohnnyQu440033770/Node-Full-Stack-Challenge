const symbolRoutes = require('./symbols');

const appRouter = (app, fs) => {
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  })

  
  symbolRoutes(app, fs)
}

module.export = appRouter
