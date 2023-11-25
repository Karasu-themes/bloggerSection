import { getPosts } from "./getPosts";
import { parser, template } from 'blogger-utils/src/index';

export default function start(data, observer) {
    data.forEach((entry) => {
        let node = entry.target;
        const CONTAINER = node.querySelector('.bs-container');

        // Stop if CONTAINER is null
        if (!CONTAINER) return;

        // Get the html template
        const { innerHTML: STR_TEMPLATE } = node.querySelector('.bs-render');

        if (entry.isIntersecting) {
            const config = { ...node.dataset };

            getPosts(config.homeUrl || (window.location.protocol + '//' + window.location.hostname), config.label ?? "", "bsFn" + (node.index + 1), config.results ?? 8)
                .then(entry => {
                    let TEMPLATE = '';
                    if (node.querySelector('.bs-loader')) node.querySelector('.bs-loader').innerHTML = '';

                    if (entry.length > 0) {
                        entry.forEach(post => {
                            const _DATA = parser(post, config);
                            TEMPLATE += template(STR_TEMPLATE.replace(/data-src/g, 'src'), _DATA)
                        })
                    } else {
                        TEMPLATE += `<p class="bs-empty">${config.empty || "No posts founded"}</p>`;
                    }

                    CONTAINER.innerHTML = TEMPLATE;

                    // initialize hook
                    if (typeof window[config.hook] == "function" && config.hook) {
                        window[config.hook].call(this, node, CONTAINER, config)
                    }
                })

            // unobserve
            observer.unobserve(node);

        }

    })
}