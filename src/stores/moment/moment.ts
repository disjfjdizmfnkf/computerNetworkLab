import { defineStore } from 'pinia'
import { getMomentList } from '@/service/modules/moment'

// 定义 State 的类型
interface MomentState {
  momentList: any[]
  offset: number
  isShowPostBox: boolean
}

const useMomentStore = defineStore('moment', {
  state: (): MomentState => ({
    momentList: [],
    offset: 0,
    isShowPostBox: false
  }),
  actions: {
    async fetchMomentIdListData(offset = 0, num = 5) {
      const res = await getMomentList(offset, num)
      this.momentList.push(...res.data)
      this.offset += num
    },
    toggleShowBox() {
      this.isShowPostBox = !this.isShowPostBox
      console.log(this.isShowPostBox)
    }
  }
})

export default useMomentStore
