<script setup lang="ts">
import Header from '@/components/Header.vue'
import Button from '@/components/ui/button/Button.vue';

import { type i18n } from '@/types/i18n';
import { useI18n } from 'vue-i18n';

const { availableLocales, locale: currentLocale } = useI18n<i18n>()
</script>

<template>
  <ul class="layout-language">
    <li v-for="locale in availableLocales" :key="`locale-${locale}`">
      <Button @click.prevent="() => currentLocale = locale"
        :class="{ active: currentLocale === locale }" size="xs"
        variant="link">{{ locale
        }}</Button>
    </li>
  </ul>

  <main class="container pb-10">
    <Header />
    <router-view />
  </main>
</template>

<style scoped>
.layout-language {
  @apply bg-gray-950 flex justify-end gap-1 px-2;

  button {
    @apply text-white uppercase;

    &:not(.active) {
      @apply opacity-70;
    }

    &.active {
      @apply underline;
    }
  }
}
</style>
