import App from './App.svelte'

const appDiv = document.createElement('div')
const app = new App({
	target: appDiv,
})
document.body.appendChild(appDiv)

export default app
