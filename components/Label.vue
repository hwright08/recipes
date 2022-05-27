<template>
<div class="mt-2">
  <label v-bind="$attrs" class="font-weight-bold">
    <template v-if="required">
      <span class="red--text">* </span>
    </template>
    <slot></slot>
  </label>
</div>
</template>

<script>
export default {
  name: 'Label',

  props: {
    required: { type: Boolean, default: false }
  }
}
</script>
