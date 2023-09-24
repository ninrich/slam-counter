<template>
  <div>
    <label for="time">Časový limit:</label>
    <input type="text" id="time" v-model="time"/>
    <br>
    <button @click="saveSettings">Uložiť</button>
    <br>
    <br>
    <router-link to="counter">Počítadlo</router-link>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useCounterStore} from '@/stores/counter'

export default {
  name: 'SettingsView.vue',
  setup() {
    const counter = useCounterStore();
    const time = ref(counter.maxTime);

    function saveSettings() {
      counter.setMaxTime(time.value);
    }

    return {
      saveSettings,
      time
    }
  }
}
</script>

<style scoped>
label, input, button {
  display: block;
  margin: auto;
}

</style>
