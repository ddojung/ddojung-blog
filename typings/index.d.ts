declare module '*.css' {
  const value: { [key: string]: string };
  export = value;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }
}

declare module 'firestore-parser' {
  const parse: <T>(val: T) => T;
  export = parse;
}
