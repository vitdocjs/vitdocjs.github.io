# 介绍

<p align="center" >
    <iframe width="600" height="400" src="//player.bilibili.com/player.html?aid=344892066&bvid=BV1ad4y1A773&cid=815165317&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
</p>


之前，在 “阿里技术” 上发表的[《这一年我的对组件的思考》](https://mp.weixin.qq.com/s/P3pwzn1pmoGzjnS8nVyMgg) 介绍了借助 `TypeScript` AST 语法树解析，对 `React` 组件`Props`类型定义及注释提取，自动生成组件对应 截图、用法、参数说明、README、Demo 等。应用在团队中也取得了较为不错的成功，现在内部组件系统中已经累计使用该方案沉淀 **1000+** 的 React 组件。

![屏幕录制 2020-04-22 下午8.25.59.gif](http://md.xiaobe.top/blog/%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B6%202020-04-22%20%E4%B8%8B%E5%8D%888.25.59.gif)

在 V1 的版本中是借助 `Webpack` + `TypeScript` 虽然主路径上确实解决了组件开发中所遇到的组件管理问题，如：

- 组件无图无真相
- 组件参数文档缺失
- 组件用法文档缺失
- 组件无法索引
- 组件产物不规范

但 `Webpack` 的方案始终还是会让组件开发多一层编译，当一个组件库沉淀超过 300+ 时，引入依赖不断增长，还是会带来组件编译上的负荷导致开发者开发体验下降。

## Vite 带来的曙光

`Vite` 给前端带来的绝对是一次革命性的变化，这么说毫不夸张。

或者应该说是 `Vite` 背后整合的 `esbuild` 、 `Browser es modules`、`HMR`、`Pre-Bundling`等这些社区中关于 `JS` 编译发展的先进工具和思路，在`Vite`这样的整合推动下，给前端开发带来了革命性变化。

任何一个框架或者库的出现最有价值的一定不是它的代码本身，而是这些代码背后所带来的新思路、新启发。

`Vite` 为什么快，主要是 `esbuild`进行`pre-bundles dependencies` + 浏览器`native ESM` 动态编译，这里我不做过多赘述，详细参考：[Vite: The Problems](https://vitejs.dev/guide/why.html#slow-server-start)

![Vite Module Load Way](http://md.xiaobe.top/static/a0df2d87-95b8-7ab7-f906-ba32c42f58e2.png)

在这个思路的背景下，回到我们组件开发的场景再看会发现以下几个问题高度吻合：

1. 组件库开发，实际上不需要编译全部组件。
1. 组件开发，编译预览页面主要给开发者使用，浏览器兼容可控。
1. `HMR(热更新)` 能力在 `Vite` 加持下更加显得立竿见影，是以往组件开发和调试花费时间最多的地方。
1. `Vite` 中一切源码模块动态编译，也就是`TypeScript类型定义` 和 `JS注释` 也可以做到动态编译，大大缩小编译范围。

在 `Vite` 的思路中，完全可以在使用到组件元数据时，再获取其元数据信息，比如加载一个 React 组件为：

```jsx
import ReactComponent from "./component1.tsx";
```

那么加载其元数据即：

```jsx
import ComponentTypeInfo from "./component1.tsx.type";

// or
const ComponentTypeInfoPromise = import("./component1.tsx.type");
```

通过 `Vite` 中的插件能力加载 `.tsx.type` 文件类型，从而做到对应组件元数据的解析。同时借助 `Vite` 本身对于编译依赖收集和 `HMR` 的能力，做到组件类型变化的热更新。

## 设计思路

### 组件 Usage

受到 [dumi](https://d.umijs.org/) 及 [Icework](https://ice.work/) 前辈们的思路，组件 Usage 完全可以以`Markdown` 写文档的形式写到任何一个 `.md` 文件中，由编译器动态解析其中关于`jsx`,`tsx`,`css`,`scss`,`less` 的代码区块，并且把它当做一个虚拟模块编译后，加载进页面中。

这样既是在写文档，又可以运行调试组件不同入参下组件表现情况，组件所需要展示的不同 Case，可以写在不同的区块中交由用户自己选择查看，这个设计思路真是让人拍案叫绝！

最后，如果能结合上述提到 `Vite` 的 `esbuild` , `动态加载` 和 `HMR` 能力，那么整个组件开发体验将会再一次得到质的飞跃。

所以针对`Markdown`文件需要做一个`Vite`插件来执行对`.md`的文件解析和加载，预期要实现的能力如下：

```jsx
import { content, modules } from "./component1/README.md";

// content README.md 的原文内容
// modules 通过解析获得的`jsx`,`tsx`,`css`,`scss`,`less` 运行模块
```

预期设想效果，请点击放大查看

![README.md 设想效果](http://md.xiaobe.top/static/%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B62021-06-06%20%E4%B8%8B%E5%8D%8810.54.14.gif)

### 组件 Runtime

一个常规的组件库目录应该是什么样的？不论是在一个单独的组件仓库，还是在一个已有的业务项目中，其实组件的目录结构大同小异，大致如下：

```
components
├── component1
│   ├── README.md
│   ├── index.scss
│   └── index.tsx
├── component2
│   ├── README.md
│   ├── index.scss
│   └── index.tsx
```

在设想中你可以在任意一个项目中启动组件开发模式，在运行 `vitdoc` 之后应该发生以下几件事情

1. 看到一个专门针对组件开发的界面，根据你的 `.md` 分布自动生成了目录结构
2. `.md` 中的内容则被渲染成一个美观的组件文档页面
3. 其中所编写的代码部分，则被动态渲染成一个组件预览区块
4. 在 `.tsx` 中定义的组件 `interface\type` 则被解析、渲染成为组件的 API 文档
5. 支持实时的热更新

在发布到生产阶段时，则可以：

1. 将组件编译成为 `cjs`,`esm`,`umd` 等格式的产物，这个过程可以参考 [father](https://github.com/umijs/father)
2. 将组件按照调试过程中看到的状态，生成组件文档
3. 对组件做截图，关键数据提取，做更便捷的索引及预览
4. 自动生成 README，加入文档地址 及 截图等信息

### 组件 Props

正如上述内容中提到的，在 `Vite` 中要提取一个组件的类型定义，可以提供一个虚拟模块插件，在组件文档加载过程中按需加载类型定义，并作为模块返回给前端消费。

![TypeScript Interface转换示意](http://md.xiaobe.top/static/c5b9fef5-8f8c-6123-34ab-97c406ad0a54.png)


```jsx
// React Component
import Component from "./component1.tsx";
// React Component Props Interface
import ComponentTypeInfo from "./component1.tsx.type.json";

// or
const ComponentTypeInfoPromise = import("./component1.tsx.type.json");
```

由于这种解析能力并不是借助于 `esbuild` 进行，所以在转换性能上无法和组件主流程编译同步进行。

在请求到该文件类型时，需要考虑在 `Vite` 的 `Serve` 模式下，新开进程进行这部分内容编译，由于整个过程是异步行为，不会影响组件主流程渲染进度。当请求返回响应后，再用于渲染组件 `类型定义` 及 `调试面板` 部分。

在热更新过程中，同样需要考虑到 `tsx` 文件修改范围是否涉及到 `TypeScript` 类型的更改，如果发现修改导致类型变化时，再触发`HMR`事件进行模块更新。

# 总结

`vitdoc` ，其大致的构成就是由`Vite` + `3 Vite Pugins`构成，每个插件相互不耦合，相互职责也不相同，也就是说你可以拿到任意一个`Vite`插件去做别的用途，分别是：

- Markdown，用于解析 `.md` 文件，加载后可获取原文及 `jsx`, `tsx` 等可运行区块
- TypeScript Interface，用于解析 `.tsx` 文件中 `export` 组件的类型定义
- Runtime，用于运行组件开发态，编译最终组件文档

![Vite Comp](http://md.xiaobe.top/static/20c5c4ea-8332-02c8-f090-df3491a3ff77.png!jpg)

所以目前该方案相较于 `Webpack` 相关的组件文档项目，有以下几个优势：

1. 无惧大型组件库，即使有 2000 个组件在同一个项目中，启动依旧是`<1000ms`
2. 高效的组件元数据加载流，项目一切依赖编译按需进行
3. 毫秒级热更新响应，借助 `Vite` 几乎是按下保存的一瞬间，就可以看到改动效果

## 预览体验

### 启动

![Vite Comp 启动](http://md.xiaobe.top/static/%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B62021-06-07%20%E4%B8%8A%E5%8D%881.42.29.gif)

### Markdown 组件文档毫秒级响应

![毫秒级Markdown响应](http://md.xiaobe.top/static/%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B62021-06-07%20%E4%B8%8A%E5%8D%881.58.07.gif)

### TypeScript 类型识别

![TypeScript类型识别](http://md.xiaobe.top/static/%E5%B1%8F%E5%B9%95%E5%BD%95%E5%88%B62021-06-07%20%E4%B8%8A%E5%8D%882.02.21.gif)

