import './App.svelte'

declare global {
  interface Window {
    tenantId?: string
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const tenantId = window['tenantId']
  // Web Component として body 末尾に挿入
  document.body.insertAdjacentHTML(
    'beforeend',
    `<test-popup tenantId="${tenantId}" />`,
  )
})
