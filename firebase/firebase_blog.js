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
      document.getElementById('blog-likes-count').innerText = `♥ ${Object.keys(postData.likes || {}).length}`;
      displayComments(postId);
    } else {
      console.log("No data available for this post.");
    }
  });
}

// 4. Function to read and display comments for a blog post
function displayComments(postId) {
  const commentsRef = ref(database, `posts/${postId}/comments`);
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = '';
  onValue(commentsRef, (snapshot) => {
    commentsContainer.innerHTML = '';
    snapshot.forEach((childSnapshot) => {
      const commentKey = childSnapshot.key;
      const commentData = childSnapshot.val();

      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
      commentElement.innerHTML = `
        <strong>${commentData.userId}</strong> (${new Date(commentData.timestamp).toLocaleString()}):
        <p>${commentData.text}</p>
      `;
      commentsContainer.appendChild(commentElement);
    });
  });
}

// Call the function to start displaying data
displayBlogPost(postId);
