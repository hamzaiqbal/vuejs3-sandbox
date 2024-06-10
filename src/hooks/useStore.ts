import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'
import { useCountries } from './useCountries'
import { JobSearch, jobSearchDefault } from '@/types/jobs'

export const useStore = createGlobalState(() => {
  const { countries } = useCountries()

  const jobSearch = ref<JobSearch>(jobSearchDefault)

  return { countries, jobSearch }
})
