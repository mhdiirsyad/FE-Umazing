<template>
  <Spinner :loading="loading" :size="'w-10'" overlay />

  <div v-if="!loading">
    <div v-if="cart?.cart_items.length === 0" class="min-h-[calc(100vh-150px)] flex items-center justify-center">
      <p class="font-normal text-xl">Empty Cart</p>
    </div>

    <div v-if="cart?.cart_items && cart.cart_items.length > 0" class="p-20 px-4 flex items-start justify-center">
      <div
        class="px-4 lg:px-10 flex flex-col gap-4 items-center justify-center">
        <div v-for="item in cart.cart_items"
          class="w-full grid grid-cols-5 items-center gap-4 max-w-[100%] bg-white border border-gray-200 rounded-lg shadow-sm px-4">
          <a href="#" class="flex items-center col-span-1">
            <div class="h-30 w-40 flex items-center justify-between gap-4">
              <img class="p-4 rounded-t-lg max-h-full max-w-full object-cover"
                :src="baseUrl + item.product_image" :alt="item.product_name" height="100" />
            </div>
          </a>
          <div class="col-span-2">
            <span class="font-bold text-md">{{ item.product_name }}</span>
          </div>
          <div class="w-40 font-bold text-lg">
            <span>{{ formatRupiah(item.product_price) }}</span>
          </div>

          <div>
            <form class="max-w-xs flex flex-col items-center mx-auto">
              <label for="counter-input" class="block mb-1 text-sm font-medium text-gray-900">Choose quantity:</label>
              <div class="relative flex items-center">
                <button type="button" @click="handleDecrement(item)" id="decrement-button"
                  :disabled="item.quantity <= 1 || loading" data-input-counter-decrement="counter-input"
                  class="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h16" />
                  </svg>
                </button>
                <input type="text" id="counter-input" data-input-counter
                  @blur="handleChangeQuantity(item, Number($event.target as HTMLInputElement).valueOf())"
                  class="shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                  placeholder="" :value="item.quantity" required />
                <button type="button" @click="handleIncrement(item)" id="increment-button"
                  :disabled="item.quantity >= item.product_stock || loading" data-input-counter-increment="counter-input"
                  class="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                  <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 1v16M1 9h16" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="w-[20%] bg-white border border-gray-200 rounded-lg shadow-sm">
        <div class="p-5 flex flex-col gap-2 items-center justify-center w-full">
          <p><strong>Order Summary</strong></p>
          <div class="mb-6 w-full">
            <label for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900">Address</label>
            <textarea type="textarea" id="default-input" v-model="addressForm.address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>
            <p v-if="typeof orderErrors === 'object' && orderErrors?.address" class="text-red-500 text-sm mt-1">{{ orderErrors.address[0] }}</p>
          </div>
          <div class="flex items-center justify-between w-full">
            <p>Total</p>
            <p><strong>{{ formatRupiah(cartTotal) }}</strong></p>
          </div>
          <div class="mt-4 flex justify-center w-full">
            <button type="button" :disabled="orderLoading" @click="handleOrder"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center w-full">
              <Spinner :loading="orderLoading" :size="'w-4'" class="flex">
                <span>Loading...</span>
              </Spinner>
              <div v-if="!orderLoading" class="flex items-center">
                <svg class="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 18 21">
                <path
                  d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
              </svg>
              Buy now
              </div>            
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { formatRupiah } from '../../utils/rupiahFormat';
import Spinner from '../../components/Spinner.vue';
import { useCartStore } from '../../store/cart';
import type { CartItem, OrderForm } from '../../types/type';
import { useOrderStore } from '../../store/order';
import router from '../../router';

const baseUrl = computed(()=>import.meta.env.VITE_BACKEND_URL)

const cartStore = useCartStore();
const { loading, cart, cartTotal } = storeToRefs(cartStore);
const orderStore = useOrderStore();
const {loading: orderLoading, errors: orderErrors} = storeToRefs(orderStore)
const addressForm = reactive<OrderForm>({address: ''});

let debounceTimeout: number | undefined = undefined;
const handleChangeQuantity = (item: CartItem, newQuantity: number) => {
  if (newQuantity < 1) {
    newQuantity = 1
  }

  if (newQuantity > item.product_stock) {
    newQuantity = item.product_stock;
  }

  item.quantity = newQuantity;

  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }

  debounceTimeout = setTimeout(() => {
    console.log(newQuantity)
    cartStore.updateQuantity(item.id, newQuantity);
  }, 1000)
}

const handleIncrement = (item: CartItem) => {
  const newQuantity = item.quantity + 1
  if (newQuantity <= item.product_stock) {
    handleChangeQuantity(item, newQuantity);
  }
}

const handleDecrement = (item: CartItem) => {
  const newQuantity = item.quantity - 1
  if (newQuantity >= 1) {
    handleChangeQuantity(item, newQuantity);
  }
}

const handleOrder = async() => {
  try {
    const newOrder = await orderStore.addOrder(addressForm);
  
    if(newOrder && newOrder.id){
      router.push({name: 'member.order', params: {id: newOrder.id}});
    }
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  cartStore.getCart();
})

onUnmounted(() => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
})
</script>