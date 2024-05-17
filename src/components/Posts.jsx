import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from './Post'
import Input from './Input';

function Posts() {
  console.log('Posts');

  const [posts,  setPosts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPosts()
    return () => {
      console.log('Posts onUnmount');
    };
  }, []);

  const getPosts = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => setPosts(response.data))
  }

  const deletePost = (id, event) => {
    setPosts(posts.filter((post) => post.id !== id));
  }

  const filteredPost = () => {
    if (!search) { return posts; }
    return posts.filter((post) => post.name.toLowerCase().search(search) !== -1)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  }

  return (
    <div>
      <Input handleSearch={handleSearch}/>
      {
        filteredPost().map((post) => {
          return (
            <Post key={post.id} post={post} deletePost={deletePost}/>
          )
        })
      }
    </div>
  )
}

export default Posts;
