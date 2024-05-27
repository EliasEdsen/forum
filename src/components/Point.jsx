import '../styles/Point.css';

import dayjs from 'dayjs'
import { Link } from 'react-router-dom';

function Point({point, handleEditPont}) {
  return (
    <>
      <div className="line-short"></div>
      <div className="point">
        <div className="time">{dayjs(point.date).format('HH:mm:ss')}</div>
        <Link to={`/points/${point.id}/edit`}>
          <div className="edit">ред.</div>
        </Link>
        <div className="body">{point.body}</div>
        <div className="url"><a target="_blank" href={point.url}>{point.url}</a></div>
        {/* <div className="tags"> */}
          {/* <span className="tag" v-for="(tagData, index) in tags" :key="index" @click="tagClick(tagData)">{{ tagData.tag }}</span> */}
        {/* </div> */}
      </div>
      <div className="line-short"></div>
    </>
  );
}

export default Point;
