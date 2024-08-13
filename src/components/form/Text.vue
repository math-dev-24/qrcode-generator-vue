<template>
  <div class="form_group col-span-2">
    <label for="url" class="block my-1 font-bold">Entrez votre texte : <span class="text-red-600">*</span></label>
    <textarea type="text" id="url" v-model="text" placeholder="Lorem ipsum dolor sit amen"/>
    <DesignList />
    <Option />
    <ButtonForm @generateQr=" emit('generateQr', text)" />
  </div>
</template>

<script setup lang="ts">
import { useQrStore } from '@/stores/QrStore'
import { onMounted, ref, watch } from 'vue'
import ButtonForm from '@/components/form/ButtonForm.vue'
import Option from '@/components/form/Option.vue'
import DesignList from '@/components/form/DesignList.vue'

const text = ref<string>('')

const emit = defineEmits<{
  (e: 'generateQr', text: string): void
}>()


onMounted(() => {
  checkForm()
})

watch(text, () => {
  checkForm()
})

function checkForm() {
  if (text.value.length === 0) {
    useQrStore().addAlert('Le texte est vide')
  }else{
    useQrStore().removeAlert('Le texte est vide')
  }
}

</script>