function createBlogElement(title: string, authorMetadata: string, content: string, img: string, ref: string) {
    var blogFeed = document.getElementById("blog-feed");

    if (blogFeed === null) {
        console.error("Blog feed section not found.");
        return;
    }

    var blog = document.createElement("div");
    blog.classList.add("blog");

    var blogTitle = document.createElement("h2");
    var blogTitleText = document.createTextNode(title);
    blogTitle.appendChild(blogTitleText);

    var blogData = document.createElement("h4");
    var blogDataText = document.createTextNode(authorMetadata);
    blogData.appendChild(blogDataText);

    blog.appendChild(blogTitle);
    blog.appendChild(blogData);

    if (img) {
        let blogImgContainer = document.createElement("div");
        blogImgContainer.classList.add("blog-img-container");

        let blogImg = new Image();
        blogImg.src = img;
        blogImg.classList.add("blog-img");
        blogImgContainer.appendChild(blogImg);

        blog.appendChild(blogImgContainer);
    }

    let paragraphs = content.split("<br>");
    for (let idx = 0; idx < paragraphs.length; idx++) {
        let blogDesc = document.createElement("p");
        let blogDisplay = document.createTextNode(paragraphs[idx]);
        blogDesc.appendChild(blogDisplay);
        blog.appendChild(blogDesc);
    }

    if (ref) {
        let btnAnchor = document.createElement("div");
        btnAnchor.classList.add("btn-lrg-anchor");
        let btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-lrg-container");
        let btn = document.createElement("button");
        let btnText = document.createTextNode(title);
        btn.appendChild(btnText);
        btn.classList.add("btn-lrg");

        btn.onclick = function() {
            window.location.href = ref;
        }

        btnContainer.appendChild(btn);
        btnAnchor.appendChild(btnContainer);
        blog.appendChild(btnAnchor);
    }

    blogFeed.appendChild(blog);
}

createBlogElement(
    "hello, world",
    "by seraph @ 03:50PM | 01.06.2025",
    "added a new blog feature,,,",
    "./media/konata-izumi-konata.gif",
    "./blog/hello-world.html");
