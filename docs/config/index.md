# 配置项

在项目根目录创建 `.vitdocrc.ts` 文件，可对 vitdoc 进行配置：

```ts
// 配置文件
export default defineConfig({
  // 具体配置项
});
```

目前支持以下配置项

## logo

- **类型：**`string`
- **默认值：** vtidoc 的 LOGO

配置文档的 LOGO

## appendHtml

- **类型：**`string`
- **默认值：** `null`

文档模板扩展，可加入部分定制化脚本或 `external`

如果是本地文件，直接使用根目录相对路径即可，如 `./footer.html`
