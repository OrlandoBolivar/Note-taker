const express = require('express');
const path = require('path');
const dataJSON = require('./db/db.json');
const fs = require('fs');
const {v4: uuidv4 } = require('uuid');

// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile(dataJSON).then((data) =>
    res.json(JSON.parse(data)))
});

app.post ('/api/notes', (req, res) => {
  const {title, text} = req.body;

  if (title && text) {
    const currentNote = {
      title,
      text,
      id: uuidv4(),
    };

    fs.readFile(currentNote, 'utf8', (err, data) => {
      if(err) {
        console.error(err);
      } else {
        const parseData = JSON.parse(data);
        parseData.push(content);
        writeToFile(currentNote, parseData);
      }
    });
  }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

app.listen(3001, () => {
    console.log('server is running on port 3001');
});