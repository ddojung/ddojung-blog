declare module '*.css' {
  const value: { [key: string]: string };
  export = value;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}
