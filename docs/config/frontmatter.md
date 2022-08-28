# FrontMatter

FrontMatter 是指在 **.md** 正文顶部的配置部分，FrontMatter 均以 [YAML](https://en.wikipedia.org/wiki/YAML) 语法进行编写。FrontMatter 部分将只作为该文档的配置项，**不会当做正文展示出来**。

```md
---
title: 标题内容
order: 0
group:
  title: Components
---

## 正文标题

正文内容
```

## title

- **类型：**`string`
- **默认：** 根据文件名及文件路径自动生成

当前文档的标题，也将会被用作左侧菜单


## order

- **类型：**`number`
- **默认：** 根据 `title` 的首字母排序

菜单导航顺序，数值越小排序越靠前

默认情况下 [vitdoc](//vitdocjs.github.io) 是自动获取 `.md` 的文件目录来生成菜单，所以默认采用 `title` 的首字母进行排序，如果你需要更改菜单的顺序，则可以通过控制 `order` 字段来实现

## sidemenu

- **类型：**`boolean`
- **默认：** `true`

是否在侧边栏菜单中显示

## group

控制文档分组，默认通过文件目录进行分组，如果你需要对分组有其他配置，可以使用该配置项。

## group.title

- **类型：**`string`
- **默认：** 根据文件路径自动生成

用于配置侧边栏菜单中的分组名称，如果未配置则会根据文件目录自动生成，例如将 `/components` 转换为 `Components`

## group.order

- **类型：**`number`
- **默认：** 根据 `group.title` 的首字母排序

菜单分组导航顺序，数值越小排序越靠前
