import { defineStore } from 'pinia'
import type { QrInterface } from '@/shared/interface/QrInterface'
import { nanoid } from 'nanoid'
import type { DefaultThemeInterface } from '@/shared/data/defaultTheme'

interface QrStoreInterface {
  currentQr: QrInterface;
  list: QrInterface[];
  generateQr: QrInterface|null;
  alert_message: string[];
  is_generated: boolean;
  use_cookie: boolean;
}

export const useQrStore = defineStore('qr', {
  state: (): QrStoreInterface => ({
    list: [],
    currentQr: defaultQr,
    alert_message: [],
    generateQr: null,
    is_generated: false,
    use_cookie: false,
  }),
  getters: {
    getList: (state) => state.list,
  },
  actions: {
    addQr(text: string) {
      this.is_generated = false;
      const tmp_qr_code: QrInterface = {
        id: nanoid(),
        size: this.currentQr.size,
        value: text,
        type: this.currentQr.type,
        margin: this.currentQr.margin,
        dotsOptions: this.currentQr.dotsOptions,
        conersSquareOptions: this.currentQr.conersSquareOptions,
        conersDotsOptions: this.currentQr.conersDotsOptions,
        backgroundOptions: this.currentQr.backgroundOptions,
        created_at: new Date().toISOString(),
        image: this.currentQr.image
      };
      this.list.push(tmp_qr_code);
      this.generateQr = tmp_qr_code;
      this.currentQr.value = "";
      if(this.use_cookie){
        setCookieQrCode(this.list);
      }
      setTimeout(() => {
        this.is_generated = true;
      }, 200)
    },
    deleteQr(qr: QrInterface) {
      this.list = this.list.filter(item => item.id !== qr.id);
      if(this.use_cookie){
        setCookieQrCode(this.list);
      }
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
    },
    setTheme(theme: DefaultThemeInterface) {
      this.currentQr.dotsOptions = theme.dotsOptions;
      this.currentQr.conersSquareOptions = theme.conersSquareOptions;
      this.currentQr.conersDotsOptions = theme.conersDotsOptions;
      this.currentQr.backgroundOptions = theme.backgroundOptions;
      this.currentQr.image = theme.image;
    },
    takeFromCookie() {
      const qrCode = getCookieQrCode();
      console.log(qrCode)
      if(qrCode){
        this.list = qrCode;
        this.generateQr = qrCode[qrCode.length-1];
        this.currentQr.value = "";
        this.is_generated = true;
      }
    }
  }
})

const setCookieQrCode = (list: QrInterface[]) => {
  const date = new Date()
  date.setTime(date.getTime() + (1000 * 60 * 60 * 24 * 30)) // 30 days
  document.cookie = "qrCode=" + JSON.stringify(list) + "; expires=" + date.toUTCString() + "; path=/"
}
const getCookieQrCode = () => {
  const cookie = document.cookie
  if (cookie.includes("qrCode=")) {
    return JSON.parse(cookie.split("qrCode=")[1].split(";")[0])
  }
}

export const defaultQr: QrInterface = {
  id: "",
  type: "url",
  value: "",
  size: 300,
  margin: 0,
  dotsOptions: {
    type: "rounded",
    gradient: {
      mode: "single",
      color1: "#000000",
      color2: "#ff0000",
      rotation: 0
    }
  },
  conersSquareOptions: {
    type: "square",
    gradient: {
      mode: "single",
      color1: "#000000",
      color2: "#ff0000",
      rotation: 0,
    }
  },
  conersDotsOptions: {
    type: "none",
    gradient: {
      mode: "single",
      color1: "#000000",
      color2: "#ff0000",
      rotation: 0,
    }
  },
  backgroundOptions: {
    gradient: {
      mode: "single",
      color1: "#ffffff",
      color2: "#1051c8",
      rotation: 0,
    }
  },
  image: "",
  created_at: new Date().toISOString()
}