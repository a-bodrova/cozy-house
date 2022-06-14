const burger = () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const mainBurger = document.querySelector('.header .hamburger');
  const menuBurger = document.querySelector('.burger__header > .hamburger');
  const menuOverlay = document.querySelector('.burger-menu__overlay');
  const logoHeader = document.querySelector('.header__logo');
  const links = menuOverlay.querySelectorAll('.nav__list .list__item');
  const isOpenedMenu = mainBurger.classList.contains('hamburger__checked') || menuBurger.classList.contains('hamburger__checked');
  console.log('burger is working...');
  function hideBurgerMenu() {
    menuOverlay.style.display = 'none';
  }

  function closeMenu() {
    mainBurger.classList.remove('hamburger__checked');
    menuBurger.classList.remove('hamburger__checked');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    logoHeader.style.visibility = 'visible';
    burgerMenu.addEventListener('transitionend', hideBurgerMenu, {
      once: true,
    });
  }

  function openMenu() {
    menuOverlay.style.display = 'block';
    menuOverlay.style.top = `${window.scrollY}px`;
    mainBurger.classList.add('hamburger__checked');
    menuBurger.classList.add('hamburger__checked');
    menuOverlay.classList.add('active');
    document.body.classList.add('no-scroll');
    logoHeader.style.visibility = 'hidden';
  }

  function handleClickBurger() {
    isOpenedMenu ? closeMenu() : openMenu();
  }

  mainBurger.onclick = handleClickBurger;
  menuBurger.onclick = closeMenu;

  links.forEach(link => {
    if (link.classList.contains('active')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        closeMenu();
        window.scrollTo(0, 0);
      })
    }
    link.addEventListener('click', closeMenu);
  })

  menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });
}

export default burger;
