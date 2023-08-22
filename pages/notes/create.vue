<template>
    <VeeForm class="py-2" as="div" v-slot="{ handleSubmit }" :validation-schema="schema">
        <form @submit="handleSubmit($event, createEvent)">
            <div class="mb-3">
                <label for="summary" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Summary</label>
                <VeeField name="summary" type="text" id="summary"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com" />
                <ErrorMessage name="summary" class="invalid-msg" />
            </div>

            <div class="mb-3">
                <label for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <!-- <VeeField name="description" type="text" id="description"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com" /> -->

                <VeeField as="textarea" name="description" cols="30" rows="10" id="description"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com" />

                <!-- <textarea name="description"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    cols="30" rows="10"></textarea> -->
                <ErrorMessage name="description" class="invalid-msg" />
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="start-event" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                        Event</label>
                    <VeeField id="start-event" name="start.dateTime" type="datetime-local"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com" />
                    <ErrorMessage name="start.dateTime" class="invalid-msg" />
                </div>

                <div class="mb-2">
                    <label for="end-event" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                        Time</label>
                    <VeeField id="end-event" name="start.endTime" type="datetime-local"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com" />
                    <ErrorMessage name="start.endTime" class="invalid-msg" />
                </div>
            </div>

            <button class="p-2 bg-blue-500 dark:bg-blue-700 rounded-md" type="submit">Submit</button>
        </form>
    </VeeForm>
</template>


<script setup>
import { Form as VeeForm, ErrorMessage, Field as VeeField } from 'vee-validate';
import * as yup from 'yup'

const supabase = useSupabaseAuthClient()

const { data } = await supabase.auth.getSession()


const schema = yup.object({
    summary: yup.string().required(), description: yup.string(),
    start: yup.object({
        dateTime: yup.date().required().label("Start Time"),
        endTime: yup.date().required().label("End Time")
    })
})


async function createEvent({ start, ...values }, { setErrors }) {
    const event = {
        start: {
            dateTime: new Date(start.dateTime).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
            dateTime: new Date(start.endTime).toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        ...values
    }


    try {
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${data.session?.provider_token}`
            },
            body: JSON.stringify(event)
        }).then(data => data.json())

    } catch (error) {
        setErrors('apiError', error.message)
    }


    return navigateTo('/notes')

}



useHead({ title: "Create Notes" })
definePageMeta({ layout: 'notes-layout' })

</script>