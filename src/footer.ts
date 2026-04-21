


function createLink(name: string, linkPath: string, elemType: string) {
    const footerParent = document.createElement(elemType);
    const footerLink = document.createElement("span");

    footerLink.innerText = name;
    footerLink.className = 'font-link';
    footerLink.addEventListener('click', () => {
        window.location.href = linkPath;
    });

    footerParent.appendChild(footerLink);

    return footerParent;
}


const footerTop = document.getElementById("footer-top");
const footerExplore = document.getElementById("footer-explore");
const footerSupport = document.getElementById("footer-support");
const footerOther = document.getElementById("footer-other");

if(footerTop) {
    footerTop.appendChild(
        createLink("goto top", "#", "h1"));
};

if(footerExplore) {
    footerExplore.appendChild(
        createLink("home", "./index.html", "p"));
    footerExplore.appendChild(
        createLink("blog", "./blog.html", "p"));
    footerExplore.appendChild(
        createLink("projects", "https://github.com/seraphmoe", "p"));
    footerExplore.appendChild(
        createLink("gallery", "./gallery.html", "p"));
    footerExplore.appendChild(
        createLink("donate", "./donate.html", "p"))
};

if(footerSupport) {
    footerSupport.appendChild(
        createLink("contact", "./contact.html", "p"));
};

if(footerOther) {
    footerOther.appendChild(
        createLink("about me", "./aboutme.html", "p"));
};
