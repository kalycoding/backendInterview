const bodyParser = require('body-parser')
const port = 8081
const { router, app } = require('./routes/shipping')
const swaggerJSDoc =  require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const ordersRoutes = require('./routes/orders')
const swaggerJson = require('./swagger.json')


//Swagger Configuration  
const swaggerOptions = {  
    swaggerDefinition:
    swaggerJson,
    apis:['./routes/shipping.js'],  
}  
const swaggerDocs = swaggerJSDoc(swaggerOptions);  


app.use(bodyParser.json());
app.use('/shipping', router)
app.use('/payments', ordersRoutes)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));  


app.listen(port, function(){
    console.log(`Server running on port ${port}`)
})


