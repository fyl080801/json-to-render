# Json to Render

[![Build Status](https://travis-ci.org/fyl080801/json-to-render.svg?branch=master)](https://travis-ci.org/fyl080801/json-to-render)

将 json 数据渲染成界面的 vue 组件库，是根据 [vjform 动态表单](https://github.com/fyl080801/vjform)、[jformer 动态表单](https://github.com/fyl080801/jformer) 以及[vjdesign 设计器](https://github.com/fyl080801/vjdesign) 相关项目开发的 vue3 版本

## 特性

- 将 json 数据渲染成界面
- 基于 vue3 开发
- 支持任何 html 组件和 vue 项目中引用的组件进行渲染，支持组件任何属性
- 支持将 json 数据特殊对象转换成数据关联关系实现联动
- 支持二次开发 json 属性解析方式、数据交互来源与渲染逻辑

## 快速上手

使用 npm 安装

```bash
npm i @json2render/vue-full
```

实现一个简单示例

main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import JRender from '@json2render/vue-full'

createApp(App).use(JRender).mount('#app')
```

App.vue

```vue
<template>
  <div>
    <v-jrender v-model="model" :fields="fields" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {
      model: { text1: 'Hello world!!' },
      fields: [
        { component: 'p', text: '$:model.text1' },
        { component: 'input', value: 'model.text1' },
      ],
    }
  },
})
</script>
```

## 示例

示例 1: [简单示例](http://jsrun.net/2PaKp)

示例 2: [Element 组件](http://jsrun.net/8PaKp)

## 说明

### 渲染组件

一般的定义形式如下

```html
<v-jrender
  v-model="model"
  :fields="fields"
  :datasource="datasource"
  :listeners="listeners"
  @setup="onsetup"
/>
```

- v-model: 数据
- fields: 组件集合
- datasource: 自定义数据源集合
- listeners: 监听集合
- setup: setup 事件

### 组件定义

组件定义包括 `component` `props` `children` 三个基本属性

- component: 组件类型名，只要 html 标签或是项目中引用的组件都可以作为类型名
- props: 组件的属性，vue3.0 中组件属性、html 属性、事件的定义可以直接定义到一个对象里
- children: 组件嵌套的下级组件集合

### 组件属性代理

组件定义会被转换成代理对象，组件属性值如果是符合特定的表达式则在运行时会被转换成真实逻辑

### 渲染钩子

在组件被渲染之前会触发传渲染钩子行为，可在渲染之前改变组件的属性，有两个钩子执行的时机

- prerender: 相当于组件 setup 阶段，如果组件定义不被改变则只会执行一次
- render: 相当于每次渲染之前都会被执行

### 数据源

数据源就是数据的来源，可在组件属性表达式里使用的数据，默认支持 `model` `scope` `arguments` `refs` 这几种数据来源

- model: 通过 v-model 传递过来的数据
- scope: 当前组件渲染时候由父级数据传递过来的当前数据成员，相当于 scoped-slot
- arguments: 如果当前属性表达式是一个函数，则 arguments 就是函数接收的参数数组
- refs: 如果在组件的 props 里设置 ref 属性，则可以通过 refs 获取组件的实例

除了以上几种数据源外，还支持自定义数据源

### 扩展行为

支持扩展组件属性代理行为、渲染钩子、数据源，实现自定义渲染规则

## 相关链接

[使用文档](https://fyl080801.github.io/json-to-render/) 完善中...

## 关于

- 基于 vue2.0 的 vjdesign 设计器定义的配置是否能在这里使用

因为基于 vue2.0 的组件如果不做特殊适配基本上不能在 vue3.0 使用因此不能兼容，但是如果组件库 vue2.0 的属性和 vue3.0 的属性一致，则可以使用自定义渲染钩子将组件属性转换成适用于 vue3.0 的定义实现兼容
