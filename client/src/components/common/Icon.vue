<template>
    <span class="icon-wrap" @click="handleClick">
        <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${type}`"></use>
        </svg>
    </span>
</template>

<script>
    export default {
        name: "Icon",
        props: ["type"],
        methods: {
            handleClick() {
                this.$emit("click")
            }
        }
    }
</script>

<style lang="scss">
.icon {

}
</style>
