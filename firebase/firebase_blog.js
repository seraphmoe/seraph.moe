// 1. Import necessary functions from Firebase SDK
import { getDatabase, ref, onValue, off } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js';
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
const postId = "post_id_1"; // Replace with actual post ID

// 3. Function to read and display a single blog post's details
function displayBlogPost(postId) {
  const postRef = ref(database, `posts/${postId}`);

  // Use onValue to listen for changes to the entire post object
  // This listener will fire immediately and then again every time the data changes
  onValue(postRef, (snapshot) => {
    const postData = snapshot.val();

    if (postData) {
      // Update your HTML elements with postData
      document.getElementById('blog-title').innerText = postData.title;
      document.getElementById('blog-author').innerText = `By: ${postData.author}`;
      document.getElementById('blog-content').innerText = postData.content; // Be careful with innerText for rich content
      document.getElementById('blog-views').innerText = `Views: ${postData.views || 0}`;
      document.getElementById('blog-likes-count').innerText = `Likes: ${Object.keys(postData.likes || {}).length}`; // Count likes

      // Display comments and likes (separate functions for clarity)
      displayComments(postId);
      // No separate display for likes needed here as count is done above
    } else {
      console.log("No data available for this post.");
      // Handle case where post doesn't exist
    }
  }, {
    // Optional: { onlyOnce: true } if you only want to read the data once
    // but for blog post details, you might want real-time updates.
  });
}

// 4. Function to read and display comments for a blog post
function displayComments(postId) {
  const commentsRef = ref(database, `posts/${postId}/comments`);
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = ''; // Clear existing comments before adding new ones

  // Using onValue to get all comments at once, then iterate.
  // For frequently updated lists, onChildAdded/Changed/Removed might be more efficient.
  onValue(commentsRef, (snapshot) => {
    commentsContainer.innerHTML = ''; // Clear to prevent duplicates on update
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


// 5. Example HTML structure
/*
<!DOCTYPE html>
<html>
<head>
    <title>Blog Post</title>
</head>
<body>
    <h1 id="blog-title">Loading...</h1>
    <p id="blog-author"></p>
    <div id="blog-content"></div>
    <p id="blog-views"></p>
    <p id="blog-likes-count"></p>

    <h2>Comments</h2>
    <div id="comments-container">
        <p>Loading comments...</p>
    </div>

    <script type="module" src="your-main-script.js"></script>
    <script type="module">
        // Ensure app is initialized here if not in a separate script file
        // Then call your display function
        // const app = initializeApp(firebaseConfig); // Initialize if not already
        // displayBlogPost("post_id_1"); // Start displaying a specific post
    </script>
</body>
</html>
*/

// Call the function to start displaying data (e.g., when the page loads)
// Make sure 'app' is defined before calling this.
// For example, if you're putting this in a script tag within your HTML:
// window.onload = () => {
//   displayBlogPost("post_id_1");
// };
