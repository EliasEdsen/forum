import '../styles/Point.css';

import dayjs from 'dayjs'
// import { Link } from 'react-router-dom';

function Point({point, handleEditPont}) {
  return (
    <>
      <div className="line-short"></div>
      <div className="point">
        <div className="time">{dayjs(point.date).format('HH:mm:ss')}</div>
        <div className="edit" onClick={((event) => handleEditPont(event, point))}>ред.</div>
        <div className="body">{point.body}</div>
        <div className="url"><a target="_blank" href={point.url}>{point.url}</a></div>
        {/* <div className="tags"> */}
          {/* <span className="tag" v-for="(tagData, index) in tags" :key="index" @click="tagClick(tagData)">{{ tagData.tag }}</span> */}
        {/* </div> */}
      </div>
      <div className="line-short"></div>

      {/* <Link to={`/users/${point.userId}`}> */}
        {/* <a>Автор: {point.userId}</a> */}
      {/* </Link> */}
      {/* <Link to={`/comments/${point.id}`}> */}
        {/* <button type='button'>Комментарии</button> */}
      {/* </Link> */}
    </>
  );
}

export default Point;
