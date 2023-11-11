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
            <svg class="post-icon like-svg" width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.84587 13.5811L12.7963 23.2159C13.2572 23.712 14.0424 23.712 14.5033 23.2159L23.4537 13.5811C25.9149 10.9318 25.9149 6.63634 23.4537 3.987C20.9926 1.33767 17.0022 1.33767 14.5411 3.987L14.5033 4.02764C14.0424 4.52375 13.2572 4.52375 12.7963 4.02764L12.7585 3.987C10.2974 1.33767 6.30704 1.33767 3.84587 3.987C1.38471 6.63634 1.38471 10.9318 3.84587 13.5811Z" stroke="#1F1E1F" stroke-width="2.32996"/>
            </svg>
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
  const heartIcon = parentEl.querySelector(".like-svg");

  // Limits the user to one like per post
  heartIcon.classList.contains("post-icon--clicked")
    ? decrementLikes(likeCountEl)
    : incrementLikes(likeCountEl);

  updateHeartIconStyling(heartIcon);
};

// Removes a like from the post
const decrementLikes = (likeEl) => {
  let likeCount = +likeEl.textContent; // + ensures a # data type

  likeCount--;

  renderLikes(likeEl, likeCount);
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

// Update heart svg styling
const updateHeartIconStyling = (icon) => {
  icon.classList.toggle("post-icon--clicked");
};

// Adds event listeners to each like button
likeBtns.forEach((btn) => {
  btn.addEventListener("dblclick", (e) => {
    capturePostLikeCount(e);
  });
});
