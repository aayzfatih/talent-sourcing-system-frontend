<template>
  <component :is="dynamicComponent" />
</template>
<script setup>
import { computed, defineAsyncComponent } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const dynamicComponent = computed(() => {
  const name = props.name;

  return defineAsyncComponent(() => import(`./icons/${name}.vue`));
});
</script>