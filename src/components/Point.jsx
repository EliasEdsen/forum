import '../styles/Point.css';

import dayjs from 'dayjs'
// import { Link } from 'react-router-dom';

function Point({point}) {
  return (
    <>
      <div className="line-short"></div>
      <div className="point">
        <div className="time">{dayjs(point.date).format('HH:mm:ss')}</div>
        {/* <div className="edit" @click="editClick()">{{ this.$translate('Points.Edit') }}</div> */}
        <div className="body">{point.body}</div>
        {/* <div className="url"><a target="_blank" :href="url">{{ url }}</a></div> */}
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
