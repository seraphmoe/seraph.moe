function createGalleryElement(title: string, linkType: string, link: string, poster: string) {
    var galleryFeed = document.getElementById("gallery-feed");

    if (galleryFeed === null) {
        console.error("Gallery feed section not found.");
        return;
    }

    var galleryItem = document.createElement("div");
    galleryItem.classList.add("gallery-item");

    var galleryMedia = document.createElement("div");
    galleryMedia.classList.add("gallery-media");

    if (linkType == "image") {
        let galleryImg = new Image();
        galleryImg.src = link;
        galleryImg.alt = title;
        galleryImg.classList.add("gallery-img");

        galleryMedia.appendChild(galleryImg);
    }

    if (linkType == "video") {
        var galleryImg = document.createElement('video');
        galleryImg.src = link;
        galleryImg.poster = poster;
        galleryImg.controls = true;
        galleryImg.autoplay = true;
        galleryImg.classList.add("gallery-img");

        galleryMedia.appendChild(galleryImg);
    }

    galleryItem.appendChild(galleryMedia);

    var galleryTitle = document.createElement("div");
    galleryTitle.classList.add("gallery-title");
    var galleryTitleText = document.createTextNode(title);
    galleryTitle.appendChild(galleryTitleText);
    galleryItem.appendChild(galleryTitle);

    galleryFeed.appendChild(galleryItem);
}

createGalleryElement(
    "vending machine (animation)",
    "video",
    "./media/vendbreak2.mp4",
    "./media/vend.png"
);

createGalleryElement(
    "circuit board (turntable)",
    "video",
    "./media/cboard.mp4",
    "./media/cboard_render02.png"
);

createGalleryElement(
    "psiprofen (turntable)",
    "video",
    "./media/psiprofen.mp4",
    "./media/psiprofen_render01.png"
);

createGalleryElement(
    "water flask (turntable)",
    "video",
    "./media/water.mp4",
    "./media/water_render01.png"
);

createGalleryElement(
    "cgi test scene (animation)",
    "video",
    "./media/cgitest002.mp4",
    "./media/cgitest002.png"
);

createGalleryElement(
    "tomoko (fan art)",
    "image",
    "./media/tomoko.png",
    ""
);