<script setup lang="ts">
import { type i18n } from '@/types/i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<i18n>()
</script>

<template>
	<header class="layout-header">
		<h1 class="layout-header-title">
			{{ t('app.name') }}
		</h1>

		<nav class="layout-nav">
			<ul>
				<li>
					<router-link to="/">{{ t('actions.search') }}</router-link>
				</li>
				<li>
					<router-link to="/create">{{ t('actions.create') }}</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style scoped>
.layout-header {
	@apply text-center py-10 flex flex-col gap-5;
}

.layout-header-title {
	@apply text-5xl font-bold;
}

.layout-nav {
	ul {
		@apply flex justify-center gap-5 font-medium;
	}

	a {
		@apply flex py-1 px-3 rounded-sm hover:bg-gray-200 focus:bg-gray-200;

		&.router-link-active {
			@apply bg-gray-500 text-primary-foreground;
		}
	}
}
</style>
