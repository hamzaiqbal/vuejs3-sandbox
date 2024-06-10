<script setup lang="ts">
import { useStore } from '@/hooks/useStore';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Switch,
} from '@/components/ui/switch'
import {
	NumberField,
	NumberFieldContent,
	NumberFieldDecrement,
	NumberFieldIncrement,
	NumberFieldInput,
} from '@/components/ui/number-field'

import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate';
import { X } from 'lucide-vue-next';
import { JobSearchSchema, JobTypeSchema } from '@/types/jobs';

import { type i18n } from '@/types/i18n';
import { useI18n } from 'vue-i18n';

const { t } = useI18n<i18n>()

const { countries, jobSearch } = useStore();

const formSchema = toTypedSchema(JobSearchSchema)

const { handleSubmit, setFieldValue, resetForm } = useForm({
	validationSchema: formSchema,
	initialValues: jobSearch.value
})

const onSubmit = handleSubmit((values) => {
	jobSearch.value = values;
})

</script>

<template>

	<Card as="form" novalidate @submit.prevent="onSubmit"
		class="w-2/3 m-auto bg-gray-100">
		<CardHeader>
			<CardTitle as="h2">{{ t('searchForm.title') }}</CardTitle>
		</CardHeader>

		<CardContent class="flex flex-col gap-6">
			<FormField v-slot="{ componentField }" name="types">
				<FormItem class="form-item-inline">
					<FormLabel class="align-top">{{ t('searchForm.type') }}</FormLabel>

					<div class="form-control">
						<div class="grid grid-cols-3 gap-6">
							<FormField v-for="jobType in JobTypeSchema.options"
								v-slot="{ value, handleChange }" :key="jobType" type="checkbox"
								:value="jobType" :unchecked-value="false" name="types">
								<FormItem class="flex flex-row gap-2 space-y-0">
									<FormControl>
										<Checkbox :checked="value.includes(jobType)"
											@update:checked="handleChange" />
									</FormControl>
									<FormLabel class="font-normal">
										{{ t(`jobTypes.${jobType}`) }}
									</FormLabel>
								</FormItem>

							</FormField>
						</div>
						<FormMessage />
					</div>
				</FormItem>
			</FormField>

			<FormField v-slot="{ componentField }" name="location">
				<FormItem class="form-item-inline">
					<FormLabel>{{ t('searchForm.location') }}</FormLabel>

					<div class="form-control flex flex-row gap-2">
						<FormControl>
							<Select v-bind="componentField">
								<SelectTrigger>
									<SelectValue placeholder="Select a country" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem v-for="(countryName, countryCode) in countries"
											:key="countryCode" :value="countryCode">
											{{ countryName }}
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</FormControl>

						<Button :aria-label="t('actions.reset')" type="button"
							variant="ghost" size="icon"
							@click.prevent="() => { setFieldValue('location', '') }">
							<X />
						</Button>
					</div>
				</FormItem>
				<FormMessage />
			</FormField>

			<FormField v-slot="{ value, setValue }" name="experienceMin">
				<FormItem class="form-item-inline">
					<FormLabel>{{ t('searchForm.experienceMin') }}</FormLabel>

					<div class="form-control">
						<NumberField class="w-32" :model-value="value" :min="0" :max="9"
							@update:model-value="(v) => {
								if (typeof (v) === 'number') {
									setValue(v)
									return;
								}
								setValue(undefined)
							}">
							<NumberFieldContent>
								<NumberFieldDecrement />
								<NumberFieldInput />
								<NumberFieldIncrement />
							</NumberFieldContent>
						</NumberField>
						<FormMessage />
					</div>
				</FormItem>
			</FormField>

			<FormField v-slot="{ value, setValue }" name="experienceMax">
				<FormItem class="form-item-inline">
					<FormLabel>{{ t('searchForm.experienceMax') }}</FormLabel>
					<div class="form-control">
						<NumberField class="w-32" :model-value="value" :min="1" :max="10"
							@update:model-value="(v) => {
								if (typeof (v) === 'number') {
									setValue(v)
									return;
								}
								setValue(undefined)
							}">
							<NumberFieldContent>
								<NumberFieldDecrement />
								<NumberFieldInput />
								<NumberFieldIncrement />
							</NumberFieldContent>
						</NumberField>
						<FormMessage />
					</div>
				</FormItem>
			</FormField>

			<FormField v-slot="{ value, handleChange }" name="active">
				<FormItem class="form-item-inline">
					<FormLabel>{{ t('searchForm.onlyActive') }}</FormLabel>
					<div class="form-control">
						<FormControl>
							<Switch :checked="value" @update:checked="handleChange" />
						</FormControl>
					</div>
					<FormMessage />
				</FormItem>
			</FormField>

		</CardContent>

		<CardFooter class="flex flex-row justify-end gap-5">
			<div>
				<Button type="reset" size="lg" variant="link"
					@click.prevent="resetForm">
					{{ t('actions.reset') }}
				</Button>

				<Button type="submit" size="lg">
					{{ t('actions.search') }}
				</Button>
			</div>
		</CardFooter>
	</Card>


</template>

<style scoped></style>
