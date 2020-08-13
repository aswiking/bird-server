export default function wrapAsync(fn) {
  function inner(...args) {
    const returnValue = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(returnValue).catch(next);
  }
  return inner;
}
