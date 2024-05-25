function Date({text}) {
  return (
    <>
      <div className='date'>
        {/* <Link to={`/users/${post.userId}`}> */}
          {/* <a>Автор: {post.userId}</a> */}
        {/* </Link> */}
        <div>{text}</div>
        {/* <Link to={`/comments/${post.id}`}> */}
          {/* <button type='button'>Комментарии</button> */}
        {/* </Link> */}
      </div>
    </>
  );
}

export default Date;
