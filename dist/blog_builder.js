"use strict";
function createBlogElement(title, authorMetadata, content, img, ref) {
    var blogFeed = document.getElementById("blog-feed");
    if (blogFeed === null) {
        console.error("Blog feed section not found.");
        return;
    }
    var blogCard = document.createElement("article");
    blogCard.classList.add("blog-card");
    blogCard.onclick = function () {
        window.location.href = ref;
    };
    if (img) {
        let blogImg = new Image();
        blogImg.src = img;
        blogImg.classList.add("blog-img");
        blogCard.appendChild(blogImg);
    }
    var blogContent = document.createElement("div");
    blogContent.classList.add("blog-content");
    var blogTitle = document.createElement("h2");
    var blogTitleText = document.createTextNode(title);
    blogTitle.appendChild(blogTitleText);
    var blogData = document.createElement("p");
    blogData.classList.add("blog-meta");
    var blogDataText = document.createTextNode(authorMetadata);
    blogData.appendChild(blogDataText);
    blogContent.appendChild(blogTitle);
    blogContent.appendChild(blogData);
    let paragraphs = content.split("<br>");
    for (let idx = 0; idx < paragraphs.length; idx++) {
        let blogDesc = document.createElement("p");
        blogDesc.classList.add("blog-description");
        let blogDisplay = document.createTextNode(paragraphs[idx]);
        blogDesc.appendChild(blogDisplay);
        blogContent.appendChild(blogDesc);
    }
    blogCard.appendChild(blogContent);
    // if (ref) {
    //     let btnAnchor = document.createElement("div");
    //     btnAnchor.classList.add("btn-lrg-anchor");
    //     let btnContainer = document.createElement("div");
    //     btnContainer.classList.add("btn-lrg-container");
    //     let btn = document.createElement("button");
    //     let btnText = document.createTextNode(title);
    //     btn.appendChild(btnText);
    //     btn.classList.add("btn-lrg");
    //     btn.onclick = function() {
    //         window.location.href = ref;
    //     }
    //     btnContainer.appendChild(btn);
    //     btnAnchor.appendChild(btnContainer);
    //     blog.appendChild(btnAnchor);
    // }
    blogFeed.appendChild(blogCard);
}
createBlogElement("why ill never be a normie", "by seraph @ 20:20PM | 27.04.2026", "people often forget that all the good in our society as we see it today was made possible because of 'the weirdos, the rejects, the nerds, and the deviants'", "./media/bsky_seraph_neveranormie.png", "./blog/never-a-normie.html");
createBlogElement("scifi game asset style", "by seraph @ 20:22PM | 19.04.2026", "we are back at it again with the 90s style 3D shading - this time ? assets and 'finding the style',,, i hope to continue to make more assets and showcase them on my website !", "./media/cboard_render02.png", "./blog/scifi-game-asset-style.html");
createBlogElement("cgitest002", "by seraph @ 19:30PM | 16.04.2026", "ive been experimenting lately with some unique 90s style 3D shading, primatives, lighting, and landscapes,,, as you can see it has led to some quite interesting results !", "./media/cgitest002.png", "./blog/cgi-test.html");
createBlogElement("hello, world", "by seraph @ 03:50PM | 01.06.2025", "as you can see ive finally added the blogging feature i wanted to add a while back, and talked about on bsky,,,", "./media/konata-izumi-konata.gif", "./blog/hello-world.html");
