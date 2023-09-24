<template>
  <div class="counter" :class="{overtime}">{{ currentTime }}</div>
  <TheManual/>
</template>

<script>
import router from '@/router';
import {computed, ref} from 'vue';
import {useCounterStore} from '@/stores/counter'
import TheManual from '../components/TheManual.vue'


export default {
  name: 'CounterView',
  components: {TheManual},

  setup() {
    const counter = useCounterStore();
    const secondsCounter = ref(0);
    const maxSeconds = ref(counter.maxTime);
    const countingInterval = ref(null);
    const overtime = computed(() => secondsCounter.value >= maxSeconds.value)
    function addKeyPressListeners() {
      window.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
          startCounting();
        } else if (e.key === 'p') {
          pauseCounting();
        } else if (e.key === 'r') {
          resetCounting();
        } else if (e.key === 'n') {
          openSettings();
        }
      });
    }

    addKeyPressListeners();
    function startCounting() {
      if (countingInterval.value === null) {
        countingInterval.value = setInterval(() => {
          secondsCounter.value++;
        }, 1000);
      }
    }

    function pauseCounting() {
      clearInterval(countingInterval.value);
      countingInterval.value = null;
    }

    function resetCounting() {
      pauseCounting();
      secondsCounter.value = 0;
    }

    function openSettings() {
      router.push('settings');
    }


    const currentTime = computed(() => {
      const minutes = Math.floor(secondsCounter.value / 60);
      const seconds = secondsCounter.value - minutes * 60;
      const secondsFormatted = seconds.toLocaleString('sk-SK', {minimumIntegerDigits: 2})
      return `${minutes}:${secondsFormatted}`;
    })
    return {
      overtime,
      maxSeconds,
      currentTime
    }
  }
}
</script>

<style scoped>
.counter {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overtime {
  color: red;
}
</style>
