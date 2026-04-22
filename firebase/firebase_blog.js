// firebase-blog.js

// 1. Import necessary functions from Firebase SDK
import { getDatabase, ref, onValue, off } from 'https://www.gstatic.com/firebasejs/12.12.1/firebase-database.js';
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

// 2. Get a reference to the Realtime Database service
const database = getDatabase(app);

// Let's assume you have a way to get the current post ID, e.g., from the URL or a global variable
const postId = "post_id_1"; // Replace with actual post ID, perhaps from URL parameters

// 3. Function to read and display a single blog post's details
function displayBlogPost(postId) {
  const postRef = ref(database, `posts/${postId}`);
  onValue(postRef, (snapshot) => {
    const postData = snapshot.val();
    if (postData) {
      document.getElementById('blog-views').innerText = `${postData.views || 0} views`;
      document.getElementById('blog-likes-count').innerText = `${Object.keys(postData.likes || {}).length} likes`;
      displayComments(postId);
    } else {
      console.log("No data available for this post.");
    }
  });
}

// 4. Function to format timestamp to "HH:MM:SS MM/DD/YY" format
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

// 5. Function to read and display comments for a blog post
function displayComments(postId) {
  const commentsRef = ref(database, `posts/${postId}/comments`);
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = '';
  
  // Add the COMMENTS heading
  const heading = document.createElement('h2');
  heading.textContent = 'COMMENTS';
  commentsContainer.appendChild(heading);
  
  onValue(commentsRef, (snapshot) => {
    // Clear all children except the heading
    while (commentsContainer.children.length > 1) {
      commentsContainer.removeChild(commentsContainer.lastChild);
    }
    
    snapshot.forEach((childSnapshot) => {
      const commentKey = childSnapshot.key;
      const commentData = childSnapshot.val();

      // Create the main comment container
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');

      // Create the comment header
      const headerElement = document.createElement('div');
      headerElement.classList.add('comment-header');
      headerElement.innerHTML = `
        <strong>${commentData.userId || 'Anonymous'}</strong>
        <span class="comment-date">${formatTimestamp(commentData.timestamp)}</span>
      `;

      // Create the comment body
      const bodyElement = document.createElement('div');
      bodyElement.classList.add('comment-body');

      // Create and add the avatar
      const avatarElement = document.createElement('img');
      avatarElement.classList.add('comment-avatar');
      avatarElement.src = commentData.avatar || 'https://via.placeholder.com/50'; // Default placeholder if no avatar
      avatarElement.alt = commentData.userId || 'Anonymous';

      // Create the comment content wrapper
      const contentElement = document.createElement('div');
      contentElement.classList.add('comment-content');

      // Add tag if available
      if (commentData.tag) {
        const tagElement = document.createElement('p');
        tagElement.classList.add('comment-tag');
        tagElement.textContent = `>${commentData.tag}`;
        contentElement.appendChild(tagElement);
      }

      // Add the comment text
      const textElement = document.createElement('p');
      textElement.textContent = commentData.text;
      contentElement.appendChild(textElement);

      // Add metadata (file size) if available
      if (commentData.metadata) {
        const metaElement = document.createElement('p');
        metaElement.classList.add('comment-meta');
        metaElement.textContent = commentData.metadata;
        contentElement.appendChild(metaElement);
      }

      // Assemble the body
      bodyElement.appendChild(avatarElement);
      bodyElement.appendChild(contentElement);

      // Assemble the comment
      commentElement.appendChild(headerElement);
      commentElement.appendChild(bodyElement);

      // Add to container
      commentsContainer.appendChild(commentElement);
    });
  });
}

// Call the function to start displaying data
displayBlogPost(postId);
