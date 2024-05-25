function PointDate({text}) {
  return (
    <>
      <div className='point-date'>
        {/* <Link to={`/users/${point.userId}`}> */}
          {/* <a>Автор: {point.userId}</a> */}
        {/* </Link> */}
        <div>{text}</div>
        {/* <Link to={`/comments/${point.id}`}> */}
          {/* <button type='button'>Комментарии</button> */}
        {/* </Link> */}
      </div>
    </>
  );
}

export default PointDate;
