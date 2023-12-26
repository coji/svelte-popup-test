import fsm from 'svelte-fsm'
import { writable, get } from 'svelte/store'
export interface PopupConfig {
  client: string
  wait: number
}

export const createPopupState = (tenantId: string | undefined) => {
  let config = writable<PopupConfig>()

  const state = fsm('initial', {
    initial: {
      // 初期状態
      async initialize() {
        if (tenantId === undefined) {
          this.error()
          return
        }
        // 初期化。設定を読み込んでスタンバイ状態に遷移
        const response = await fetch(
          `//${import.meta.env.VITE_VERCEL_URL}/api/config/${tenantId}.json`,
        )
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
      _enter() {
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

  return { state, config }
}
