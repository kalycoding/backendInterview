const bodyParser = require('body-parser')
const port = 8080
const { shipping, app } = require('./routes/shipping')



app.use(bodyParser.json());
app.use('/shipping', shipping)

    
app.listen(port, function(){
    console.log(`Server running on port ${port}`)
})


