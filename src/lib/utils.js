// Joins classNames and removes falsy values: cx('a', true && 'b') === 'a b'
export const cx = (...classes) => classes.filter(Boolean).join(' ');

export const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));
