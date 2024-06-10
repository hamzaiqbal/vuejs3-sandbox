import { API_URL } from '@/config/api'
import { onMounted, ref, watch } from 'vue'
import { useStore } from './useStore'
import { Jobs, JobsSchema } from '@/types/jobs'
import { ZodError } from 'zod'

export const useJobs = () => {
  const jobs = ref<Jobs>([])
  const loading = ref<boolean>(false)
  const error = ref<ZodError | string>()

  const { jobSearch } = useStore()

  const getSearchParams = () => {
    const urlSearchParams = new URLSearchParams()

    jobSearch.value.types.forEach((type) => {
      urlSearchParams.append('type', type)
    })

    if (jobSearch.value.location) {
      urlSearchParams.append('location', String(jobSearch.value.location))
    }

    urlSearchParams.append(
      'experience_gte',
      String(jobSearch.value.experienceMin)
    )
    urlSearchParams.append(
      'experience_lte',
      String(jobSearch.value.experienceMax)
    )

    urlSearchParams.append('active', String(jobSearch.value.active))

    return urlSearchParams.toString()
  }

  const getJobs = () => {
    loading.value = true
    error.value = undefined

    fetch(`${API_URL}/jobs?${getSearchParams()}`)
      .then(async (response) => {
        jobs.value = JobsSchema.parse(await response.json())
      })
      .catch((e) => {
        console.log(e)
        error.value = e
      })
      .finally(() => {
        loading.value = false
      })
  }

  onMounted(getJobs)
  watch(jobSearch, getJobs)

  return {
    jobs,
    loading,
    error,
  }
}
