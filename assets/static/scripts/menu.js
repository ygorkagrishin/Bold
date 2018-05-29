(() => {

const nav = document.querySelector('.nav');
const wrap = document.querySelector('.nav__wrap');
const menu = document.querySelector('.nav__list');

const content = document.querySelector('.hero__main');

const open = document.querySelector('.nav__open');
const close = document.querySelector('.nav__close');

const navOffsetHeight = nav.offsetHeight;
const menuOffsetHeight = menu.offsetHeight;

let switchButtons = () => {
    if (!open.classList.contains('is-collapsed') && 
    close.classList.contains('is-collapsed')) {
        open.classList.add('is-collapsed');
        close.classList.remove('is-collapsed');
    } 
    else {
        open.classList.remove('is-collapsed');
        close.classList.add('is-collapsed');
    }
}

open.addEventListener('click', (e) => {
    e.preventDefault();

    if (!nav.classList.contains('is-active')) {
        nav.classList.add('is-active');
    }

    switchButtons();

    wrap.style.height = `${menuOffsetHeight}px`;
    content.style.transform = 
        'translate(0px, '+ `${menuOffsetHeight - navOffsetHeight}px` +')';
});

close.addEventListener('click', (e) => {
    e.preventDefault();

    if (nav.classList.contains('is-active')) {
        nav.classList.remove('is-active');
    }

    switchButtons();

    wrap.removeAttribute('style');
    content.style.transform = 'translate(0px, 0px)';
});

})();