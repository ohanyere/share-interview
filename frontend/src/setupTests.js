// src/setupTests.js
import "@testing-library/jest-dom";

// helper so tests can control screen size
let currentMatches = false;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: currentMatches,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});


export function setScreenWidth(width) {
  currentMatches = width >= 1060; // adjust to your breakpoint
}
