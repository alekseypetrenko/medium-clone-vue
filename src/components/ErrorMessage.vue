<template>
  <div>
    <div>{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: 'McvErrorMessage',
  props: {
    error: {
      type: String,
      required: false,
      default: 'Something went wrong'
    }
  }
};
</script>

<style></style>
