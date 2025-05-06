<template>
  <aside :class="{ open: isOpen }" class="sidebar">
    <img src="@/assets/images/admin/logo.png">
    <button @click="$emit('toggle')">Toggle</button>
    <nav>
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Users</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
defineProps(['isOpen'])
</script>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;
.sidebar {
  position: fixed;
  width: 100px;
  height: 100vh;
  background: $color--white;
  color: white;
  transition: transform 0.3s ease;
  padding: 1rem;
  border-right: 1px solid $color--black;
  box-shadow: 0 1rem 1rem rgba(0,0,0,0.1);
  z-index: 1000;

  &.open {
    width: 400px;
  }

  button {
    background: none;
    border: 1px solid $color--white;
    color: #fff;
    padding: 5px;
    margin-bottom: 1rem;
    cursor: pointer;
  }

  nav ul {
    list-style: none;
    padding: 0;

    li {
      margin: 0.5rem 0;

      a {
        color: white;
        text-decoration: none;
      }
    }
  }
}
</style>
