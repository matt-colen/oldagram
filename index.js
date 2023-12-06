import { posts } from "./posts.js";

const createPost = (postArray) => {
  let posts = postArray.map((postObj) => {
    const post = postObj["name"];
    const username = postObj["username"];
    const location = postObj["location"];
    const img = postObj["post"];
    const avatar = postObj["avatar"];
    const comment = postObj["comment"];
    const likes = postObj["likes"];

    const postArticle = `
    <!-- Post article  -->
    <article id="${post}-post" class="post">
      <!-- Post info section of article -->
      <section class="post-info__container flex flex-centered">
        <img
          class="avatar-img"
          src="${avatar}"
          alt="${post} avatar"
        />
        <div class="post-info__author">
          <h2 class="post-info__name bold">${post}</h2>
          <p class="post-info__location">${location}</p>
        </div>
      </section>

      <!-- Post img section of article -->
      <section class="post-img__container">
        <img
          class="post-img"
          src="${img}"
          alt="Painted selfie of ${post}"
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
          <p><span id="post-likes" class="post-likes bold">${likes}</span> likes</p>
          <p class="post-message">
            <span class="bold">${username}</span> ${comment}
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

const renderPosts = (posts) => {
  const postsContainer = document.querySelector("#posts__container");
  posts = posts.join(""); 

  postsContainer.innerHTML += posts;
};

createPost(posts); // Creates the example posts

const likeBtns = document.querySelectorAll(".like-btn");

const capturePostLikeCount = (e) => {
  const parentEl = e.target.closest(".post"); 
  const likeCountEl = parentEl.querySelector(`#post-likes`);
  const heartIcon = parentEl.querySelector(".like-svg");

  // Limits the user to one like per post
  heartIcon.classList.contains("post-icon--clicked")
    ? decrementLikes(likeCountEl)
    : incrementLikes(likeCountEl);

  updateHeartIconStyling(heartIcon);
};

const decrementLikes = (likeEl) => {
  let likeCount = +likeEl.textContent; 

  likeCount--;

  renderLikes(likeEl, likeCount);
};

const incrementLikes = (likeEl) => {
  let likeCount = +likeEl.textContent; 

  likeCount++;

  renderLikes(likeEl, likeCount);
};

const renderLikes = (el, count) => {
  el.textContent = count;
};

const updateHeartIconStyling = (icon) => {
  icon.classList.toggle("post-icon--clicked");
};

likeBtns.forEach((btn) => {
  btn.addEventListener("dblclick", (e) => {
    capturePostLikeCount(e);
  });
});
