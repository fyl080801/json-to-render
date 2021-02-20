<template>
  <div class="demo-show">
    <!-- mount the demo component -->
    <div class="demo-wrapper">
      <slot name="demo-wrapper"></slot>
    </div>
    <div class="detail-wrapper">
      <!-- description -->
      <div class="description" v-if="$slots.description">
        <slot name="description"></slot>
      </div>
      <!-- highlighted source code -->
      <div class="source-code">
        <!-- options -->
        <options></options>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Options from './Options.vue'
import 'prismjs/themes/prism-tomorrow.css'

export default {
  name: 'DemoShow',
  components: {
    Options,
  },
}
</script>

<style>
.demo-show {
  border: 1px solid #292c36;
  border-radius: 4px;
  overflow: hidden;
}
.demo-wrapper {
  padding: 24px;
}
.detail-wrapper {
  border-top: 1px solid #292c36;
  overflow: hidden;
}
.description {
  overflow: hidden;
  padding: 10px 20px;
  font-size: 16px;
  line-height: 22px;
  color: #666;
  word-break: break-word;
  background-color: #fff;
}
.source-code {
  position: relative;
  background-color: #292c36;
}
.source-code:hover .source-code-options {
  opacity: 1;
}
.content code,
.content .line-number {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  color: #476582;
  padding: 0.25rem 0.5rem;
  margin: 0;
  font-size: 0.85em;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}
.content pre,
.content pre[class*='language-'] {
  line-height: 1.4;
  padding: 1.25rem 1.5rem;
  margin: 0;
  background-color: #292c36;
  border-radius: 6px;
  overflow: auto;
}
.content pre code,
.content pre[class*='language-'] code {
  color: #fff;
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}
div[class*='language-'] {
  position: relative;
  background-color: #292c36;
  border-radius: 6px;
}
div[class*='language-'] .highlight-lines {
  user-select: none;
  padding-top: 1.3rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 1.4;
}
div[class*='language-'] .highlight-lines .highlighted {
  background-color: rgba(0, 0, 0, 0.66);
}
div[class*='language-'] pre,
div[class*='language-'] pre[class*='language-'] {
  background: transparent;
  position: relative;
  z-index: 1;
}
div[class*='language-']::before {
  position: absolute;
  z-index: 3;
  top: 0.8em;
  right: 1em;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}
div[class*='language-']:not(.line-numbers-mode) .line-numbers-wrapper {
  display: none;
}
div[class*='language-'].line-numbers-mode .highlight-lines .highlighted {
  position: relative;
}
div[class*='language-'].line-numbers-mode .highlight-lines .highlighted:before {
  content: ' ';
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
  display: block;
  width: 3.5rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.66);
}
div[class*='language-'].line-numbers-mode pre {
  padding-left: 4.5rem;
  vertical-align: middle;
}
div[class*='language-'].line-numbers-mode .line-numbers-wrapper {
  position: absolute;
  top: 0;
  width: 3.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
  padding: 1.25rem 0;
  line-height: 1.4;
}
div[class*='language-'].line-numbers-mode .line-numbers-wrapper br {
  user-select: none;
}
div[class*='language-'].line-numbers-mode .line-numbers-wrapper .line-number {
  position: relative;
  z-index: 4;
  user-select: none;
  font-size: 0.85em;
}
div[class*='language-'].line-numbers-mode::after {
  content: '';
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 3.5rem;
  height: 100%;
  border-radius: 6px 0 0 6px;
  border-right: 1px solid rgba(0, 0, 0, 0.66);
  background-color: #292c36;
}
div[class~='language-js']:before {
  content: 'js';
}
div[class~='language-ts']:before {
  content: 'ts';
}
div[class~='language-html']:before {
  content: 'html';
}
div[class~='language-md']:before {
  content: 'md';
}
div[class~='language-vue']:before {
  content: 'vue';
}
div[class~='language-css']:before {
  content: 'css';
}
div[class~='language-sass']:before {
  content: 'sass';
}
div[class~='language-scss']:before {
  content: 'scss';
}
div[class~='language-less']:before {
  content: 'less';
}
div[class~='language-stylus']:before {
  content: 'stylus';
}
div[class~='language-go']:before {
  content: 'go';
}
div[class~='language-java']:before {
  content: 'java';
}
div[class~='language-c']:before {
  content: 'c';
}
div[class~='language-sh']:before {
  content: 'sh';
}
div[class~='language-yaml']:before {
  content: 'yaml';
}
div[class~='language-javascript']:before {
  content: 'js';
}
div[class~='language-typescript']:before {
  content: 'ts';
}
div[class~='language-markup']:before {
  content: 'html';
}
div[class~='language-markdown']:before {
  content: 'md';
}
div[class~='language-json']:before {
  content: 'json';
}
div[class~='language-ruby']:before {
  content: 'rb';
}
div[class~='language-python']:before {
  content: 'py';
}
div[class~='language-bash']:before {
  content: 'sh';
}
</style>
