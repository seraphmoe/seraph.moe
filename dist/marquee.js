"use strict";
var textArr;
var lastIterValue;
function updateMarqueeText() {
    const marqueeContainer = document.getElementById('marquee-container');
    var marquee = document.getElementById('marquee');
    var marqueeText = document.getElementById('marquee-text');
    if (!marquee || !marqueeText || !marqueeContainer) {
        return;
    }
    ;
    marquee.remove();
    marqueeText.remove();
    marquee = document.createElement('div');
    marquee.className = 'marquee';
    marquee.id = 'marquee';
    marqueeText = document.createElement('p');
    marqueeText.className = 'marquee-text';
    marqueeText.id = 'marquee-text';
    var iterValue = Math.floor(Math.random() * textArr.length);
    while (iterValue == lastIterValue) {
        iterValue = Math.floor(Math.random() * textArr.length);
    }
    ;
    lastIterValue = iterValue;
    var text = textArr[iterValue];
    if (!text.includes('%')) {
        marquee.addEventListener('click', () => {
            window.location.href = '';
        });
        marqueeText.className = 'marquee-text';
        marqueeText.innerText = text;
    }
    else {
        const linkPath = text.split('%')[1];
        text = text.split('%')[0];
        marquee.addEventListener('click', () => {
            window.location.href = linkPath;
        });
        marqueeText.className = 'marquee-text-url';
        marqueeText.innerText = text;
    }
    ;
    marquee.appendChild(marqueeText);
    marqueeContainer.appendChild(marquee);
}
textArr = [
    'follow me on BlueSky: the everything app%https://bsky.app/profile/seraph.moe%',
    'i stream sometimes on twitch.tv/seraphx%https://twitch.tv/seraphx%',
    'now with extra pickles !',
    'if u hate me ur literally a strogg',
    '100 percent satisfaction guarenteed or ur money back !',
    'buy me a coffee on ko-fi <3 <3 %https://ko-fi.com/seraphx%',
    'they hate me cuz they aint me'
];
window.setInterval(updateMarqueeText, 15000);
