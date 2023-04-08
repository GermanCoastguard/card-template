
// // <button class="scroll-top-button"> scroll to top</button>

function scrollToTop(btn) {
    let container = btn.parentElement;
    while (!container.classList.contains('card-paragraph')) {
        container = container.parentNode;
    }
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });

}

let scrollToParagraphTopBtns = document.querySelectorAll('.scroll-to-paragraph-top-button');
for (let btn of scrollToParagraphTopBtns) {
    btn.addEventListener('click', function(){
        scrollToTop(btn);
    });
}



// <button class="scroll-bottom-button"> scroll to bottom</button>

function scrollToBot(btn) {
    let container = btn.parentElement;
    while (!container.classList.contains('card-paragraph')) {
        container = container.parentNode;
    }
    container.scrollIntoView({ behavior: 'smooth', block: 'end' });
}



let scrollToParagraphBotBtns = document.querySelectorAll('.scroll-to-paragraph-bottom-button');
for (let btn of scrollToParagraphBotBtns) {
    btn.addEventListener('click', function(){
        scrollToBot(btn);
        console.log('test');
    });
}

/* 

- Scroll to previous container
- Scroll to next container


*/



// <button class="scroll-top-button"> scroll to top</button>

function scrollToCardTop(btn) {
    let container = btn.parentElement;
    while (!container.classList.contains('card-container__card')) {
        container = container.parentNode;
    }
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });

}

let scrollToCardTopBtns = document.querySelectorAll('.scroll-to-card-top-button');
for (let btn of scrollToCardTopBtns) {
    btn.addEventListener('click', function(){
        scrollToCardTop(btn);
    });
}



// <button class="scroll-bottom-button"> scroll to bottom</button>

function scrollToCardBot(btn) {
    let container = btn.parentElement;
    while (!container.classList.contains('card-container__card')) {
        container = container.parentNode;
    }
    container.scrollIntoView({ behavior: 'smooth', block: 'end' });
}



let scrollToCardBotBtns = document.querySelectorAll('.scroll-to-card-bottom-button');
for (let btn of scrollToCardBotBtns) {
    btn.addEventListener('click', function(){
        scrollToCardBot(btn);
        console.log('test');
    });
}