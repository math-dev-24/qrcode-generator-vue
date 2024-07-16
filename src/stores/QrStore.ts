import { defineStore } from 'pinia'
import type { QrInterface } from '@/shared/interface/QrInterface'

interface QrStoreInterface {
  list: QrInterface[]
}


export const useQrStore = defineStore('qr', {
  state: (): QrStoreInterface => ({
    list: []
  }),
  getters: {
    getList: (state) => state.list,
    getListUrl: (state) => state.list.filter(item => item.type === "url"),
    getListVCard: (state) => state.list.filter(item => item.type === "vcard"),
    getListText: (state) => state.list.filter(item => item.type === "text"),
    getListEmail: (state) => state.list.filter(item => item.type === "email"),
    getListSms: (state) => state.list.filter(item => item.type === "sms"),
  },
  actions: {
    addQr(qr: QrInterface) {
      this.list.push(qr)
    },
    deleteQr(qr: QrInterface) {
      this.list = this.list.filter(item => item.id !== qr.id)
    }
  }
})