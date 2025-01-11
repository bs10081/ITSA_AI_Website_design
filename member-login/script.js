document.addEventListener('DOMContentLoaded', function() {
    // 選單功能
    const menuBtn = document.getElementById('menuBtn');
    const menu = document.getElementById('menu');
    const main = document.querySelector('main');
    
    menuBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        menu.classList.toggle('active');
        main.classList.toggle('menu-active');
    });

    // 點擊選單外的區域關閉選單，但不包括modal
    document.addEventListener('click', function(event) {
        const loginModal = document.getElementById('loginModal');
        const isClickInsideModal = loginModal.contains(event.target);
        
        if (!menu.contains(event.target) && 
            !menuBtn.contains(event.target) && 
            !isClickInsideModal) {
            menu.classList.remove('active');
            main.classList.remove('menu-active');
        }
    });

    // 登入視窗功能
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-btn');

    // 更新選單透明度的函數
    const updateMenuTransparency = (isModalOpen) => {
        if (isModalOpen) {
            menu.classList.add('transparent');
        } else {
            menu.classList.remove('transparent');
        }
    };

    loginBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        loginModal.classList.add('active');
        updateMenuTransparency(true);
    });

    closeBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        loginModal.classList.remove('active');
        updateMenuTransparency(false);
    });

    // 點擊modal外的區域關閉modal
    loginModal.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.classList.remove('active');
            updateMenuTransparency(false);
        }
    });

    // 防止modal內部點擊事件冒泡到外層
    loginModal.querySelector('.modal-content').addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // 防止menu內部點擊事件冒泡到外層
    menu.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
