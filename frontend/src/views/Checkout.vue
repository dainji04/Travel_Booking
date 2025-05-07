<script setup lang="ts">
import Pagination from "@/components/Pagination.vue";
</script>

<template>
  <pagination title="Check out" :link="['home', 'checkout']" :pagination="['Homepage', 'Check out']"/>
  <div class="checkout">
    <div class="progress">
      <div class="step1 progress_step">
        <img v-if="false" src="@/assets/fonts/check-circle.svg" alt="check-circle">
        <div v-else class="progress_number">1</div>
        <p>Select Date</p>
      </div>
      <hr class="line active"/>
      <div class="step2 progress_step">
        <img v-if="false" src="@/assets/fonts/check-circle.svg" alt="check-circle">
        <div v-else class="progress_number">2</div>
        <p>Tourist</p>
      </div>
      <hr class="line"/>
      <div class="step3 progress_step">
        <img v-if="false" src="@/assets/fonts/check-circle.svg" alt="check-circle">
        <div v-else class="progress_number">3</div>
        <p>Payment Details</p>
      </div>
      <hr class="line"/>
      <div class="step4 progress_step">
        <img v-if="false" src="@/assets/fonts/check-circle.svg" alt="check-circle">
        <div v-else class="progress_number">4</div>
        <p>Payment</p>
      </div>
    </div>
    <div class="container">

    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/checkout';
</style>