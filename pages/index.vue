<template>
  <div class="container">
    <div>
      <p> {{ greeting }} </p>
    </div>
  </div>
</template>

<script>

export default {
  asyncData(context) {
    return {
      greeting: 'Hello'
    }
  }
}
</script>
