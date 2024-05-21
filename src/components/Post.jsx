import '../styles/Post.css';
import { Link } from 'react-router-dom';

function Post({post}) {
  return (
    <>
      <div className='post'>
        <div>Автор: {post.userId}</div>
        <div className='title'>Заголовок: {post.title}</div>
        <div className='body'>Пост: {post.body}</div>
        <Link to={`/comments/${post.id}`}>
          <button type='button'>Комментарии</button>
        </Link>
      </div>
    </>
  );
}

export default Post;
