const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const quotesRouter = express.Router()
app.use('/api/quotes', quotesRouter)

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

quotesRouter.get('/random', (req, res, next) => {
    const randomElement = getRandomElement(quotes)
    const randomQuote = randomElement[0]
    res.status(200).send(randomQuote)
})

quotesRouter.get('/', (req, res, next) => {
    if(req.query.person) {
        const personalQuotesArray = []
        const personQueried = req.query.person        
        for(let i=0; i<quotes.length; i++) {
            if(personQueried === quotes[i].person) {
                personalQuotesArray.push(quotes[i].quote)
            }
        }
        res.status(200).send(personalQuotesArray)
    } else {
        const allQuotes = []
        for(let i=0; i<quotes.length; i++) {
            allQuotes.push(quotes[i].quote)
        }
        res.status(200).send(allQuotes)
    }
})

quotesRouter.post('/', (req, res, next) => {
    if(req.query.quote && req.query.person) {
        const newQuote = req.query
        quotes.push(newQuote)
        res.status(201).send(newQuote)
    } else {
        res.status(400).send('You must insert a quote and a person in your query.')
    }
})

app.listen(PORT, () => {
    console.log('Server is listening on port 4001.')
})