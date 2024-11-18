import '@testing-library/jest-dom';

if (!customElements.get('custom-progress-bar')) {
  global.customElements.define(
    'custom-progress-bar',
    class extends HTMLElement {
      constructor() {
        super();
      }
    }
  );
}

const originalError = console.error;
console.error = (...args) => {
  if (/findDOMNode is deprecated/.test(args[0])) {
    return;
  }
  originalError(...args);
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    json: () => Promise.resolve({}),
    text: () => Promise.resolve('response text'),
  })
) as jest.Mock;
