const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
const knex = require('knex')(require('../knexfile.js')['development']);

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Success!');
})

app.get('/movies', (req, res) => {
  knex('movie')
    .select()
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log(err);
      res.status(404).json({
      message:
        'Movie data not available'
    })})
})

app.post('/movies', (req, res) => {
  const movie = req.body;
  knex('movie')
    .insert([{
      title: movie.title,
      hasWatched: movie.hasWatched,
      isGoingToWatch: movie.isGoingToWatch
    }])
    .then(() => {
      return knex('movie')
        .select();
    })
    .then(data => res.status(200).send(data))
    .catch(err => {
      console.log(err);
      res.status(404).json({
      message:
        'Movie data not available'
    })})
})

app.listen(port, () => {
  console.log(`Server is successfully listening on port ${port}...`)
});