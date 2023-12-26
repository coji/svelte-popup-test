import fsm from 'svelte-fsm'
import { writable, get } from 'svelte/store'
import { fetchCatImage } from '../services/cat'
export interface PopupConfig {
  client: string
  wait: number
}

export const createPopupState = (tenantId: string | undefined) => {
  let config = writable<PopupConfig>()
  let image = writable<string>()

  const state = fsm('initial', {
    initial: {
      // 初期状態
      async initialize() {
        if (tenantId === undefined) {
          console.log('tenantId is undefined')
          this.error()
          return
        }

        const apiRoot = import.meta.env.PROD
          ? `https://${
              import.meta.env.VITE_API_HOST ?? import.meta.env.VITE_VERCEL_URL
            }`
          : '' // 開発中は同一オリジンで

        // 初期化。設定を読み込んでスタンバイ状態に遷移
        const response = await fetch(`${apiRoot}/api/config/${tenantId}.json`)
        if (response.ok) {
          config.set(await response.json())
          this.standby() // Proxy 経由で検知して遷移させるのでこの状態のアクション関数を呼ぶ
        } else {
          this.error()
        }
      },
      standby: () => 'standby',
      error: () => 'error',
    },
    standby: {
      // 待機状態
      async _enter() {
        const imageUrl = await fetchCatImage()
        image.set(imageUrl)

        // ポップアップ表示待機
        setTimeout(() => this.show(), get(config)!.wait * 1000)
      },
      show: () => 'show',
    },
    show: {
      // ポップアップ表示状態
      close: () => 'closed',
    },
    closed: {},
    error: {
      _enter() {
        console.log('error')
      },
    },
  })

  return { state, config, image }
}
