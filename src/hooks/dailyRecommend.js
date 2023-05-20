import {
	getDailySongs
} from '@/api/playlist.js'

export function hGetDailySongs() {
	let dailySongs = ref([])

	getDailySongs().then(res => {
		dailySongs.value = res.data.dailySongs
	})

	return dailySongs
}