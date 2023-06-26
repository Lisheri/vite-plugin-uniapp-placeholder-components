import { Options, IPlaceholderComponentPlugin } from './types';

// 插件本体
function UniappPlaceholderComponent(options: Array<string>, normalComponents?: unknown): IPlaceholderComponentPlugin;
function UniappPlaceholderComponent(options: Options, normalComponents?: Array<string>): IPlaceholderComponentPlugin;

function UniappPlaceholderComponent(
  options: Options | Array<string>,
  normalComponents: unknown
): IPlaceholderComponentPlugin {
  const platform = 'wx';
  // 处理参数差异
  if (Array.isArray(options) && !normalComponents) {
    normalComponents = options;
    options = {};
  }
  options = Object.keys(options).reduce((prev: Options, item: string) => {
    return {
      ...prev,
      [`${item}.json`]: (options as Options)[item],
      [`${item}.${platform}ml`]: (options as Options)[item]
    };
  }, {});
  const name: string = 'vite-plugin-vue-uniapp-placeholder-component';
  return {
    name,
    // 在文件写入结束时调用
    generateBundle(_options: any, bundle: any) {
      Object.keys(bundle).forEach((bundleName) => {
        const currentBundle = bundle[bundleName];
        if (bundleName.includes('json')) {
          // 通用注册配置
          const currentJson = JSON.parse(currentBundle?.source || '{}');
          if (Object.keys(currentJson)) {
            const usingComponentsOptions = currentJson.usingComponents || {};
            const keys = Object.keys(usingComponentsOptions);
            if (keys.length) {
              (normalComponents as Array<string>).forEach((componentKey) => {
                if (keys.includes(componentKey)) {
                  // 默认使用 view 占位, 如需替换请使用第一个参数
                  currentJson.componentPlaceholder = {
                    ...(currentJson.componentPlaceholder || {}),
                    [componentKey]: 'view'
                  };
                }
              });
            }
            currentBundle.source = JSON.stringify(currentJson);
          }
        }
        if (Object.keys(options).includes(bundleName)) {
          // 定制配置注册
          if (bundleName.includes('json')) {
            // 处理配置文件
            const componentPlaceholderOption = (options as Options)[bundleName];
            const appJson = JSON.parse(currentBundle.source);
            appJson.componentPlaceholder = {
              ...(appJson.componentPlaceholder || {}),
              ...componentPlaceholderOption
            };
            currentBundle.source = JSON.stringify(appJson);
          }
        }
      });
    }
  };
}
export default UniappPlaceholderComponent;
