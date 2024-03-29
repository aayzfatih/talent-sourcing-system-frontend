<template>
    <svg
        :class="props?.class"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
    >
        <path
            :class="props?.class"
            d="M4 7H20M6.99994 12H16.9999M10.9999 17H12.9999"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<script setup>
const props = defineProps({
    class: {
        type: String,
        default: "w-6 h-6 text-gray-400",
    },
});
</script>
