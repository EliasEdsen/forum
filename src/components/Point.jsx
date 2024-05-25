import '../styles/Point.css';

import dayjs from 'dayjs'
// import { Link } from 'react-router-dom';

function Point({point}) {
  return (
    <>
      <div className='point'>
        {/* <Link to={`/users/${point.userId}`}> */}
          {/* <a>Автор: {point.userId}</a> */}
        {/* </Link> */}
        <div className='date'>Дата: {dayjs(point.date).format('HH:mm:ss')}</div>
        <div className='body'>Пост: {point.body}</div>
        {/* <Link to={`/comments/${point.id}`}> */}
          {/* <button type='button'>Комментарии</button> */}
        {/* </Link> */}
      </div>
    </>
  );
}

export default Point;
