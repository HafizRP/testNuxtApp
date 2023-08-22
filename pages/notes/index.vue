<template>
    <div>

        <div class="grid grid-cols-2">
            <div class="my-3">
                <span class="text-lg text-black font-semibold dark:text-white">Events</span>

                <div class="my-2">
                    <ol class="relative border-l border-gray-200 dark:border-gray-700">
                        <li class="mb-10 ml-4" v-for="list in calendarList?.items" v-if="calendarList?.items.length != 0">
                            <div
                                class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                            </div>
                            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{{
                                toLocaleString(list.start.dateTime) }} - {{ toLocaleString(list.end.dateTime) }}</time>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ list.summary }}</h3>
                            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{{ list.description }}
                            </p>
                            <a :href="list.htmlLink" target="_blank"
                                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">See
                                on Calendar <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg></a>
                        </li>

                        <li v-else>
                            No Notes Created <NuxtLink class="text-blue-500" to="/notes/create">Create Here</NuxtLink>
                        </li>
                        <!-- <li class="mb-10 ml-4">
                            <div
                                class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                            </div>
                            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March
                                2022</time>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Marketing UI design in Figma
                            </h3>
                            <p class="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and
                                components are first designed in Figma and we keep a parity between the two versions even as
                                we update the project.</p>
                        </li>
                        <li class="ml-4">
                            <div
                                class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                            </div>
                            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">April
                                2022</time>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">E-Commerce UI code in Tailwind
                                CSS</h3>
                            <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web
                                components and interactive elements built on top of Tailwind CSS.</p>
                        </li> -->
                    </ol>
                </div>
            </div>
        </div>


        <!-- <a href="#"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                alt="notes">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology
                    acquisitions 2021</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology
                    acquisitions of 2021 so far, in reverse chronological order.</p>
            </div>
        </a> -->


        <!-- {{ }} -->


        <div class="fixed bottom-0 py-5">
            <NuxtLink to="/notes/create" class="p-2 rounded-lg bg-blue-500 dark:bg-blue-700">Create Notes On Calendar
            </NuxtLink>
        </div>
    </div>
</template>


<script lang="ts" setup>

import axios from 'axios'
import { EventList } from '@/models/calendarList'

const supabase = useSupabaseClient()

const calendarList = ref<EventList>()

onMounted(async () => {
    const { data: user } = await supabase.auth.getSession()

    calendarList.value = (await axios.get<EventList>("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        params: {
            timeMin: new Date("2023-07-24").toISOString(),
            timeMax: new Date("2023-07-31").toISOString()
        },
        headers: {
            'Authorization': `Bearer ${user.session?.provider_token}`
        }
    })).data

    console.log(calendarList.value)
})


function toLocaleString(date: string) {
    return new Date(date).toLocaleString()
}



useHead({ title: "All Notes", })
definePageMeta({ layout: 'notes-layout', middleware: 'auth' })
</script>