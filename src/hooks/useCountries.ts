import { API_URL } from '@/config/api'
import { Countries, countriesSchema } from '@/types/countries'
import { onMounted, ref } from 'vue'

export const useCountries = () => {
  const countries = ref<Countries>({})
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  onMounted(() => {
    loading.value = true

    fetch(`${API_URL}/countries`)
      .then(async (response) => {
        const fetchedCountries = countriesSchema.parse(await response.json())
        countries.value = fetchedCountries
      })
      .catch((e) => {
        error.value = e
      })
      .finally(() => {
        loading.value = false
      })
  })

  return {
    countries,
    loading,
    error,
  }
}
