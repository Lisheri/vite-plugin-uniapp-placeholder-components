type UsingComponents = Record<string, string>;
export type Options = Record<string, UsingComponents>;
export type Platform = 'wx'; // 目前仅微信支持用时注入(分包异步化)
export interface IPlaceholderComponentPlugin {
  name: string;
  generateBundle(_options: any, bundle: any): void;
}
