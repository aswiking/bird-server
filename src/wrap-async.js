export default function wrapAsync(fn) {
  async function inner(...args) {
    let returnValue;
    const next = args[args.length - 1];
    try {
      returnValue = await fn(...args);
    }
    catch (e) {
      return next(e);
    }
    return returnValue;
  }
  return inner;
}
