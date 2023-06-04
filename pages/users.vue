<template>
    <header>
        <Navbar />
    </header>

    <section id="body" class="container mx-auto px-4">
        <VeeForm :validation-schema="schema" as="div" v-slot="{ errors, handleSubmit, isSubmitting }">
            <form @submit="handleSubmit($event, createUser)">
                <div class="mb-2">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <Field name="email" type="email" id="email" placeholder="E-Mail"
                        :class="[{ 'border-red-700': typeof errors.email !== 'undefined' }, 'bg-gray-50 border border-gray-300  border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white']" />
                    <ErrorMessage class="invalid-msg" name="email" />
                </div>
                <div class="mb-2">
                    <label for="username"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <Field name="username" type="text" id="username" placeholder="Username"
                        :class="[{ 'border-red-700': typeof errors.username !== 'undefined' }, 'bg-gray-50 border border-gray-300  border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white']" />
                    <ErrorMessage class="invalid-msg" name="username" />
                </div>
                <div class="mb-2">
                    <label for="password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <Field name="password" type="password" id="password" placeholder="Password"
                        :class="[{ 'border-red-700': typeof errors.password !== 'undefined' }, 'bg-gray-50 border border-gray-300  border-2 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white']" />
                    <ErrorMessage class="invalid-msg" name="password" />
                </div>

                <button type="submit" :disabled="isSubmitting"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                </button>
            </form>
        </VeeForm>



        <div class="mt-10 pb-10" id="users">
            <div id="user-button">
                <button class="bg-blue-600 px-6 py-2 text-white rounded-md" @click="refresh()">Refresh</button>
            </div>
            <div class="relative overflow-x-auto" v-if="!pending">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 text-center">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                E-Mail
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(user, i) in users"
                            :key="i">
                            <th scope="row" class="px-6 py-4">
                                {{ user.email }}
                            </th>
                            <td class="px-6 py-4">
                                {{ user.username }}
                            </td>
                            <td class="px-6 py-4">
                                {{ dateFormat(user.createdAt) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="w-100" role="status" v-else>
                <svg aria-hidden="true" class="w-8 h-8 mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import * as yup from "yup";
import { Form as VeeForm, Field, ErrorMessage } from "vee-validate";

const { data: users, refresh, pending } = await useFetch('/api/users', { lazy: true })

const schema = yup.object({
    email: yup.string().email().required().test({
        name: 'is-available', skipAbsent: true, test(value, ctx) {
            const user = users.value?.find(v => v.email === value)
            if (user !== undefined) {
                return ctx.createError({ message: "Email has already used!" })
            }
            return true
        }
    }),
    password: yup.string().min(8).required(),
    username: yup.string().min(8).required(),
});

function dateFormat(date: string) {
    return new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: "2-digit", minute: '2-digit' }).format(new Date(date))
}

async function createUser(values: any) {
    try {
        await useFetch('/api/auth/register', {
            method: 'post', body: values
        })
    } catch (error) {
        alert(error)
    }

}

useHead({
    title: "Users Page",
});

definePageMeta({ middleware: "auth" })
</script>

<style scoped></style>
