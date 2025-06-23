export {};

declare global {
  interface Window {
    dataLayer: unknown[][];
  }

  function gtag(...args: [string, ...unknown[]]): void;
}
