<script setup lang="ts">

</script>

<template>
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
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.progress {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;

  .line {
    width: 80px;
    height: 4px;
    background-color: $color-line;
    outline: none;
    border: none;

    &.active {
      background-color: $color-primary;
    }
  }

  &_step {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &_number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: $color-primary;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
  }

  p {
    color: $color--black;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-transform: uppercase;
  }
}
</style>