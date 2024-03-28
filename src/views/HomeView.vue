<script setup lang="ts">
import ShareFromSquare from '@/components/icons/ShareFromSquareSolid.vue'
import { useLocations } from '@/stores/locations'
import { computed } from 'vue'

const locations = useLocations()

const userHour = new Date().getHours()
const userWeekday = new Date().getDay()

const nextHourLocationList = computed(() => {
  return locations.locations.filter((location) => {
    if (userWeekday === 0) {
      if (location.Dominical === undefined) return false
      return location.Dominical.includes(userHour.toString())
    }
    if (userWeekday === 6) {
      if (location.Saturday_late === undefined) return false
      if (location.Saturday_late === undefined) return false
      return (
        location.Saturday_late.includes(userHour.toString()) ||
        location.Saturday_morning.includes(userHour.toString())
      )
    }

    return location.weekdays.includes(userHour.toString())
  })
})
</script>

<template>
  <main>
    <div class="cards">
      <div class="card" v-for="(location, index) in nextHourLocationList" :key="index">
        <h3>{{ location.name }}</h3>
        <p class="card__address">
          <b> Morada: </b>
          <a :href="`https://www.google.com/maps?q=${location.name}`" target="_blank">
            {{ location.address }}
            <ShareFromSquare />
          </a>
        </p>
        <div>
          <h4>Missas</h4>
          <p><b>Dias da semana:</b> {{ location.weekdays }}</p>
          <p>
            <b>Sábados: </b>
            {{ location.Saturday_morning }}, {{ location.Saturday_late }}
          </p>
          <p>
            <b>Domingos: </b>
            {{ location.Dominical }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - (var(--header-height) + var(--footer-height) + 4rem));
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: auto;
}

.card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  width: 80%;
  max-width: 30rem;
  background-color: var(--color-white);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
}

.card__address a {
  color: #0078a8;
}

.card__address svg {
  width: 1rem;
  fill: #0078a8;
}
</style>
