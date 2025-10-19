<template>
  <button 
    @click="handleAddtoCart"
    :disabled="loading"
    class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
  >
    Add to Cart
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../store/cart';
import { storeToRefs } from 'pinia';
import type { CartForm } from '../types/type';

interface PropType {
  product_id: number;
  quantity?: number;
}

const props = withDefaults(defineProps<PropType>(), {
  quantity: 1,
});

const cartStore = useCartStore();
const {loading} = storeToRefs(cartStore);
const quantity = ref(props.quantity);

const handleAddtoCart = async () => {
  const payload: CartForm = {
    product_id: props.product_id,
    quantity: quantity.value,
  }

  try {
    await cartStore.addItem(payload);
  } catch (error) {
    console.log(error);
  }
}
</script>