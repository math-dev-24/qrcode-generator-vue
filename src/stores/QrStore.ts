import { defineStore } from 'pinia'
import type { QrInterface, QrType } from '@/shared/interface/QrInterface'
import { nanoid } from 'nanoid'

interface QrStoreInterface {
  currentQr: QrInterface;
  list: QrInterface[];
  generateQr: QrInterface|null;
  alert_message: string[];
  is_generated: boolean;
}

export const useQrStore = defineStore('qr', {
  state: (): QrStoreInterface => ({
    list: [],
    currentQr: defaultQr,
    alert_message: [],
    generateQr: null,
    is_generated: false,
  }),
  getters: {
    getList: (state) => state.list,
  },
  actions: {
    resetQr() {
      const tmp_type: QrType = this.currentQr.type;
      this.currentQr = { ...defaultQr, type: tmp_type };
    },
    addQr(text: string) {
      this.is_generated = false;
      const tmp_qr_code: QrInterface = {
        id: nanoid(),
        value: text,
        margin: this.currentQr.margin,
        background: this.currentQr.background,
        foreground: this.currentQr.foreground,
        type: this.currentQr.type,
        like: false,
        created_at: new Date().toISOString()
      };
      this.list.push(tmp_qr_code);
      this.generateQr = tmp_qr_code;
      this.resetQr();
      setTimeout(() => {
        this.is_generated = true;
      }, 200)
    },
    deleteQr(qr: QrInterface) {
      this.list = this.list.filter(item => item.id !== qr.id);
    },
    addAlert(message: string) {
      const index = this.alert_message.findIndex(item => item === message);
      if (index === -1) {
        this.alert_message.push(message);
      }
    },
    removeAlert(message: string) {
      this.alert_message = this.alert_message.filter(item => item !== message);
    },
    resetAlert() {
      this.alert_message = []
    }
  }
})

const defaultQr: QrInterface = {
  id: "",
  value: "",
  margin: 0,
  background: "#000000",
  foreground: "#ffffff",
  type: "url",
  like: false,
  created_at: new Date().toISOString()
}