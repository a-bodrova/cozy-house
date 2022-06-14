export const lockBody = () => {
  document.body.classList.add('no-scroll');
}

export const unlockBody = () => {
  document.body.classList.remove('no-scroll');
}