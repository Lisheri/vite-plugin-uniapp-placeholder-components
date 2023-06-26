# uniapp集成字节小程序提供的插件库

## 环境

uniapp + vite + vue3

## 使用

> 注: 需要配合[按需注入](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/lazyload.html)使用

```ts
plugins: [
    ...
    // 所有使用分包组件的位置自动占位(可直接传递数组参数, 默认view占位)
    UniappPlaceholderComponent(['tst-async-package-comp'])
    // 按需使用用时注入
    UniappPlaceholderComponent({
      // 按需用时注入优先级更高, 可以替换占位组件
      'pages/index/index': { 'tst-async-package-comp': 'view' },
      'packages2/index/index': { 'tst-async-package-comp': 'view' }
    }, 
    // 自动用时注入
    ['tst-async-package-comp1'])
  ],
```
## 说明

> ! 仅支持微信
