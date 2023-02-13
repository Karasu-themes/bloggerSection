function scriptHTML(homeUrl, label, cbName, maxPosts) {
  let script = document.createElement('script'),
    path = `${homeUrl}/feeds/posts/${label ? "default/-/" + label : "default"}?alt=json-in-script&max-results=${maxPosts}&callback=${cbName}`;

    script.src = path;

  return script;
}

export function getPosts(homeUrl, label, cbName, maxPosts) {
  return new Promise(resolve => {
    const script = scriptHTML(homeUrl, label, cbName, maxPosts),
      body = document.body;

    body.appendChild(script);

    window[cbName] = (data) => {
      resolve(data.feed.entry || [])
    }
    
    script.remove();
  })
}