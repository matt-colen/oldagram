const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
  },
];

const createPost = (postArray) => {
  let posts = postArray.map((postObj, index) => {
    const postName = postObj["name"];
    const postUsername = postObj["username"];
    const postLocation = postObj["location"];
    const postImg = postObj["post"];
    const postAvatar = postObj["avatar"];
    const postComment = postObj["comment"];
    const postLikes = postObj["likes"];

    const postEl = `
    <!-- Post article  -->
    <article id="${postName}" class="post">
      <!-- Post info section of article -->
      <section class="post-info__container flex flex-centered">
        <img
          class="post-info__img avatar-img"
          src="${postAvatar}"
          alt="${postName} avatar"
        />
        <div class="post-info__author">
          <h2 class="post-info__name bold">${postName}</h2>
          <p class="post-info__location">${postLocation}</p>
        </div>
      </section>

      <!-- Post img section of article -->
      <section class="post-img__container">
        <img
          class="post-img"
          src="${postImg}"
          alt="Painted selfie of ${postName}"
        />
      </section>

      <!-- Post message section of article -->
      <section class="post-message__container">
        <ul class="post-message__icons-list flex">
          <li>
            <button class="post-icon-btn like-btn">
              <img
                class="post-icon"
                src="images/like.svg"
                alt="Heart icon"
              />
            </button>
          </li>
          <li>
            <button class="post-icon-btn">
              <img
                class="post-icon"
                src="images/comment.svg"
                alt="Comment icon"
              />
            </button>
          </li>
          <li>
            <button class="post-icon-btn">
              <img
                class="post-icon"
                src="images/share.svg"
                alt="Direct message icon"
              />
            </button>
          </li>
        </ul>
        <div class="post-message__info">
          <p><span class="post-likes bold" id="post-likes">${postLikes}</span> likes</p>
          <p class="post-message">
            <span class="bold">${postUsername}</span> ${postComment}
            lol
          </p>
        </div>
      </section>
    </article>
    `;

    return postEl;
  });

  posts = posts.join("");

  renderPosts(posts);
};

const renderPosts = (posts) => {
  const postsContainer = document.querySelector("#posts__container");

  postsContainer.innerHTML += posts;
};

createPost(posts);

const likeBtns = document.querySelectorAll(".like-btn");

const capturePostLikeCount = (e) => {
  const parentEl = e.target.closest(".post");
  const likeCountEl = parentEl.querySelector(`#post-likes`);

  incrementLikes(likeCountEl);
};

const incrementLikes = (likeEl) => {
  let likeCount = +likeEl.textContent;

  likeCount++;

  renderLikes(likeEl, likeCount);
};

const renderLikes = (el, count) => {
  el.textContent = count;
};

likeBtns.forEach((btn) => {
  btn.addEventListener("dblclick", (e) => {
    capturePostLikeCount(e);
  });
});
