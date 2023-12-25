<script lang="ts">
  import { onMount } from 'svelte'
  import { createPopupState } from './states/popup'

  const { state, config } = createPopupState()
  onMount(() => {
    state.initialize()
  })
</script>

<div class="portal">
  <div class="status">
    <p>state: {$state}</p>
    <p>config: {JSON.stringify($config)}</p>
  </div>

  <div class={$state === 'show' ? 'show' : 'hide'}>
    <h1>Popup</h1>
    <button name="close" type="button" on:click={state.close}>close</button>
    <p>state: {$state}</p>
  </div>
</div>

<style>
  div.status {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    background-color: #eee;
  }

  div.show {
    position: absolute;
    text-align: initial;
    inset: 20px;
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    background-color: red;
  }

  div.hide {
    display: none;
  }

  button[name='close'] {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px 10px 5px 10px;
  }
</style>
