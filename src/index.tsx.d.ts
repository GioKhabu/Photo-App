declare global {
    namespace ReactDOM {
      function createRoot(container: Element | Document | DocumentFragment | null): Root;
    }
  }
  
  interface Root {
    render(jsx: React.ReactNode): void;
  }