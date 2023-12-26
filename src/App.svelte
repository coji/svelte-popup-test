<svelte:options
  customElement={{
    tag: 'test-popup',
    props: { tenantId: { reflect: true, type: 'String' } },
  }}
/>

<script lang="ts">
  import { onMount } from 'svelte'
  import { createPopupState } from './states/popup'

  export let tenantId: string | undefined = undefined

  const { state, config } = createPopupState(tenantId)
  onMount(() => {
    state.initialize()
  })
</script>

<div class="portal">
  <div class="status">
    <p>state: {$state}</p>
    <p>config: {JSON.stringify($config)}</p>
  </div>

  {#if $state === 'show'}
    <div class="popup">
      <div>
        <h1>Popup</h1>
        <p>state: {$state}</p>
      </div>
      <button name="close" type="button" on:click={state.close}>close</button>
    </div>
  {/if}
</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #333;
  }

  div.status {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    background-color: #eee;
  }

  div.popup {
    position: absolute;
    inset: 20px;
    padding: 10px 20px 10px 20px;
    border-radius: 10px;
    max-width: 500px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    margin: auto;
    text-align: center;
    display: grid;
    place-items: center;
    border: 2px solid red;
    background-color: white;
  }

  button[name='close'] {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px 10px 5px 10px;
  }
</style>
