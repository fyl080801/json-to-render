<template>
  <ul class="source-code-options">
    <li class="codepen" title="Open in CodePen"></li>
    <li class="codesandbox" title="Open in CodeSandBox"></li>
    <li class="copy" title="Copy to clipboard"></li>
    <li class="download" title="Download as picture"></li>
  </ul>
</template>

<script>
import tippy from 'tippy.js'

export default {
  name: 'SourceCodeOptions',
  mounted() {
    tippy('.source-code-options li')
  },
}
</script>

<style>
.source-code-options {
  position: absolute;
  display: flex;
  margin: 0;
  padding: 0;
  bottom: 0.8rem;
  right: 1rem;
  z-index: 3;
  opacity: 0;
  transition: 0.2s;
}
.source-code-options li {
  margin: 0;
  padding: 0;
  width: 20px;
  height: 20px;
  margin-left: 8px;
  list-style: none;
  cursor: pointer;
  transition: 0.2s;
}
.source-code-options li:hover {
  transform: scale(1.1);
}
.source-code-options li.codepen {
  background: url('./imgs/codepen.svg') no-repeat center;
  background-size: cover;
}
.source-code-options li.codesandbox {
  background: url('./imgs/codesandbox.svg') no-repeat center;
  background-size: cover;
}
.source-code-options li.copy {
  height: 22px;
  width: 22px;
  margin-top: -1px;
  background: url('./imgs/copy.svg') no-repeat center;
  background-size: cover;
}
</style>
