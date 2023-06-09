import {
	getPlaylistDetail
} from '@/api/playlist.js'
import {
	getSongDetail
} from '@/api/play.js'

export function getDetailAndTracks(id) {
	// 颜色
	let playlistId = ref('')
	let color = computed(() => {
		let num = playlistId.value.slice(0, 4)
		// if(num.length < 6) 
		return `#FF${num}`
	})

	// 歌单详情、歌曲列表
	let playlistDetail = ref({})
	let trackIds = computed(() => {
		if (playlistDetail.value.trackIds) {
			return playlistDetail.value.trackIds.map(item => item.id)
		} else {
			return []
		}
	})
	let tracks = ref([])

	let disableCollect = ref(false)

	// disCollect 表示是否禁用收藏按钮 如，在我喜欢的歌单，自然不需要收藏功能
	onLoad(({
		id,
		disCollect
	}) => {
		playlistId.value = id

		getPlaylistDetail(id).then(res => {
			playlistDetail.value = res.playlist
			console.log(playlistDetail.value);
			trackIds.value = res.playlist.trackIds
		})

		if (disCollect) disableCollect.value = true
	})

	watch(trackIds, () => {
		getSongDetail(trackIds.value.join(',')).then(res => {
			tracks.value = res.songs
		})
	})

	return {
		color,
		playlistDetail,
		tracks,
		disableCollect
	}
}