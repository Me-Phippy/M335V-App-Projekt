import { readonly, ref, type Ref } from 'vue'
import { Storage } from '@ionic/storage'

const localStoreAsync = new Storage().create()

const dataCache: Record<string, Ref<unknown>> = {}

export function useStorageService<T>(name: string, defaultValue: T) {
  if (!dataCache[name]) {
    dataCache[name] = ref<T>(defaultValue) as Ref<unknown>

    const loadData = async () => {
      const localStore = await localStoreAsync
      const dataRaw = await localStore.get(name)
      dataCache[name].value = dataRaw ? JSON.parse(dataRaw) : defaultValue
    }

    loadData()
  }

  const data = dataCache[name] as Ref<T>

  const setData = async (toSet: T) => {
    data.value = toSet
    const localStore = await localStoreAsync
    await localStore.set(name, JSON.stringify(toSet))
  }

  return {
    data: readonly(data),
    setData,
  }
}
