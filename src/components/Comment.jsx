import '../styles/Comment.css';

function Comment({comment}) {
  return (
    <>
      <div className='comment'>
        <div>Автор: {comment.email}</div>
        <div className='name'>Заголовок: {comment.name}</div>
        <div className='body'>Сообщение: {comment.body}</div>
        {/* <Link to='/test'> */}
          {/* <button type='button'>Комментарии</button> */}
        {/* </Link> */}
      </div>
    </>
  );
}

export default Comment;
