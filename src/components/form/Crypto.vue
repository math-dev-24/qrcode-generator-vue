<template>
  <div class="form_group">
    <label for="cryptoType" class="block my-1 font-bold">Type de crypto : <span class="text-red-600">*</span></label>
    <div class="flex md:flex-row flex-col gap-2 ">
      <div
        v-for="i in ListCrypto"
        :key="i" @click="setCryptoType(i)"
        class="px-4 border py-2 rounded cursor-pointer flex-1 text-center"
        :class="state.cryptoType === i ? 'text-white bg-stone-500 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
      >
        {{i}}
      </div>
      <div
        class="px-4 border py-2 rounded cursor-pointer flex-1 text-center"
        :class=" otherCryptoType ? 'bg-stone-300 drop-shadow' : 'hover:bg-stone-200 hover:outline hover:outline-2 outline-stone-400'"
      >
        <div v-if="!otherCryptoType" @click="goCustom" class="w-full h-full">Autre</div>
        <span v-else>
          <input type="text" v-model="state.cryptoType" placeholder="Type de crypto" class="w-full p-0.5 border rounded flex-1"/>
        </span>
      </div>
    </div>
  </div>
  <div  class="form_group">
    <label for="amount" class="block my-1 font-bold">Montant : <span class="text-red-600">*</span></label>
    <input type="number" id="amount" v-model="state.amount" placeholder="0"/>
  </div>
  <div class="form_group">
    <label for="address" class="block my-1 font-bold">Adresse : <span class="text-red-600">*</span></label>
    <input type="text" id="address" v-model="state.address" placeholder="feeddd8978!!dedcDDEE223"/>
  </div>
  <div class="form_group">
    <label for="message" class="block my-1 font-bold">Message :</label>
    <input type="text" id="message" v-model="state.message" placeholder="0"/>
  </div>
  <ButtonForm @generateQr="generateQr" />
</template>

<script setup lang="ts">
import ButtonForm from '@/components/form/ButtonForm.vue'
import { onMounted, reactive, ref, watch } from 'vue'
import { useQrStore } from '@/stores/QrStore'

const qrStore = useQrStore()

interface CryptoProps {
  cryptoType: string;
  amount: number;
  address: string;
  message: string;
}

const otherCryptoType = ref<boolean>(false)

const state = reactive<CryptoProps>({
  cryptoType: "Bitcoin",
  amount: 0,
  address: "",
  message: "",
})

const ListCrypto: string[] = ["Bitcoin", "Ether"]

function generateQr() {
  let qrData: string = `${state.cryptoType}:${state.amount}:${state.address}`
  if (state.message !== "") {
    qrData += `&message=${encodeURIComponent(state.message)}`;
  }
  emit('generateQr', qrData)
}

const emit = defineEmits<{
  (e: 'generateQr', text: string): void
}>()

onMounted(() => {
  checkForm()
})

watch(state, () => {
  checkForm()
})

function checkForm() {
  if(state.cryptoType === "") {
    qrStore.addAlert("Le type de crypto est vide")
  }else{
    qrStore.removeAlert("Le type de crypto est vide")
  }
  if(state.amount <= 0) {
    qrStore.addAlert("Le montant est invalide")
  }else{
    qrStore.removeAlert("Le montant est invalide")
  }
  if(state.address === "") {
    qrStore.addAlert("L'adresse est vide")
  }else{
    qrStore.removeAlert("L'adresse est vide")
  }
}
function setCryptoType(cryptoType: string) {
  state.cryptoType = cryptoType
  otherCryptoType.value = false
}
function goCustom() {
  otherCryptoType.value = true
  state.cryptoType = "Other"
}
</script>