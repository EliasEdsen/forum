// import axios from 'axios';
import { useEffect, useId, useState } from 'react';
import dayjs from 'dayjs'

import Header from './Header';
import Input from './Input';
import Post from './Post'
import Date from './Date'

function Posts() {
  const [posts,  setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    // axios
      // .get('https://jsonplaceholder.typicode.com/posts')
      // .then((response) => setPosts(response.data))

    setPosts([createPost(), createPost(), createPost()]);
  }

  const createPost = () => {
    const __textLorem = (count) =>
      (["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipisicing", "elit", "laudantium", "voluptatem", "vitae", "quam", "possimus", "odit", "quaerat", "beatae", "eum", "incidunt", "explicabo", "temporibus", "deleniti", "id", "ad", "ipsam", "omnis", "animi", "expedita", "corporis", "eaque", "eveniet", "sed", "corrupti", "accusantium", "delectus", "quasi", "labore", "aperiam", "hic", "ab", "qui", "iste", "reprehenderit", "tempore", "nisi", "fuga", "suscipit", "optio", "voluptate", "modi", "recusandae", "consequatur", "ratione", "quis", "deserunt", "porro", "enim", "itaque", "dignissimos", "sequi", "esse", "alias", "veniam", "magnam", "aliquid", "dolore", "adipisci", "facilis", "officiis", "illo", "neque", "ut", "cupiditate", "laboriosam", "illum", "numquam", "molestias", "nemo", "dolores", "architecto", "similique", "quos", "mollitia", "doloremque", "ipsa", "dolorem", "repudiandae", "pariatur", "in", "aliquam", "perferendis", "soluta", "quo", "at", "voluptatum", "inventore", "culpa", "placeat", "doloribus", "nulla", "odio", "vero", "sint", "iusto", "totam", "exercitationem", "autem", "ex", "harum", "saepe", "natus", "praesentium", "facere", "rerum", "obcaecati", "libero", "aspernatur", "impedit", "non", "sunt", "voluptates", "maxime", "nihil", "assumenda", "a", "vel", "quae", "magni", "veritatis", "quod", "perspiciatis", "dicta", "fugit", "quisquam", "et", "eius", "eligendi", "asperiores", "debitis", "iure", "voluptas", "blanditiis", "nam", "minus", "consequuntur", "earum", "distinctio", "cum", "maiores", "nostrum", "ea", "commodi", "quidem", "ducimus", "molestiae", "ullam", "error", "sapiente", "quibusdam", "officia", "necessitatibus", "eos", "velit", "unde", "nesciunt", "quas", "dolorum", "repellendus", "tenetur", "excepturi", "rem", "reiciendis", "provident", "tempora", "nobis", "laborum", "minima", "accusamus", "repellat", "cumque", "est", "atque", "voluptatibus", "quia", "fugiat"].sort(() => Math.random() - 0.5).slice(0, count).join(' ') + '.').capitalize();

    const __randomDate = () => {
      return Math.floor(Math.random() * Date.now());
    }

    if (!global.postId) { global.postId = 0; }
    global.postId += 1;
    return {id: global.postId, date: __randomDate(), body: __textLorem(20)};
  }

  const getFilteredPostsByPosts = (posts) => {
    if (!search) { return posts; }

    return posts.filter((post) => {
      return post.body.split(' ').some((word) => {
        return word.toLowerCase().startsWith(search)
      });
    });
  }

  const getSortedPostsByPosts = (posts) => {
    return posts.sort((postA, postB) => {
      return postA.date - postB.date;
    });
  }

  const getTimelineByPosts = (posts) => {
    const timeline = [];

    let usedDate;
    for (let indexOfPost = 0; indexOfPost < posts.length; indexOfPost++) {
      const post = posts[indexOfPost];
      const date = dayjs(post.date).format('DD MMMM YYYY');

      if (usedDate != date) {
        timeline.push({type: 'date', text: date, id: post.date});
        timeline.push({type: 'post', post: post, id: post.id});

        usedDate = date;
      }
    }

    timeline.push({type: 'date', text: 'NOW', id: Date.now()});

    return timeline;
  }

  const getTimeline = () => {
    let _posts, timeline;

    _posts = structuredClone(posts);
    _posts = getFilteredPostsByPosts(_posts);
    _posts = getSortedPostsByPosts(_posts);

    timeline = getTimelineByPosts(_posts);
    timeline = timeline.reverse();

    return timeline;
  }

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  }

  const timeline = getTimeline();

  return (
    <>
      <Header />
      <h2>Посты</h2>
      <Input handleSearch={handleSearch}/>
      {
        timeline.map((point) => {
          return (
            point.type === 'date' ? <Date key={point.id} text={point.text} /> : <Post key={point.id} post={point.post} />
          )
        })
      }
    </>
  )
}

export default Posts;
