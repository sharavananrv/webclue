export function fetchNumber() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * 30));
      }, 1000);
    });
  }
  