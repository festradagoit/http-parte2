import axios from 'axios';
const baseDomain = 'https://jsonplaceholder.typicode.com';

const limit = 5;
let page = 1;

const totalPages = 100 / limit; // early return de la funcion que llama

const posts = `/posts`;
const users = '/users';
const comments = '/comments';

function callServer(urlToCall) {
  const searchParams = new URLSearchParams({
    _sort: 'body',
    _limit: limit,
    _page: page,
  });

  if (page > totalPages) {
    return;
  }

  //   console.log(`${urlToCall}?${searchParams}`);
  return axios({
    method: 'GET',
    baseURL: baseDomain,
    url: `${urlToCall}?${searchParams}`,
  });
}

// const serverPosts = callServer(posts);

// console.log(serverPosts);
// callServer(users);
// callServer(comments);

// CORS

const btnFecth = document.querySelector('#fetch');
const list = document.querySelector('#posts');

btnFecth.addEventListener('click', () => {
  callServer(posts)
    .then(posts => {
      console.log(posts);
      showPosts(posts);
      page += 1;
    })
    .catch(err => console.log(err));
});

function showPosts(posts) {
  console.log(posts.data);

  posts.data.map(el => {
    let post = document.createElement('div');
    post.classList.add('post-container');
    post.innerHTML = `<div>${el.title}</div>`;
    list.appendChild(post);
  });
}
