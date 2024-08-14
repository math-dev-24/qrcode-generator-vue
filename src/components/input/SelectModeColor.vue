<script setup lang="ts">

const mode = defineModel<string>('mode')
const color1 = defineModel<string>('color1')
const color2 = defineModel<string>('color2')
const color3 = defineModel<string>('color3')
const percent_color2 = defineModel<number>('percent_color2')
const rotate = defineModel<number>('rotate')
const type = defineModel<string>('type')

</script>

<template>
  <div class="flex gap-1 md:gap-2 border rounded p-2">
    <div class="flex flex-col gap-2 flex-1 px-1 form_group">
      <label class="text-sm" for="mode">Couleur :</label>
      <span class="info">Nombre de couleurs</span>
      <div class="flex flex-col md:flex-row gap-1 md:gap-2">
        <select id="mode" v-model="mode" class="m-1 md:p-1 flex-1">
          <option value="single">single</option>
          <option value="double">double</option>
          <option value="triple">triple</option>
        </select>
        <div class="flex flex-col lg:flex-row items-center gap-2 w-full justify-around flex-1 flex-wrap">
          <input id="color1" v-model="color1" type="color"
                 class="w-[70px] h-[30px] block"
          />
          <input v-if="mode === 'double' || mode === 'triple'" id="color2" v-model="color2" type="color"
                 class="w-[70px] h-[30px] block"
          />
          <input v-if="mode === 'triple'" id="color3" v-model="color3" type="color"
                 class="w-[70px] h-[30px] block"
          />
        </div>
      </div>
    </div>
    <div v-if="mode === 'double' || mode === 'triple'" class="flex flex-col md:flex-row gap-2 flex-1">
      <div class="form_group flex-1">
        <label for="rotate">Rotation du gradient :</label>
        <span class="info">Rotation en degré</span>
        <input type="number" v-model="rotate" />
      </div>
      <div class="form_group flex-1" v-if="mode === 'triple'">
        <label for="percent_color2">Position color2 :</label>
        <span class="info">10 à 90%</span>
        <input type="number" v-model="percent_color2" />
      </div>
      <div class="form_group flex-1">
        <label for="type">Type :</label>
        <span class="info">Type de gradient</span>
        <select id="type" v-model="type" class="m-1 md:p-1 flex-1">
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>
      </div>
    </div>
  </div>
</template>