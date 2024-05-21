import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Comment from './Comment';

function Comments() {
  const [comments, setComments] = useState([])
  const params = useParams();

  useEffect(() => {
    getComments()
  }, []);

  const getComments = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${params.commentId}/comments`)
      .then((response) => setComments(response.data))
  }

  return (
    <>
      <Header />
      <h2>Комментарии</h2>
      {
        comments.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} />
          )
        })
      }
    </>
  )
}

export default Comments;
