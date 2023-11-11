// Imports
import { posts } from "./posts.js";

// Creates a new post
const createPost = (postArray) => {
  let posts = postArray.map((postObj) => {
    const postName = postObj["name"];
    const postUsername = postObj["username"];
    const postLocation = postObj["location"];
    const postImg = postObj["post"];
    const postAvatar = postObj["avatar"];
    const postComment = postObj["comment"];
    const postLikes = postObj["likes"];

    const postArticle = `
    <!-- Post article  -->
    <article id="${postName}-post" class="post">
      <!-- Post info section of article -->
      <section class="post-info__container flex flex-centered">
        <img
          class="avatar-img"
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
          <p><span id="post-likes" class="post-likes bold">${postLikes}</span> likes</p>
          <p class="post-message">
            <span class="bold">${postUsername}</span> ${postComment}
            lol
          </p>
        </div>
      </section>
    </article>
    `;

    return postArticle;
  });

  renderPosts(posts);
};

// Renders out all the posts
const renderPosts = (posts) => {
  const postsContainer = document.querySelector("#posts__container");
  posts = posts.join(""); // Makes sure that the commas don't render from the array

  postsContainer.innerHTML += posts;
};

createPost(posts); // Creates the example posts

// Selects all the like buttons for each post
const likeBtns = document.querySelectorAll(".like-btn");

// Captures the current like count for the "liked" post
const capturePostLikeCount = (e) => {
  const parentEl = e.target.closest(".post"); // Identifies the parent post el
  const likeCountEl = parentEl.querySelector(`#post-likes`);

  incrementLikes(likeCountEl);
};

// Adds a like to the post
const incrementLikes = (likeEl) => {
  let likeCount = +likeEl.textContent; // + ensures a # data type

  likeCount++;

  renderLikes(likeEl, likeCount);
};

// Renders out the like count
const renderLikes = (el, count) => {
  el.textContent = count;
};

// Adds event listeners to each like button
likeBtns.forEach((btn) => {
  btn.addEventListener("dblclick", (e) => {
    capturePostLikeCount(e);
  });
});
