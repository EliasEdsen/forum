import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from './Header';
import Input from './Input';
import Post from './Post'

function Posts() {
  const [posts,  setPosts] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getPosts()
  }, []);

  const getPosts = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => setPosts(response.data))
  }

  const getFilteredPost = () => {
    if (!search) { return posts; }

    return posts.filter((post) => {
      return post.body.split(' ').some((word) => {
        return word.toLowerCase().startsWith(search)
      });
    });
  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  }

  const filteredPost = getFilteredPost()

  return (
    <>
      <Header />
      <h2>Посты</h2>
      <Input handleSearch={handleSearch}/>
      {
        filteredPost.map((post) => {
          return (
            <Post key={post.id} post={post} />
          )
        })
      }
    </>
  )
}

export default Posts;
