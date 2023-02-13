export function obs( cb,  obj) {

  const callback = (entries, observer) => {
    cb(entries, observer)
  }

  let obs = new IntersectionObserver(callback, obj || {
    threshold: 0.3,
    rootMargin: "200px"
  });

  return obs;

}