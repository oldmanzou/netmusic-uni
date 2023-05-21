import {
	getBestTag,
} from '@/api/playlistTags.js'
import {
	getBestPlaylist,
	getPlaylists
} from '@/api/playlist.js'


export function hGetData(props) {
	let isBest = computed(() => props.tag == '精品')

	// 精品歌单部分
	let title = ref('全部精品')
	let bestTags = ref([])
	let bestPlaylist = ref([])
	let loadMore = ref({}) // 函数
	let bestTag = ref('全部')
	
	// 非精品歌单部分
	let playlists = ref([])

	// 共同部分
	let more = ref(true)

	watch(() => props.tag, getData, {
		immediate: true
	})
	
	watch(bestTag,() => {
		more.value = true 
		bestPlaylist.value = []
		title.value = bestTag == '全部' ? '全部精品' : bestTag.value 
		
		hGetBestPlaylist()
	})

	// 总回调
	function getData() {
		// 重置
		title.value = '全部精品'
		bestTags.value = []
		bestPlaylist.value = []
		bestTag.value = '全部'
		loadMore.value = {}
		playlists.value = []
		more.value = true

		// 精品歌单部分
		if (isBest.value) {
			hGetBestTag()
			hGetBestPlaylist()
		} else {
			hGetPlaylist(props.tag)
		}
	}

	// 精品歌单标签
	async function hGetBestTag() {
		const {
			tags
		} = await getBestTag()

		bestTags.value = tags
	}

	// 精品歌单
	function hGetBestPlaylist() {
		let beforeValue = 0
		
		getData(21,bestTag.value)

		function loadMoreFn() {
			getData(21,bestTag.value, beforeValue)
		}

		loadMore.value = loadMoreFn

		function getData(limit, tag, before) {
			if (more.value) {
				getBestPlaylist(limit, tag, before).then(res => {
					bestPlaylist.value.push(...res.playlists)
					more.value = res.more
					beforeValue = res.playlists[res.playlists.length - 1].updateTime
				})
			}
		}
	}

	// 歌单
	function hGetPlaylist(tag) {
		let offset = 0

		getData(tag)

		function getData(tag, o, l) {
			if(more.value) {
				getPlaylists(tag, o, l).then(res => {
					more.value = res.more
					playlists.value.push(...res.playlists)
				
					offset += 21
				})
			}
		}

		function loadMoreFn() {
			getData(tag, offset)
		}

		loadMore.value = loadMoreFn
	}

	return {
		isBest,
		title,
		bestTags,
		bestPlaylist,
		bestTag,
		loadMore,
		playlists,
		more
	}
}