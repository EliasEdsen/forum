// import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'

import Header from './Header';
import Input from './Input';
import Point from './Point'
import PointDate from './PointDate'

function Points() {
  const [points,  setPoints] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPoints();
  }, []);

  const getPoints = () => {
    // axios
      // .get('https://jsonplaceholder.typicode.com/points')
      // .then((response) => setPoints(response.data))

    setPoints([createPoint(), createPoint(), createPoint()]);
  }

  const createPoint = () => {
    const __textLorem = (count) =>
      (["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit", "laudantium", "voluptatem", "vitae", "quam", "possimus", "odit", "quaerat", "beatae", "eum", "incidunt", "explicabo", "temporibus", "deleniti", "id", "ad", "ipsam", "omnis", "animi", "expedita", "corporis", "eaque", "eveniet", "sed", "corrupti", "accusantium", "delectus", "quasi", "labore", "aperiam", "hic", "ab", "qui", "iste", "reprehenderit", "tempore", "nisi", "fuga", "suscipit", "optio", "voluptate", "modi", "recusandae", "consequatur", "ratione", "quis", "deserunt", "porro", "enim", "itaque", "dignissimos", "sequi", "esse", "alias", "veniam", "magnam", "aliquid", "dolore", "adipisci", "facilis", "officiis", "illo", "neque", "ut", "cupiditate", "laboriosam", "illum", "numquam", "molestias", "nemo", "dolores", "architecto", "similique", "quos", "mollitia", "doloremque", "ipsa", "dolorem", "repudiandae", "pariatur", "in", "aliquam", "perferendis", "soluta", "quo", "at", "voluptatum", "inventore", "culpa", "placeat", "doloribus", "nulla", "odio", "vero", "sint", "iusto", "totam", "exercitationem", "autem", "ex", "harum", "saepe", "natus", "praesentium", "facere", "rerum", "obcaecati", "libero", "aspernatur", "impedit", "non", "sunt", "voluptates", "maxime", "nihil", "assumenda", "a", "vel", "quae", "magni", "veritatis", "quod", "perspiciatis", "dicta", "fugit", "quisquam", "et", "eius", "eligendi", "asperiores", "debitis", "iure", "voluptas", "blanditiis", "nam", "minus", "consequuntur", "earum", "distinctio", "cum", "maiores", "nostrum", "ea", "commodi", "quidem", "ducimus", "molestiae", "ullam", "error", "sapiente", "quibusdam", "officia", "necessitatibus", "eos", "velit", "unde", "nesciunt", "quas", "dolorum", "repellendus", "tenetur", "excepturi", "rem", "reiciendis", "provident", "tempora", "nobis", "laborum", "minima", "accusamus", "repellat", "cumque", "est", "atque", "voluptatibus", "quia", "fugiat"].sort(() => Math.random() - 0.5).slice(0, count).join(' ') + '.').capitalize();

    const __randomDate = () => {
      return Math.floor(Math.random() * Date.now());
    }

    if (!global.pointId) { global.pointId = 0; }
    global.pointId += 1;
    return {id: global.pointId, date: __randomDate(), body: __textLorem(20)};
  }

  const getFilteredPointsByPoints = (points) => {
    if (!search) { return points; }

    return points.filter((point) => {
      return point.body.split(' ').some((word) => {
        return word.toLowerCase().startsWith(search)
      });
    });
  }

  const getSortedPointsByPoints = (points) => {
    return points.sort((pointA, pointB) => {
      return pointA.date - pointB.date;
    });
  }

  const getTimelineByPoints = (points) => {
    const timeline = [];

    let usedDate;
    for (let indexOfPoint = 0; indexOfPoint < points.length; indexOfPoint++) {
      const point = points[indexOfPoint];
      const date = dayjs(point.date).format('DD MMMM YYYY');

      if (usedDate != date) {
        timeline.push({type: 'date', text: date, id: point.date});
        timeline.push({type: 'point', point: point, id: point.id});

        usedDate = date;
      }
    }

    timeline.push({type: 'date', text: 'NOW', id: Date.now()});

    return timeline;
  }

  const getTimeline = () => {
    let _points, timeline;

    _points = structuredClone(points);
    _points = getFilteredPointsByPoints(_points);
    _points = getSortedPointsByPoints(_points);

    timeline = getTimelineByPoints(_points);
    timeline = timeline.reverse();

    return timeline;
  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  }

  const timeline = getTimeline();

  return (
    <>
      <Header />
      <h2>Посты</h2>
      <Input handleSearch={handleSearch}/>
      {
        timeline.map((point) => {
          return (
            point.type === 'date' ? <PointDate key={point.id} text={point.text} /> : <Point key={point.id} point={point.point} />
          )
        })
      }
    </>
  )
}

export default Points;
