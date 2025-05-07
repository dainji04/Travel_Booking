<script setup lang="ts">
import {ref} from 'vue';
import {Dayjs} from 'dayjs';
import ProgressBarCheckOut from "@/components/ProgressBarCheckOut.vue";

const date = ref<Date>();

const value = ref<Dayjs>();
const onPanelChange = (value: Dayjs, mode: string) => {
  console.log(value);
};

const onSelect = (date: any, {source}: any) => {
  if (source === 'date') {
    date.value = date.format('YYYY-MM-DD');
  }
};
</script>

<template>
  <div class="overlay"></div>
  <div class="checkout-popup">
    <ProgressBarCheckOut/>
    <div class="container">
      <div class="container--left">
        <div class="nav">
          <div class="date nav-item">
            <img src="@/assets/fonts/calendar-black.svg" alt="calendar">
            <h3>Date & Time</h3>
          </div>
          <img src="@/assets/fonts/arrow-right.svg" alt="arrow-right">
          <div class="quantity nav-item">
            <img src="@/assets/fonts/people.svg" alt="people">
            <h3>Quantity</h3>
          </div>
        </div>
        <div class="body">
          <div :style="{ width: '500px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
            <a-calendar @select="onSelect" v-model:value="value" :fullscreen="false" @panelChange="onPanelChange"/>
          </div>
          <button class="button-primary button-continue">Continue</button>
        </div>
      </div>
      <div class="container--right">
        <p class="title">tour set information</p>
        <h1 class="name subheading">Ha Noi - Capital of Vietnam</h1>
        <h1 class="heading date">Starting date: may 1, 2025</h1>
        <hr>
        <p class="desc">tourist</p>
        <hr>
        <p class="total">TOTAL: 0đ</p>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.container {
  display: grid;
  grid-template-columns: 2fr 1fr;

  &--left {
    height: 100%;
    border-right: 1px solid $color--black;
  }

  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    height: 100%;

    .button-continue {
      padding: 5px 35px;
      border-radius: 10px;
    }
  }

  &--right {
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .title {
      color: $color--black;
      font-size: 25px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: uppercase;
    }

    .name {
      font-size: 24px;
      font-weight: bold;
      text-align: start;
    }

    .date {
      font-size: 20px;
      font-weight: bold;
      text-align: start;
    }

    .desc {
      font-size: 20px;
      font-weight: bold;
      text-align: start;
      text-transform: uppercase;
    }

    .total {
      color: $color--black;
      text-align: end;
      font-size: 25px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
  }
}

.checkout-popup {
  height: auto;
  width: 60%;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 50px 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: auto;

  .nav {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    padding-bottom: 30px;
    border-bottom: 1px solid $color--black;

    &-item {
      display: flex;
      justify-items: center;
      align-items: center;
      gap: 10px;

      img {
        width: 24px;
        height: 24px;
      }

      h3 {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
    }
  }
}
</style>