<script setup lang="ts">
import { useStore } from '@/hooks/useStore';
import { useJobs } from '@/hooks/useJobs';

import { type i18n } from '@/types/i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<i18n>()
const { jobs, loading, error } = useJobs();
const { countries } = useStore();

</script>

<template>

	<h2 class="text-2xl font-semibold leading-none tracking-tight mb-4">{{
		t('searchResults.title', { count: jobs.length }) }}</h2>



	{{ loading }}
	{{ error }}

	<ul v-if="jobs.length">
		<li v-for="job in jobs" :key="job.id">
			<h3>{{ t(`jobTypes.${job.type}`) }}</h3>
			{{ job.company }}
			{{ job.contact }}
			{{ job.date }}
			{{ job.experience }}
			{{ countries[job.location] }}
			{{ job.skills }}
		</li>
	</ul>
</template>

<style scoped></style>
