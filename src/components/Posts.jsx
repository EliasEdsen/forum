// import axios from 'axios';
import { useEffect, useId, useState } from 'react';
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
    // axios
      // .get('https://jsonplaceholder.typicode.com/posts')
      // .then((response) => setPosts(response.data))

    setPosts([createPost(), createPost(), createPost()])
  }

  const createPost = () => {
    const __textLorem = (count) =>
      (["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit", "laudantium", "voluptatem", "vitae", "quam", "possimus", "odit", "quaerat", "beatae", "eum", "incidunt", "explicabo", "temporibus", "deleniti", "id", "ad", "ipsam", "omnis", "animi", "expedita", "corporis", "eaque", "eveniet", "sed", "corrupti", "accusantium", "delectus", "quasi", "labore", "aperiam", "hic", "ab", "qui", "iste", "reprehenderit", "tempore", "nisi", "fuga", "suscipit", "optio", "voluptate", "modi", "recusandae", "consequatur", "ratione", "quis", "deserunt", "porro", "enim", "itaque", "dignissimos", "sequi", "esse", "alias", "veniam", "magnam", "aliquid", "dolore", "adipisci", "facilis", "officiis", "illo", "neque", "ut", "cupiditate", "laboriosam", "illum", "numquam", "molestias", "nemo", "dolores", "architecto", "similique", "quos", "mollitia", "doloremque", "ipsa", "dolorem", "repudiandae", "pariatur", "in", "aliquam", "perferendis", "soluta", "quo", "at", "voluptatum", "inventore", "culpa", "placeat", "doloribus", "nulla", "odio", "vero", "sint", "iusto", "totam", "exercitationem", "autem", "ex", "harum", "saepe", "natus", "praesentium", "facere", "rerum", "obcaecati", "libero", "aspernatur", "impedit", "non", "sunt", "voluptates", "maxime", "nihil", "assumenda", "a", "vel", "quae", "magni", "veritatis", "quod", "perspiciatis", "dicta", "fugit", "quisquam", "et", "eius", "eligendi", "asperiores", "debitis", "iure", "voluptas", "blanditiis", "nam", "minus", "consequuntur", "earum", "distinctio", "cum", "maiores", "nostrum", "ea", "commodi", "quidem", "ducimus", "molestiae", "ullam", "error", "sapiente", "quibusdam", "officia", "necessitatibus", "eos", "velit", "unde", "nesciunt", "quas", "dolorum", "repellendus", "tenetur", "excepturi", "rem", "reiciendis", "provident", "tempora", "nobis", "laborum", "minima", "accusamus", "repellat", "cumque", "est", "atque", "voluptatibus", "quia", "fugiat"].sort(() => Math.random() - 0.5).slice(0, count).join(' ') + '.').capitalize()

    const __randomDate = () => {
      return Math.floor(Math.random() * Date.now());
    }

    if (!global.postId) { global.postId = 0; }
    global.postId += 1
    return {id: global.postId, date: __randomDate(), body: __textLorem(20)};
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
