import {
	getBestTag,
} from '@/api/playlistTags.js'
import {
	getBestPlaylist,
	getPlaylists
} from '@/api/playlist.js'

export function hook(props) {
	let isBest = computed(() => props.tag == '精品')

	// 精品歌单部分
	let title = ref('全部精品')
	let bestTags = ref([])
	let bestPlaylist = ref([])
	let loadMore = ref('') // 函数

	// 非精品歌单部分
	let playlist = ref([])

	// 共同部分
	let more = ref(true)

	watch(() => props.tag, () => {
		fn()
	}, {
		immediate: true
	})

	async function fn() {
		// 精品歌单
		if (isBest.value) {
			bestTags.value = await hGetBestTag()

			const result = hGetBestPlaylist()
			bestPlaylist.value = result.bestPlaylist.value
			more = result.more
			loadMore.value = result.loadMore
		} else {
			const result = await hGetPlaylist(props.tag)
			more.value = result.more
			playlist.value = result.playlists
		}
	}

	// 获取精品歌单标签
	async function hGetBestTag() {
		const {
			tags
		} = await getBestTag()

		return tags
	}

	// 获取精品歌单
	function hGetBestPlaylist() {
		let bestPlaylist = ref([]) // 歌单列表
		let more = ref(true) // 是否还有数据
		let beforeValue = ref(0)

		getData()

		function getData(limit, before, tag) {
			if (more.value) {
				getBestPlaylist(limit, before, tag).then(res => {
					bestPlaylist.value.push(...res.playlists)
					more.value = res.more
					beforeValue.value = res.playlists[res.playlists.length - 1].updateTime
				})
			}
		}

		function loadMore() {
			getData(21, beforeValue.value)
		}

		return {
			bestPlaylist,
			more,
			loadMore
		}
	}

	// 获取非精品歌单
	async function hGetPlaylist(tag) {
		let more = ref(true)
		let playlists = ref([])

		const {
			more,
			playlists
		} = await getPlaylists(tag)

		return {
			more,
			playlists
		}
	}

	return {
		isBest,
		title,
		bestTags,
		bestPlaylist,
		more,
		loadMore,
		playlist
	}
}