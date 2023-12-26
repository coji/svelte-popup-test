import './App.svelte'

declare global {
  interface Window {
    tenantId?: string
    debug?: boolean
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const tenantId = window.tenantId
  const debug = window.debug === true
  // Web Component として body 末尾に挿入
  document.body.insertAdjacentHTML(
    'beforeend',
    `<test-popup tenantId="${tenantId}" debug="${debug}" />`,
  )
})
