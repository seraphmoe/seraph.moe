import { getDatabase, ref, get, remove, onValue, off, push, set } from 'https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcLc7byHLM6_koSao-bhbF43Prlw3Hnfk",
  authDomain: "seraph-moe.firebaseapp.com",
  databaseURL: "https://seraph-moe-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "seraph-moe",
  storageBucket: "seraph-moe.firebasestorage.app",
  messagingSenderId: "296549837186",
  appId: "1:296549837186:web:0730e81ce7980a70df479b",
  measurementId: "G-XE94FBJ6T3"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);

const postId = (window.location.pathname.split('/').pop() || 'index.html').split('.').slice(0,-1).join('.') || 'index';
console.log(postId);

function submitComment() {
  const commentInput = document.getElementById('comment-input');
  const userNameInput = document.getElementById('user-name-input');
  const commentText = commentInput.value.trim();
  const userName = userNameInput.value.trim() || 'Anonymous';

  if (!commentText) {
    alert('Comment cannot be empty');
    return;
  }

  if (commentText.length > 500) {
    alert('Comment is too long (max 500 characters)');
    return;
  }

  const commentData = {
    avatar: "",
    metadata: "3.0KB",
    text: commentText,
    timestamp: Date.now(),
    userId: userName
  };

  const commentsRef = ref(database, `posts/${postId}/comments`);
  push(commentsRef, commentData)
    .then(() => {
      console.log('Comment posted successfully');
      commentInput.value = '';
      userNameInput.value = '';
    })
    .catch((error) => {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    });
}

document.getElementById('submit-comment-btn').addEventListener('click', submitComment);

document.getElementById('comment-input').addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    submitComment();
  }
});

function displayBlogPost(postId) {
  const postRef = ref(database, `posts/${postId}`);
  onValue(postRef, (snapshot) => {
    const postData = snapshot.val();
    if (postData) {
      // document.getElementById('blog-views').innerText = `${postData.views || 0} views`;
      // document.getElementById('blog-likes-count').innerText = `${Object.keys(postData.likes || {}).length} likes`;
      displayComments(postId);
    } else {
      console.log("No data available for this post.");
    }
  });
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  
  return `${hours}:${minutes}:${seconds} ${month}/${day}/${year}`;
}

function displayComments(postId) {
  const commentsRef = ref(database, `posts/${postId}/comments`);
  const commentsContainer = document.getElementById('comments-container');
  
  off(commentsRef); 
  onValue(commentsRef, (snapshot) => {
    commentsContainer.innerHTML = '';
    
    const commentsList = [];
    
    snapshot.forEach((childSnapshot) => {
      const commentData = childSnapshot.val();
      if (commentData.text) {
        commentsList.push(commentData);
      }
    });

    commentsList.sort((a, b) => b.timestamp - a.timestamp);

    commentsList.forEach((commentData) => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');

      const headerElement = document.createElement('div');
      headerElement.classList.add('comment-header');
      headerElement.innerHTML = `
        <strong>${commentData.userId || 'anonymous'}</strong>
        <span class="comment-date">${formatTimestamp(commentData.timestamp)}</span>
      `;

      const bodyElement = document.createElement('div');
      bodyElement.classList.add('comment-body');

      const avatarElement = document.createElement('img');
      avatarElement.classList.add('comment-avatar');
      avatarElement.src = '../media/default.png';
      avatarElement.alt = commentData.userId || 'anonymous';

      const contentElement = document.createElement('div');
      contentElement.classList.add('comment-content');

      const textElement = document.createElement('p');
      textElement.textContent = commentData.text;
      contentElement.appendChild(textElement);

      if (commentData.metadata) {
        const metaElement = document.createElement('p');
        metaElement.classList.add('comment-meta');
        metaElement.textContent = commentData.metadata;
        contentElement.appendChild(metaElement);
      }

      bodyElement.appendChild(avatarElement);
      bodyElement.appendChild(contentElement);

      commentElement.appendChild(headerElement);
      commentElement.appendChild(bodyElement);

      commentsContainer.appendChild(commentElement);
    });
  });
}

displayBlogPost(postId);
