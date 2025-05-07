<script setup lang="ts">
import bar from '@/assets/fonts/admin/bar.svg';
</script>

<template>

  <header>
    <div class="navbar">
      <div class="navbar__menu">
        <img :src="bar" alt="menu" class="navbar__menu-icon icon" @click="$emit('toggle')" />
      </div>
      <div class="navbar__search"></div>
      <div class="navbar__user"></div>
    </div>
  </header>

</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: $color--white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  margin-left: 400px;
}
.icon {
  width: 32px;
  height: 32px;
}
</style>