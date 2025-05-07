declare module 'json2csv' {
    interface ParserOptions<T> {
      fields: (keyof T)[];
    }
  
    class Parser<T> {
      constructor(options?: ParserOptions<T>);
      parse(data: T[]): string;
    }
  
    export { Parser };
  }