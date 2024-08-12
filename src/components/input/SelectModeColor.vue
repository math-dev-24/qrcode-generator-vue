<script setup lang="ts">

const mode = defineModel<string>('mode')
const color1 = defineModel<string>('color1')
const color2 = defineModel<string>('color2')
const rotate = defineModel<number>('rotate')

</script>

<template>
  <div class="flex gap-2">
    <div class="flex flex-col gap-2 flex-1">
      <p class="text-sm">Couleur :</p>
      <div class="flex gap-2">
        <select id="mode" v-model="mode" class="m-1 p-1 flex-2">
          <option value="single">single</option>
          <option value="multiple">multiple</option>
        </select>
        <div class="flex items-center gap-2 w-full justify-around flex-1">
          <input id="color1" v-model="color1" type="color"
                 class="w-[40px] h-[20px] block"
          />
          <input v-if="mode === 'multiple'" id="color2" v-model="color2" type="color"
                 class="w-[40px] h-[20px] block"
          />
        </div>
      </div>
    </div>
    <div class="form_group flex-1" v-if="mode === 'multiple'">
      <label for="rotate">Rotation du gradient :</label>
      <input type="number" v-model="rotate" />
    </div>
  </div>
</template>