import {
	createStore
} from 'vuex'

import playlistTags from './modules/playlistTags.js'


const store = createStore({
	modules: {
		playlistTags
	}
})

export default store