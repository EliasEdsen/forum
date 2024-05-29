global.config  = require('../config.json');

global.express = require('express');
global.app     = express();
app.use(express.static('static'));

const { Pool, Client } = require('pg')
global.POSTGRESQL = new Pool(global.config.db)

/***** EXTENDS *****/

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },

  enumerable: false
});

/***** HELPERS *****/

function getLorem(count) {
  return (
    ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit", "laudantium", "voluptatem", "vitae", "quam", "possimus", "odit", "quaerat", "beatae", "eum", "incidunt", "explicabo", "temporibus", "deleniti", "id", "ad", "ipsam", "omnis", "animi", "expedita", "corporis", "eaque", "eveniet", "sed", "corrupti", "accusantium", "delectus", "quasi", "labore", "aperiam", "hic", "ab", "qui", "iste", "reprehenderit", "tempore", "nisi", "fuga", "suscipit", "optio", "voluptate", "modi", "recusandae", "consequatur", "ratione", "quis", "deserunt", "porro", "enim", "itaque", "dignissimos", "sequi", "esse", "alias", "veniam", "magnam", "aliquid", "dolore", "adipisci", "facilis", "officiis", "illo", "neque", "ut", "cupiditate", "laboriosam", "illum", "numquam", "molestias", "nemo", "dolores", "architecto", "similique", "quos", "mollitia", "doloremque", "ipsa", "dolorem", "repudiandae", "pariatur", "in", "aliquam", "perferendis", "soluta", "quo", "at", "voluptatum", "inventore", "culpa", "placeat", "doloribus", "nulla", "odio", "vero", "sint", "iusto", "totam", "exercitationem", "autem", "ex", "harum", "saepe", "natus", "praesentium", "facere", "rerum", "obcaecati", "libero", "aspernatur", "impedit", "non", "sunt", "voluptates", "maxime", "nihil", "assumenda", "a", "vel", "quae", "magni", "veritatis", "quod", "perspiciatis", "dicta", "fugit", "quisquam", "et", "eius", "eligendi", "asperiores", "debitis", "iure", "voluptas", "blanditiis", "nam", "minus", "consequuntur", "earum", "distinctio", "cum", "maiores", "nostrum", "ea", "commodi", "quidem", "ducimus", "molestiae", "ullam", "error", "sapiente", "quibusdam", "officia", "necessitatibus", "eos", "velit", "unde", "nesciunt", "quas", "dolorum", "repellendus", "tenetur", "excepturi", "rem", "reiciendis", "provident", "tempora", "nobis", "laborum", "minima", "accusamus", "repellat", "cumque", "est", "atque", "voluptatibus", "quia", "fugiat"]
    .sort(() => Math.random() - 0.5).slice(0, count).join(' ') + '.')
  .capitalize();
}

function getTags() {
  const tags = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return tags.sort(() => Math.random() - Math.random()).slice(0, Math.floor(Math.random() * tags.length)).map((num) => `tag${num}`)
}

/***** API *****/

app.get('/api/points', (req, res) => {
  POSTGRESQL
    .query('SELECT * FROM points')
    .then((result) => {
      let points = result.rows;
      points = points.map((point) => {
        point.id = Number(point.id);
        return point;
      })
      points = JSON.stringify(points);

      res
        .status(200)
        .header('Access-Control-Allow-Origin', 'http://localhost:3000')
        .send(points)
    })
    .catch((error) => console.error(error))
});

app.get('/api/createPoints', (req, res) => {
  for (let i = 0; i < 1; i++) {
    const body = getLorem(20);
    const tags = getTags();
    const timestamp = new Date(Math.floor(Math.random() * Date.now()));
    const url = 'https://www.google.com/';
    POSTGRESQL.query('INSERT INTO points (body, tags, timestamp, url) VALUES ($1, $2, $3, $4)', [body, tags, timestamp, url]);
  }

  res.send(true)
});

app.listen(global.config.server.port)
