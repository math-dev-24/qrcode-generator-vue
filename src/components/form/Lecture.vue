<template>
  <div class="bg-stone-300 py-6 px-4 rounded-xl my-6 drop-shadow container m-auto">
    <div class="grid grid-cols-2 gap-4">
      <div class="form_group">
        <label for="file">QR Code : </label>
        <input type="file" id="file" />
        <canvas ref="canvas" id="canvas"></canvas>
      </div>
    </div>
    <button class="bg-stone-600 text-white hover:bg-stone-500 px-2 py-1 rounded transition-all duration-150 w-2/5 m-auto col-span-2">
      Generate
    </button>
    <div>
      En cours de développement
    </div>
  </div>
</template>

