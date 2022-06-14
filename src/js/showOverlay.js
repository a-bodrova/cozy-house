import buildElement from './buildElement';

const overlay = buildElement('div', 'overlay', document.body);

export function showOverlay() {
  overlay.classList.add('active');
}

export function hideOverlay() {
  overlay.classList.remove('active');
};