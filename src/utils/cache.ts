enum CacheType {
  Local,
  Session,
}

class Cache {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {  // 设置的值一定是any类型
    this.storage.setItem(key, JSON.stringify(value))  // 使用JSON.stringify可以将对象转换成JSON类型并保存原有类型
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)  // 可以还原成原有js对象类型
    }
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clean() {
    this.storage.clear()
  }
}

// 导出两个cache实例
const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export {
  localCache,
  sessionCache
}
