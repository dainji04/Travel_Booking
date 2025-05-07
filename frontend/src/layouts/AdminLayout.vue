<template>
  <div class="admin-layout">
    <Sidebar :isOpen="menuOpen" @toggle="menuOpen = !menuOpen" />
    <main class="content">
      <Header/>
      <router-view/>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from "@/components/admin/Header.vue";
import Sidebar from '@/components/admin/Sidebar.vue'

const menuOpen = ref(true)
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables" as *;
.admin-layout {
  display: flex;

  .content {
    background-color: $bg-white;
    margin-left: 400px;
    margin-top: 50px;
    flex: 1;
    padding: 0 1rem;
  }
}
</style>
