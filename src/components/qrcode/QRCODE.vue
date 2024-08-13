<template>
  <div class="p-4 relative">
    <QRCodeVue3
      :height="qr.size"
      :width="qr.size"
      :value="qr.value"
      :margin="qr.margin || undefined"
      :image="qr.image"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.2, margin: 0, crossOrigin: 'anonymous' }"
      :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
      :dotsOptions="getOptionsWithType(qr.dotsOptions)"
      :cornersSquareOptions="getOptionsWithType(qr.conersSquareOptions)"
      :cornersDotOptions="getOptionsWithType(qr.conersDotsOptions)"
      :backgroundOptions="getBackgroundOptions(qr.backgroundOptions.gradient)"
      :download="download"
      myclass="img-qr"
      imgclass="img-qr"
      downloadButton="btn-download"
      :downloadOptions="{ name: 'qrcode', extension: 'png' }"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import QRCodeVue3 from "qrcode-vue3";
import type { OptionsGradient, OptionsGradientType, QrInterface } from '@/shared/interface/QrInterface'

const { qr, download } = defineProps<{
  qr: QrInterface,
  download: boolean
}>()


const getOptionsWithType = (qr: OptionsGradientType) => {
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
  const rotate = clamp(qr.gradient.rotation, 0, 100);
  const percentColor2 = clamp(qr.gradient.percent_color2, 10, 90) / 100;

  const baseOptions = {
    type: qr.type,
    color: qr.gradient.color1,
  };

  if (qr.gradient.mode === "double" || qr.gradient.mode === "triple") {
    const colorStops = [
      { offset: 0, color: qr.gradient.color1 },
      ...(qr.gradient.mode === "triple" ? [{ offset: percentColor2, color: qr.gradient.color2 }] : []),
      { offset: 1, color: qr.gradient.color3 }
    ];

    return {
      ...baseOptions,
      gradient: {
        type: "linear",
        colorStops,
        rotation: rotate
      }
    };
  }

  return baseOptions;
};

const getBackgroundOptions = (qr: OptionsGradient) => {
  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
  const rotate = clamp(qr.rotation, 0, 100);
  const percentColor2 = clamp(qr.percent_color2, 10, 90) / 100;

  const baseOptions = {
    color: qr.color1,
  }

  if (qr.mode === "double" || qr.mode === "triple") {
    const colorStops = [
      { offset: 0, color: qr.color1 },
      ...(qr.mode === "triple" ? [{ offset: percentColor2, color: qr.color2 }] : []),
      { offset: 1, color: qr.color3 }
    ];

    return {
      ...baseOptions,
      gradient: {
        type: "linear",
        colorStops,
        rotation: rotate
      }
    };
  }

  return baseOptions;
}


</script>