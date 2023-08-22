<template>
    {{ $route.params }}
</template>


<script setup>
import axios from 'axios'

const supabase = useSupabaseAuthClient()
const route = useRoute()
const { data: user } = await supabase.auth.getSession()


const { data: calendar } = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${route.params.calendarId}`, {
    headers: {
        "Authorization": `Bearer ${user.session?.provider_token}`
    }
})

console.log(calendar)

useHead({ title: "Calendar Event" })
definePageMeta({ layout: 'notes-layout' })
</script>