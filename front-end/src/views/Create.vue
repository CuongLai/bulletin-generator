<template>
  <div class="create">
    <FrontCoverForm />
  </div>
</template>

<script>
// @ is an alias to /src
import FrontCoverForm from '@/components/FrontCoverForm.vue'

export default {
  name: 'Create',
  components: {
    FrontCoverForm
  }
}
</script>
