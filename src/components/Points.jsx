import '../styles/Points.css';

// import axios from 'axios';
import { useEffect, useState } from 'react';
import useID from '../hooks/useID';
import dayjs from 'dayjs'

import Header from './Header';
import Input from './Input';
import Point from './Point'
import PointDate from './PointDate'

function Points() {
  const [points,  setPoints] = useState([]);
  const [search, setSearch]  = useState('');
  const getID                = useID();

  useEffect(() => {
    getPoints();
  }, []);

  const getPoints = () => {
    // axios
      // .get('https://jsonplaceholder.typicode.com/points')
      // .then((response) => setPoints(response.data))

    const _points = [];
    for (let i = 0; i < 500; i++) {
      _points.push(createPoint(i));
    }

    setPoints(_points);
  }

  const createPoint = (index) => {
    const __textLorem = (count) =>
      (["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit", "laudantium", "voluptatem", "vitae", "quam", "possimus", "odit", "quaerat", "beatae", "eum", "incidunt", "explicabo", "temporibus", "deleniti", "id", "ad", "ipsam", "omnis", "animi", "expedita", "corporis", "eaque", "eveniet", "sed", "corrupti", "accusantium", "delectus", "quasi", "labore", "aperiam", "hic", "ab", "qui", "iste", "reprehenderit", "tempore", "nisi", "fuga", "suscipit", "optio", "voluptate", "modi", "recusandae", "consequatur", "ratione", "quis", "deserunt", "porro", "enim", "itaque", "dignissimos", "sequi", "esse", "alias", "veniam", "magnam", "aliquid", "dolore", "adipisci", "facilis", "officiis", "illo", "neque", "ut", "cupiditate", "laboriosam", "illum", "numquam", "molestias", "nemo", "dolores", "architecto", "similique", "quos", "mollitia", "doloremque", "ipsa", "dolorem", "repudiandae", "pariatur", "in", "aliquam", "perferendis", "soluta", "quo", "at", "voluptatum", "inventore", "culpa", "placeat", "doloribus", "nulla", "odio", "vero", "sint", "iusto", "totam", "exercitationem", "autem", "ex", "harum", "saepe", "natus", "praesentium", "facere", "rerum", "obcaecati", "libero", "aspernatur", "impedit", "non", "sunt", "voluptates", "maxime", "nihil", "assumenda", "a", "vel", "quae", "magni", "veritatis", "quod", "perspiciatis", "dicta", "fugit", "quisquam", "et", "eius", "eligendi", "asperiores", "debitis", "iure", "voluptas", "blanditiis", "nam", "minus", "consequuntur", "earum", "distinctio", "cum", "maiores", "nostrum", "ea", "commodi", "quidem", "ducimus", "molestiae", "ullam", "error", "sapiente", "quibusdam", "officia", "necessitatibus", "eos", "velit", "unde", "nesciunt", "quas", "dolorum", "repellendus", "tenetur", "excepturi", "rem", "reiciendis", "provident", "tempora", "nobis", "laborum", "minima", "accusamus", "repellat", "cumque", "est", "atque", "voluptatibus", "quia", "fugiat"].sort(() => Math.random() - 0.5).slice(0, count).join(' ') + '.').capitalize();

    const __randomDate = () => {
      return Math.floor(Math.random() * Date.now());
      // return Number(dayjs().subtract(index, 'h').valueOf())
    }

    return {id: getID(), date: __randomDate(), body: __textLorem(20), url: 'https://www.google.com/'};
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
    if (!points.length) { return []; }
    const timeline = [];

    let usedDay, dateNext;

    const getFormat = (object, format = 'DD MMMM YYYY') => {
      if (!object.$isDayjsObject) { object = dayjs(object); }
      return object.format(format);
    }

    for (let indexOfPoint = 0; indexOfPoint < points.length; indexOfPoint++) {
      const point = points[indexOfPoint];

      if (!usedDay) {
        timeline.push({type: 'date', text: getFormat(point.date), id: getID()});
        timeline.push({type: 'point', point: point, id: point.id});

        usedDay = point.date;
      } else if (getFormat(usedDay) != getFormat(point.date)) {
        if (getFormat(point.date) === getFormat(dateNext)) {
          timeline.push({type: 'date', text: getFormat(point.date), id: getID()});
        } else {
          timeline.push({type: 'date', text: getFormat(dateNext), id: dateNext.valueOf()});
          timeline.push({type: 'date', text: getFormat(point.date), id: getID()});
        }

        timeline.push({type: 'point', point: point, id: point.id});

        usedDay = point.date;
      } else {
        timeline.push({type: 'point', point: point, id: point.id});
      }

      dateNext = dayjs(point.date).add(1, 'd');
    }

    timeline.push({type: 'date', text: getFormat(dateNext), id: dateNext.valueOf()});
    // timeline.push({type: 'date', text: 'NOW', id: Date.now()});

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

  const handleEditPont = (event, point) => {
    console.log('event, point', event, point);
  }

  const timeline = getTimeline();

  return (
    <>
      <Header />
      <h2>Посты</h2>
      <Input handleSearch={handleSearch}/>
      <div className='points'>
        {
          timeline.map((point) => {
            return (
              point.type === 'date' ? <PointDate key={point.id} text={point.text} /> : <Point key={point.id} point={point.point} handleEditPont={handleEditPont}/>
            )
          })
        }
      </div>
    </>
  )
}

export default Points;
