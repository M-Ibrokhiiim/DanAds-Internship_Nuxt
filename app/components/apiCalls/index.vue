<script setup>
const products = await $fetch('/greating')
console.log('Call1:',products)

const {data:products2, pending, error } = await useFetch('/greating')
console.log('Call2:',products2.value.data.products)

const {data, pending:waiting, error:caution} = await useAsyncData('products', async() => {
    return await fetch('/greating')
})

console.log('Call3:',data.value)
</script>
<template>
    <span></span>
</template>