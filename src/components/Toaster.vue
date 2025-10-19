<template>
  <div v-if="isVisible" :class="bgToast" id="toast-default" class="fixed top-5 right-5 z-[999] border-1 flex items-center w-full max-w-xs p-2 text-white-500 bg-white-100 rounded-lg shadow-sm" role="alert">
      <div :class="bgToast" class="inline-flex items-center justify-center shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg">
          <svg v-if="status === 'success'" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11.414V11m0 5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <svg v-else-if="status === 'failed'" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <span class="sr-only">{{ status === 'success' ? 'Check icon' : 'Warning icon' }}</span>
      </div>
      <div :class="bgToast" class="ms-3 text-md font-normal">{{ message }}</div>
      <button type="button" @click="hideToast" class="ms-auto -mx-1.5 -my-1.5 text-gray-600 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-default" aria-label="Close">
          <span class="sr-only">Close</span>
          <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
      </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface PropTypes {
  message: string;
  status?: 'success' | 'failed' | 'info' | string;
  duration?: number;
}

const props = withDefaults(defineProps<PropTypes>(), {
  status: 'info',
  duration: 3000,
});

const isVisible = ref(false);
let timeout : number | undefined = undefined;

const bgToast = computed(() => {
  if(props.status==='success'){
    return 'text-green-800 bg-green-300 border-';
  }else if (props.status==='failed') {
    return 'text-red-800 bg-red-300'
  }else {
    return 'text-blue-800 bg-blue-300'
  }
});

const showToast = () => {
  isVisible.value = true;
  if(timeout){
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    hideToast();
  }, props.duration);
}

const hideToast = () => {
  isVisible.value = false;
  if(timeout){
    clearTimeout(timeout);
  }
}

defineExpose({
  showToast
});

onMounted(() => {
  if(isVisible.value){
    showToast();
  }
})
</script>
