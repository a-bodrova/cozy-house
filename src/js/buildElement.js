function buildElement(tag, classname, parent, textcontent) {
  const element = document.createElement(tag);
  element.className = classname;
  if (parent) parent.append(element);
  if (textcontent) element.textContent = textcontent;

  return element;
}

export default buildElement;