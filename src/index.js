import start from "./utils/start";

function init() {
  const NODE_WRAPPER = document.querySelectorAll('.bs-wrapper');

  if (NODE_WRAPPER.length == 0) {
    console.warn(`Warning: The node elements is not founded, please check if the node element passing as parameter exist en your HTML document`);
    return;
  }

  let intersectionObserver = new IntersectionObserver(start, {
    threshold: 0.3,
    rootMargin: "200px"
  });

  NODE_WRAPPER.forEach((el, i) => {
    el.index = i;
    intersectionObserver.observe(el);
  })

}

export {
  init
}