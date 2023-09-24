import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const savedMaxTime = localStorage.getItem('maxTime')
  const maxTime = ref(savedMaxTime || 300)
  // const doubleCount = computed(() => count.value * 2)
  function setMaxTime(time) {
    maxTime.value = time;
    localStorage.setItem('maxTime', time);
  }


  return { maxTime, setMaxTime }
})
