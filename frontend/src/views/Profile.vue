<script setup lang="ts">
import {authStore} from '@/stores/auth';
import Pagination from "@/components/Pagination.vue";
import {onMounted, useTemplateRef} from "vue";

const useAuth = authStore();
const user = useAuth.getUser;
const inputImage = useTemplateRef("input-image");

const clickInputImage = () => {
  inputImage.value?.click();
};

</script>

<template>
  <Pagination title="Profile" :link="['home', 'profile']" :pagination="['Homepage', 'Profile']"/>
  <div class="profile">
    <div class="profile_header">
      <div class="profile_header--left">
        <div class="profile_avatar"></div>
        <h1 class="profile_name">Hello, {{ user?.name }}</h1>
      </div>
      <button class="profile_sign-out button-primary">
        <img src="@/assets/fonts/profile/logout.svg" alt="icon-sign-out">
        Sign Out
      </button>
    </div>
    <div class="container">
      <div class="container--left">
        <div class="container_nav">
          <div class="container_nav--item">
            <button class="container_nav-btn btn active">
              <img class="icon" src="@/assets/fonts/profile/ticket.svg" alt="ticket-icon">
              Tour booked
            </button>
          </div>
          <div class="container_nav--item">
            <button class="container_nav-btn btn">
              <img class="icon" src="@/assets/fonts/user.svg" alt="user-icon">
              account
            </button>
          </div>
        </div>
      </div>
      <div class="container--right">
        <!--tour booked-->
        <div v-if="false" class="tour-booked">
          <h1 class="tour-booked_title">tour booked</h1>
          <p class="tour-booked_desc">Below is a list of tour bookings that have been successfully made.</p>
          <div class="tour-booked_options">
            <div class="nav">
              <button class="nav-btn btn active">Active Booking</button>
              <button class="nav-btn btn">Booking History</button>
            </div>
            <div class="list">
              <div class="list_active active">
                <div class="list_item">
                  <div class="list_item-thumbnail"></div>
                  <div class="list_item-content">
                    <p class="list_item-title">ha noi: capital of vietnam</p>
                    <p class="list_item-departure info">Departure: may, 01, 2025</p>
                    <p class="list_item-booking info">Success</p>
                    <p class="list_item-payment info">Success</p>
                    <p class="list_item-price info">Total: 1,000,000 VND</p>
                    <button class="button-primary detail-btn">View Detail</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="account">
          <h1 class="account_title">Account</h1>
          <p class="account-desc">Edit your account details and password using the form below.</p>
          <div class="account_form">
            <form action="" method="post">
              <div class="form-group">
                <div class="avatar" @click="clickInputImage">
                  <input ref="input-image" type="file" id="avatar" accept="image/*" hidden/>
                </div>
              </div>
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" id="name" placeholder="Enter your name"/>
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email"/>
              </div>
              <div class="form-group">
                <label for="phone">Number</label>
                <input type="number" id="phone" placeholder="Enter your phone"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/profile";
</style>
