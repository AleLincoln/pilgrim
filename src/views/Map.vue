<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import { type Coordinates } from '@/shared/types/generic'
import { useLocations } from '@/stores/locations'
import { LMap, LTileLayer, LMarker, LCircle, LPopup } from '@vue-leaflet/vue-leaflet'
import getUserLocation from '@/shared/helpers/getUserLocation'

interface State {
  zoom: number
  center: [number, number]
  userLocation: Coordinates
}

const state = reactive<State>({
  zoom: 13,
  center: [41.160001, -8.6433134],
  userLocation: { latitude: 41.126896, longitude: -8.634225 }
})

const locations = useLocations()

const joinSaturdayDates = (morning: string, evening: string) => {
  const morningHours = morning.split(', ')
  const eveningHours = evening.split(', ')

  return morningHours.join(', ') + ', ' + eveningHours.join(', ')
}

onMounted(async () => {
  try {
    const userLocation = await getUserLocation()
    state.userLocation = userLocation
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <main>
    <div
      style="
        height: calc(100vh - (var(--header-height) + var(--footer-height) + 4rem));
        width: 100vw;
      "
    >
      <l-map ref="map" v-model:zoom="state.zoom" :center="state.center" :use-global-leaflet="false">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
        <template v-for="(location, index) in locations.locations">
          <l-marker
            v-if="location.latitude && location.longitude"
            :key="index"
            :lat-lng="[location.latitude, location.longitude]"
          >
            <l-popup class="map__marker__popup">
              <h3>{{ location.name }}</h3>
              <p><b> Morada:</b> {{ location.address }}</p>
              <div>
                <h4>Missas</h4>
                <p><b>Dias da semana:</b> {{ location.weekdays }}</p>
                <p>
                  <b>Sábados: </b>
                  {{ joinSaturdayDates(location.Saturday_morning, location.Saturday_late) }}
                </p>
                <p>
                  <b>Domingos: </b>
                  {{ location.Dominical }}
                </p>
              </div>
            </l-popup>
          </l-marker>
        </template>
        <l-circle
          v-if="state.userLocation.latitude && state.userLocation.longitude"
          :lat-lng="[state.userLocation.latitude, state.userLocation.longitude]"
          :radius="1000"
        ></l-circle>
      </l-map>
    </div>
  </main>
</template>
