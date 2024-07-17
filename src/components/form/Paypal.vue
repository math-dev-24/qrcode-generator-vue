<template>
  <section class="grid grid-cols-2 gap-4">
    <div class="form_group col-span-2">
      <label for="email">Email : <span class="text-red-600">*</span></label>
      <input id="email" v-model="current.email" type="email" />
    </div>
    <div class="form_group">
      <label for="itemName">Item Name : <span class="text-red-600">*</span></label>
      <input id="itemName" v-model="current.itemName" type="text" />
    </div>
    <div class="form_group">
      <label for="amount">Amount : <span class="text-red-600">*</span></label>
      <input id="amount" v-model="current.amount" type="number" />
    </div>
    <div class="form_group">
      <label for="currency">Currency : <span class="text-red-600">*</span></label>
      <select id="currency" v-model="current.currency">
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="CAD">CAD</option>
        <option value="AUD">AUD</option>
        <option value="JPY">JPY</option>
      </select>
    </div>
    <div class="form_group">
      <label for="tax">Tax en % : <span class="text-red-600">*</span></label>
      <input id="tax" v-model="current.tax" type="number" />
    </div>
  </section>
  <Option />
  <ButtonForm @generateQr="generateQr" />
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import ButtonForm from '@/components/form/ButtonForm.vue'
import { useQrStore } from '@/stores/QrStore'
import { checkEmail } from '@/shared/validator'
import Option from '@/components/form/Option.vue'

const emit = defineEmits<{
  (e: "generateQr", text: string): void;
}>()

const current = reactive<{
  email: string;
  itemName: string;
  amount: number;
  currency: string;
  tax: number;
}>({
  email: "",
  itemName: "",
  amount: 0,
  currency: "EUR",
  tax: 0
})

onMounted(() => {
  checkForm()
})

watch(current, () => {
  checkForm()
})

function checkForm() {
  if(current.email === "" || current.itemName === "" || current.amount === 0 || current.currency === "") {
    useQrStore().addAlert("Tous les champs sont obligatoires !")
  }else{
    useQrStore().removeAlert("Tous les champs sont obligatoires !")
  }
  if(!checkEmail(current.email)) {
    useQrStore().addAlert("L'email n'est pas valide !")
  }else{
    useQrStore().removeAlert("L'email n'est pas valide !")
  }
  if(current.tax < 0 || current.tax > 100) {
    useQrStore().addAlert("La taxe doit être comprise entre 0 et 100 !")
  }else{
    useQrStore().removeAlert("La taxe doit être comprise entre 0 et 100 !")
  }
  if(current.amount < 0) {
    useQrStore().addAlert("Le montant doit être positif !")
  }else{
    useQrStore().removeAlert("Le montant doit être positif !")
  }
}

function generateQr() {
  const qr = generatePaypalQRCode(current.email, current.itemName, current.amount, current.currency);
  emit("generateQr", qr);
}

function generatePaypalQRCode(email: string, itemName: string, amount: number, currency: string): string {
  return `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(email)}&item_name=${encodeURIComponent(itemName)}&amount=${amount}&currency_code=${currency}`;
}

</script>