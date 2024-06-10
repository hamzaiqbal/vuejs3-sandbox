<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'article',
})
</script>

<template>
  <Primitive :as="as" :class="cn(
    'rounded-lg border bg-card text-card-foreground shadow-sm',
    props.class,
  )
    ">
    <slot />
  </Primitive>
</template>
