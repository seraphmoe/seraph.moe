"use strict";
function createButton(name, linkPath, color) {
    const button = document.createElement("button");
    button.innerText = name;
    button.className = 'navbar-btn';
    button.id = color;
    button.addEventListener('click', () => {
        window.location.href = linkPath;
    });
    return button;
}
var pageIndex = "./index.html";
var pageBlog = "./blog.html";
var pageContact = "./contact.html";
var pageGallery = "./gallery.html";
var pageAboutMe = "./aboutme.html";
const blog = document.getElementById("blog");
if (blog) {
    pageIndex = "../index.html";
    pageBlog = "../blog.html";
    pageContact = "../contact.html";
    pageGallery = "../gallery.html";
    pageAboutMe = "../aboutme.html";
}
;
const navbar = document.getElementById("navbar");
if (navbar) {
    navbar.appendChild(createButton("home", pageIndex, "nav-btn"));
    navbar.appendChild(createButton("blog", pageBlog, "nav-btn"));
    navbar.appendChild(createButton("projects", "https://github.com/seraphmoe", "nav-btn"));
    navbar.appendChild(createButton("gallery", pageGallery, "nav-btn"));
    navbar.appendChild(createButton("contact", pageContact, "nav-btn"));
    navbar.appendChild(createButton("about me", pageAboutMe, "nav-btn"));
}
;
