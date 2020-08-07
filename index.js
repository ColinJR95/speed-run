const express = require('express');
const bodyParser = require('body-parser');	

const app = express();








const MongoClient = require('mongodb').MongoClient



MongoClient.connect('mongodb+srv://mrpibb:12345@cluster0.5y70t.gcp.mongodb.net/master-quotes?retryWrites=true&w=majority', { useUnifiedTopology: true })

  .then(client => {
    console.log('Connected to Database')
    const db = client.db('master-quotes')
    const quotesCollection = db.collection('quotes')
// listing of middlewares
	app.use(bodyParser.urlencoded({ extended: true }))
	app.set('view engine', 'ejs')
	app.use(bodyParser.json())
	app.use(express.static('public'))

// routes ////////////
    app.get('/', (req, res) => {
  	db.collection('quotes').find().toArray()
    .then(results => {
      console.log(results)
      res.render('index.ejs', {quotes: results})
    })
    .catch(error => console.error(error))
  
})

    app.put('/quotes', (req, res) => {
  console.log(req.body)
  quotesCollection.findOneAndUpdate(
  { name: 'javi' },
  {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  },
  {
    upsert: true
  }
)
  .then(result => {
  	res.json('Success')
})
  .catch(error => console.error(error))
})


    app.delete('/quotes', (req, res)=> {
    	  quotesCollection.deleteOne(
        { name: req.body.name }
      )
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
          res.json('Deleted Darth Vadar\'s quote')
        })
        .catch(error => console.error(error))
    })


    app.post('/quotes', (req, res) => {
 	 quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error)) 
})
    
  })
  .catch(error => console.error(error))










app.listen(3001, () => {
	console.log('yup this worked');
});
