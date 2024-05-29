import '../styles/Points.css';

import axios from 'axios';
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
    axios
      .get('http://localhost:3001/api/points')
      .then((response) => setPoints(response.data))
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
      return dayjs(pointA.timestamp).valueOf() - dayjs(pointB.timestamp).valueOf();
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
        timeline.push({type: 'date', text: getFormat(point.timestamp), id: getID()});
        timeline.push({type: 'point', point: point, id: point.id});

        usedDay = point.timestamp;
      } else if (getFormat(usedDay) != getFormat(point.timestamp)) {
        if (getFormat(point.timestamp) === getFormat(dateNext)) {
          timeline.push({type: 'date', text: getFormat(point.timestamp), id: getID()});
        } else {
          timeline.push({type: 'date', text: getFormat(dateNext), id: dateNext.valueOf()});
          timeline.push({type: 'date', text: getFormat(point.timestamp), id: getID()});
        }

        timeline.push({type: 'point', point: point, id: point.id});

        usedDay = point.timestamp;
      } else {
        timeline.push({type: 'point', point: point, id: point.id});
      }

      dateNext = dayjs(point.timestamp).add(1, 'd');
    }

    timeline.push({type: 'date', text: getFormat(dateNext), id: dateNext.valueOf()});

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
      <div className='points'>
        {
          timeline.map((point) => {
            return (
              point.type === 'date' ? <PointDate key={point.id} text={point.text} /> : <Point key={point.id} point={point.point} />
            )
          })
        }
      </div>
    </>
  )
}

export default Points;
