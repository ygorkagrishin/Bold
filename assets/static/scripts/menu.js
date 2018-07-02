var Hamburger = function () {
    var self = this;

    self.sel = {
        btn: document.querySelector('.btn__menu'),
        menu: document.querySelector('.nav')
    }

    self.defaults = {
        state_active: 'active',
        btn_state_active: 'btn__menu_state_active',
        body_state_active: 'js-menu-active'
    }
}

var hamburger = new Hamburger();

Hamburger.prototype.destroy = function () {
    if (document.body.classList.contains(hamburger.defaults.body_state_active)) {
        document.body.classList.remove(hamburger.defaults.body_state_active);
    }

    if (hamburger.sel.menu.classList.contains(hamburger.defaults.state_active) &&
    hamburger.sel.btn.classList.contains(hamburger.defaults.btn_state_active)) {
        hamburger.sel.menu.classList.remove(hamburger.defaults.state_active);
        hamburger.sel.btn.classList.remove(hamburger.defaults.btn_state_active);
    }

    hamburger.sel.menu.removeEventListener('touchmove', hamburger.touchDevaiceCollapse);
}

Hamburger.prototype.bodyCollapse = function () {
    if (!document.body.classList.contains(hamburger.defaults.body_state_active)) {
        document.body.classList.add(hamburger.defaults.body_state_active);
    }
    else {
        document.body.classList.remove(hamburger.defaults.body_state_active);
    }
}

Hamburger.prototype.touchDevaiceCollapse = function (e) {
    e.preventDefault();
}

Hamburger.prototype.open = function () {
    hamburger.bodyCollapse();

    hamburger.sel.menu.classList.add(hamburger.defaults.state_active);
    hamburger.sel.btn.classList.add(hamburger.defaults.btn_state_active);

    hamburger.sel.menu.addEventListener('touchmove', hamburger.touchDevaiceCollapse);
}

Hamburger.prototype.close = function () {
    hamburger.bodyCollapse();

    hamburger.sel.menu.classList.remove(hamburger.defaults.state_active);
    hamburger.sel.btn.classList.remove(hamburger.defaults.btn_state_active);

    hamburger.sel.menu.removeEventListener('touchmove', hamburger.touchDevaiceCollapse);
}

Hamburger.prototype.handler = function (e) {
    e.preventDefault();

    if (hamburger.sel.menu.classList.contains(hamburger.defaults.state_active) &&
    hamburger.sel.btn.classList.contains(hamburger.defaults.btn_state_active)) {
        hamburger.close();  
    }   
    else {
        hamburger.open();
    }
}

Hamburger.prototype.menu = function (e) {
    if (e.target.tagName.toLowerCase() === 'a') { hamburger.destroy(); }
}

Hamburger.prototype.init = function () {
    hamburger.sel.btn.addEventListener('click', hamburger.handler);
    hamburger.sel.menu.addEventListener('click', hamburger.menu);
}

hamburger.init();