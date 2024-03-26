<script setup lang="ts">
import { type Component } from 'vue'
import { RoutePath, RouteName } from '@/shared/types/routes'
import Church from '../icons/Church.vue'
import Lamp from '../icons/Lamp.vue'
import Location from '../icons/Location.vue'

const routes: { name: RouteName; route: RoutePath; icon: Component }[] = [
  {
    name: RouteName.MAP,
    route: RoutePath.MAP,
    icon: Location
  },
  {
    name: RouteName.NOW,
    route: RoutePath.NOW,
    icon: Church
  },
  {
    name: RouteName.SUGGESTIONS,
    route: RoutePath.SUGGESTIONS,
    icon: Lamp
  }
]
</script>
<template>
  <div class="layout">
    <header>
      <img src="/logo2.png" alt="logo" />
      <h1>{{ $route.name }}</h1>
    </header>
    <div class="content">
      <slot />
    </div>
    <div class="menu">
      <div
        :class="[
          'menu-item',
          { 'menu-item--main': route.name === RouteName.NOW },
          { 'menu-item--selected': $route.path === route.route }
        ]"
        v-for="route in routes"
        :key="route.name"
      >
        <router-link :to="route.route">
          <component class="menu-item__icon" :is="route.icon" />
          {{ route.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  background-color: var(--green);
  height: var(--header-height);
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--white);
}

header img {
  height: 3rem;
  background-color: var(--white);
  border-radius: 50%;
}

header h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

header,
footer {
  padding: 1rem;
}

.content {
  flex: 1;
}

.menu {
  background-color: var(--green);
  height: var(--footer-height);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
  border-radius: 1rem 1rem 0 0;
  color: var(--white);
  box-shadow: -1px -5px 5px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 99999;
}

.menu-item {
  width: 3rem;
  height: 3rem;
}

.menu-item a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--white);
}

.menu-item__icon {
  width: 1.5rem;
  height: 1.5rem;
}

.menu-item__icon {
  fill: var(--white);
}

.menu-item--main {
  background-color: var(--yellow);
  border-radius: 0.5rem;
  position: absolute;
  top: -1rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
}

.menu-item--main a {
  color: var(--white);
}

.menu-item--main .menu-item__icon {
  fill: var(--white);
}

.menu-item--selected a {
  border-bottom: 2px solid var(--white);
}
</style>
