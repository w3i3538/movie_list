// require package used in the project
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const movieList = require('./movies.json')

// setting express template engine - handlebars(express-handlebars)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
    // movieList = [...]
    // const numberList = [...]
    // past the number list into 'index' partial template
    // res.render('index', { movie: movieList, numbers: numberList })

    res.render('index', { movies: movieList.results })
    // res.send('<h1>This is my movie list build with express and nodemon</h1>')
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const movies = movieList.results.filter(movie=>{
        return movie.title.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { movies: movies, keyword: keyword })
})

app.get('/movies/:movie_id', (req, res) => {
    const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
    //這邊用find(取單個)比filter(取陣列)好，因為我們的要求一次只需要一部電影
    //movie.id === Number(req.params.movie_id)也行但沒選電影時(=null)會有小問題，
    //Number(null)=0反而會取到id=0的電影
    res.render('show', { movie: movie })
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})

