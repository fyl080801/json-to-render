<template>
  <div class="about">
    <v-jrender v-model="model" :fields="fields" class="j-form"></v-jrender>
    <hr />
    <p>{{ JSON.stringify(model) }}</p>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    return {
      model: reactive({}),
      fields: [],
      // fields: [
      //   {
      //     type: 'object',
      //     properties: {
      //       name: { type: 'string' },
      //       age: { type: 'number' },
      //       ages: { type: 'number' },
      //       age2: { type: 'number' },
      //       subobject: {
      //         type: 'object',
      //         properties: {
      //           sub1: { type: 'string' },
      //           sub2: { type: 'string' },
      //           sub3: { type: 'number' },
      //           subsub: {
      //             type: 'object',
      //             properties: {
      //               ss1: { type: 'string' },
      //               ss2: { type: 'string' }
      //             }
      //           }
      //         }
      //       },
      //       agaae: { type: 'string' },
      //       agasdse: { type: 'number' },
      //       agasde: { type: 'number' }
      //     }
      //   }
      // ]
    }
  },
})
</script>
