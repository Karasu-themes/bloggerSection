import { obs } from "./utils/intersectionObserver";
import { getPosts } from "./utils/getPosts";
import { merge } from "./utils/merge";
import { parser, template } from 'blogger-utils/src/index';

function init ( config, modes ) {
  const NODE_WRAPPER = document.querySelectorAll('.bs-wrapper');

  if (NODE_WRAPPER.length == 0) {
    console.warn(`Warning: The node elements is not founded, please check if the node element passing as parameter exist en your HTML document`);
    return;
  }

  // Default config
  const DEFAULT_CONFIG = {
    summary: 96,
    results: 6,
    empty: "Empty"
  };

  let intersectionObserver = obs((data, observe) => {
    data.forEach((entry) => {
      let node = entry.target;
      const CONTAINER = node.querySelector('.bs-container');

      // Stop if CONTAINER is null
      if (!CONTAINER) return;

      const _NODE_TPL = CONTAINER.querySelector('.bs-render'),
      _STRING_TPL = _NODE_TPL.innerHTML.replace(/data-/g, '');

      if (entry.isIntersecting) {
        const CFG = merge({...DEFAULT_CONFIG, ...config, ...(modes ?? {})}, node.dataset ?? {}),
        _DEFAULT_URI = window.location.protocol + '//' + window.location.hostname;

        getPosts( CFG.homeUrl || _DEFAULT_URI, CFG.label, "bsFn" + (node.index+1), CFG.results )
        .then(entry => {
          let TEMPLATE = '';
          
          if (node.querySelector('.bs-loader')) node.querySelector('.bs-loader').innerHTML='';

          if (entry.length > 0) {
            entry.forEach(post => {
              const _DATA = parser(post, merge(DEFAULT_CONFIG, CFG));
              TEMPLATE+=template(_STRING_TPL, _DATA)
            })
          } else {
            TEMPLATE+=`<p class="bs-empty">${CFG.empty || DEFAULT_CONFIG.empty}</p>`;
          }

          CONTAINER.innerHTML=TEMPLATE;
          
          // Modes
          if (CFG.modes && CFG.modes[CFG.mode] && typeof CFG.modes[CFG.mode] == "function") {
            CFG.modes[CFG.mode].call(this, node, CONTAINER, CFG);
          }

        })
        
        // unobserve
        intersectionObserver.unobserve(node);
      }
    })
  })

  NODE_WRAPPER.forEach((el, i) => {
    el.index=i;
    intersectionObserver.observe(el);
  })

}

export {
  init
}