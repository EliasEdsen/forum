import '../styles/Post.css';

function Post({post, deletePost}) {

  return (
    <div className='post'>
      <div>{post.postId}</div>
      <div>{post.name}</div>
      <div>{post.email}</div>
      <div>{post.body}</div>
      <button onClick={(event) => deletePost(post.id, event)}>Delete</button>
    </div>
  );
}

export default Post;
