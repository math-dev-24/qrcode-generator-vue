<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <div class="form_group">
        <label for="email" class="block my-1 font-bold">Email : <span class="text-red-600">*</span></label>
        <input type="email" id="email" v-model="current.email" placeholder="john.doe@gmail.com"/>
      </div>
      <div class="form_group">
        <label for="subject" class="block my-1 font-bold">Sujet : <span class="text-red-600">*</span></label>
        <input type="text" id="subject" v-model="current.subject" placeholder="Hello"/>
      </div>
      <div class="form_group col-span-2">
        <label for="content" class="block my-1 font-bold">Entrez votre texte : <span class="text-red-600">*</span></label>
        <textarea type="text" id="content" v-model="current.content" placeholder="Lorem ipsum dolor sit amen"/>
      </div>
    </div>
    <Option />
    <ButtonForm @generateQr="generateQr" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useQrStore } from '@/stores/QrStore'
import { mailto } from '@/shared/Mailto'
import ButtonForm from '@/components/form/ButtonForm.vue'
import { checkEmail } from '@/shared/validator'
import Option from '@/components/form/Option.vue'

const current = reactive<{
  email: string;
  subject: string;
  content: string;
}>({
  email: "",
  subject: "",
  content: "",
})

onMounted(() => {
  checkForm()
})

watch(current, () => {
  checkForm()
})

const emit = defineEmits<{
  (e: 'generateQr', text: string): void
}>()

const generateQr = () => {
  const email_str: string = mailto(current.email, current.subject, current.content)
  emit('generateQr', email_str)
}

function checkForm() {
  if (!checkEmail(current.email)) {
    useQrStore().addAlert('L\'email est invalide')
  }else{
    useQrStore().removeAlert('L\'email est invalide')
  }
  if (current.subject.length === 0) {
    useQrStore().addAlert('Le sujet est vide')
  }else{
    useQrStore().removeAlert('Le sujet est vide')
  }
  if (current.content.length === 0) {
    useQrStore().addAlert('Le contenu est vide')
  }else{
    useQrStore().removeAlert('Le contenu est vide')
  }
}

</script>