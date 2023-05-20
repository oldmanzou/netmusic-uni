import { createSSRApp } from "vue";
import uviewPlus from '@/uni_modules/uview-plus'
import App from "./App.vue";
import store from './store'

export function createApp() {
	const app = createSSRApp(App);
	app.use(uviewPlus)
	app.use(store)

	app.provide('$global', {
		$audioContext: {}
	})
	
	
	return {
		app,
	};
}