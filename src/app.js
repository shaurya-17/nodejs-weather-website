const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port= process.env.PORT || 3000
//Define paths for express config 


const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)


// setup static dir. to serve
app.use(express.static(publicDirPath))

// app.get('', (req, res) => {
//     res.send("<h1>Hello Shaurya</h1>")
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: "Shaurya",
//             age: 24
//         }, {
//             name: 'CR7',
//             age: 38
//         }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'shaurya',
        name: 'Shaurya '
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About ME',
        name: "Surya",
        name: 'Shaurya Bhatnagar'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'for help ping me on my email',
        title: 'Help',
        name: 'SHAURYA',
        name: 'Shaurya Bhatnagar'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            console.log(location)
            console.log(forecastdata)


            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })


    // res.send([{
    //     forecast: forecastdata,
    //     location: location,
    //     address:req.query.address
    // }])
})


app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.com
// app.com/help
// app/comabout

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shaurya',
        errorMessage: 'Help Article Not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 error Message',
        name: 'Shaurya',
        errorMessage: 'Page Not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})