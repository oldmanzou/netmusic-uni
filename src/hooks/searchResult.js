import {
	getMultimatch
} from '@/api/searchResult.js';
import {
	getSearchResult,
	getEasySearchResult
} from '@/api/search.js'

// 综合-搜索多重匹配
export function hGetMultimatch(inputValue) {
	let multimatch = ref({})

	watch(inputValue, () => {
		getMultimatch(inputValue.value).then(res => {
			if (res.code == 200) {
				multimatch.value = res.result
			}
		})
	}, {
		immediate: true
	})

	return multimatch
}

// 综合-搜索所有类型的数据
export function searchAllTypeContent(inputValue) {
	let playlist = ref({}) // 歌单 不需要，综合提供
	let video = ref({}) // 视频 t
	let podcast = ref({}) // 播客(电台) t
	let artist = ref({}) // 歌手 不需要，综合提供
	let lyric = ref({}) // 歌词
	let album = ref({}) // 专辑 不需要，综合提供
	let voice = ref({}) // 声音 t
	let topic = ref({}) // 话题 f 无接口
	let user = ref({}) // 用户 不需要，综合提供

	watch(inputValue, getData, {
		immediate: true
	})

	function getData() {
		getVideo()
		getPodcast()
		getVoice()
	}



	function getPlaylist() {
		getSearchResult(inputValue.value, 1000, 5).then(({
			code,
			result
		}) => {
			if (code == 200) playlist.value = result
		})
	}

	function getVideo() {
		getSearchResult(inputValue.value, 1014, 5).then(({
			code,
			result
		}) => {
			if (code == 200) video.value = result
		})
	}

	function getPodcast() {
		getSearchResult(inputValue.value, 1009, 3).then(({
			code,
			result
		}) => {
			if (code == 200) {
				result.djRadios = result.djRadios.slice(0, 3)
				podcast.value = result
			}
		})
	}

	function getArtist() {
		getSearchResult(inputValue.value, 100, 3).then(({
			code,
			result
		}) => {
			if (code == 200) {
				artist.value = result
			}
		})
	}

	function getLyric() {}

	function getAlbum() {
		getSearchResult(inputValue.value, 10, 3).then(({
			code,
			result
		}) => {
			if (code == 200) {
				album.value = result
			}
		})
	}

	function getVoice() {
		getEasySearchResult(inputValue.value, 2000, 2).then(({
			code,
			data
		}) => {
			if (code == 200) {
				data.resources = data.resources.slice(0, 2)
				voice.value = data
			}
		})
	}

	// 无接口
	function getTopic() {}

	return {
		video,
		podcast,
		lyric,
		voice,
		topic,
	}
}

// 获取 综合 数据
export function getAllData(inputValue) {
	let allData = ref({})

	watch(inputValue, () => {
		getEasySearchResult(inputValue.value, 1018).then(({
			code,
			result
		}) => {
			if (code == 200) {
				allData.value = result
			}
		})
	})

	return allData
}

// 单曲
export function hSingle(inputValue) {
	let singles = ref({
		songs: [],
		more: true
	}) // 对象，包含曲目列表和more
	let offset = 0
	let loading = false

	watch(inputValue, () => {
		singles.vlaue = {
			songs: [],
			more: true
		}
		getSingleArr()
	})

	function getSingleArr() {
		if (singles.value.more && !loading) {
			loading = true
			getSearchResult(inputValue.value, 1, 11, offset).then(({
				code,
				result
			}) => {
				if (code == 200) {
					singles.value.songs.push(...result.songs)
					singles.value.more = (result.songCount > singles.value.songs.length)
					offset += result.songs.length

					loading = false
				}
			})
		}
	}

	function loadMoreSingle() {
		getSingleArr()
	}

	return {
		singles,
		loadMoreSingle
	}
}


// 歌单
export function hPlaylist(inputValue) {
	let playlists = ref({
		playlists: [],
		more: true
	}) // 对象，包含曲目列表和more
	let offset = 0
	let loading = false

	watch(inputValue, () => {
		playlists.vlaue = {
			playlists: [],
			more: true
		}
		getData()
	})

	function getData() {
		if (playlists.value.more && !loading) {
			loading = true
			getSearchResult(inputValue.value, 1000, 12, offset).then(({
				code,
				result
			}) => {
				if (code == 200 && result.playlistCount) {
					const playlistsId = playlists.value.playlists.map(p => p.id)
					result.playlists.forEach(p => {
						if (!playlistsId.includes(p.id)) {
							playlists.value.playlists.push(p)
						}
					})

					playlists.value.more = (result.playlistCount > playlists.value.playlists.length)
					offset += result.playlists.length

					loading = false
				} else if (code == 200 && !result.playlistCount) {
					playlists.value.more = false
				}
			})
		}
	}

	function loadMorePlaylist() {
		getData()
	}

	return {
		playlists,
		loadMorePlaylist
	}
}

// 视频
export function hVideo(inputValue) {
	let videos = ref({
		videos: [],
		more: true
	}) // 对象，包含曲目列表和more
	let offset = 0
	let loading = false

	watch(inputValue, () => {
		videos.vlaue = {
			videos: [],
			more: true
		}
		getData()
	})

	function getData() {
		if (videos.value.more && !loading) {
			loading = true
			getSearchResult(inputValue.value, 1014, 12, offset).then(({
				code,
				result
			}) => {
				if (code == 200 && result.videoCount) {
					const videoVids = videos.value.videos.map(v => v.vid)
					result.videos.forEach(v => {
						if (!videoVids.includes(v.vid)) {
							videos.value.videos.push(v)
						}
					})
					videos.value.more = (result.videoCount > videos.value.videos.length)

					offset += result.videos.length
					loading = false
				} else if (code == 200 && !result.videoCount) {
					videos.value.more = false
				}
				// console.log(result.videos.map(v => ({
				// 	title: v.title,
				// 	type: v.type
				// })));
			})
		}
	}

	function loadMoreVideo() {
		getData()
	}

	return {
		videos,
		loadMoreVideo
	}
}

// 歌手
export function hArtist(inputValue) {
	let artists = ref({
		artists: [],
		more: true
	}) // 对象，包含曲目列表和more
	let offset = 0
	let loading = false

	watch(inputValue, () => {
		artists.vlaue = {
			artists: [],
			more: true
		}
		getData()
	})

	function getData() {
		if (artists.value.more && !loading) {
			loading = true
			getSearchResult(inputValue.value, 100, 5, offset).then(({
				code,
				result
			}) => {
				if (code == 200 && result.artistCount) {
					const artistIds = artists.value.artists.map(a => a.id)
					result.artists.forEach(a => {
						if (!artistIds.includes(a.id)) {
							artists.value.artists.push(a)
						}
					})
					artists.value.more = (result.artistCount > artists.value.artists.length)

					offset += result.artists.length
					loading = false
				} else if (code == 200 && !result.artistCount) {
					artists.value.more = false
				}
			})
		}
	}

	function loadMoreArtist() {
		getData()
	}

	return {
		artists,
		loadMoreArtist
	}
}

// 专辑
export function hAlbum(inputValue) {
	let albums = ref({
		albums: [],
		more: true
	}) // 对象，包含曲目列表和more
	let offset = 0
	let loading = false

	watch(inputValue, () => {
		albums.vlaue = {
			albums: [],
			more: true
		}
		getData()
	})

	function getData() {
		if (albums.value.more && !loading) {
			loading = true
			getSearchResult(inputValue.value, 10, 15, offset).then(({
				code,
				result
			}) => {
				if (code == 200 && result.albumCount) {
					const albumIds = albums.value.albums.map(u => u.id)
					result.albums.forEach(a => {
						if (!albumIds.includes(a.id)) {
							albums.value.albums.push(a)
						}
					})
					albums.value.more = (result.albumCount > albums.value.albums.length)

					offset += result.albums.length
					loading = false
				} else if (code == 200 && !result.albumCount) {
					albums.value.more = false
				}
			})
		}
	}

	function loadMoreAlbum() {
		getData()
	}

	return {
		albums,
		loadMoreAlbum
	}
}

// 声音
export function hVoice(inputValue) {
	let voices = ref({
		voices: [],
		more: true
	}) // 对象，包含曲目列表和more
	let offset = 0
	let loading = false

	watch(inputValue, () => {
		voices.vlaue = {
			voices: [],
			more: true
		}
		getData()
	})

	function getData() {
		if (voices.value.more && !loading) {
			loading = true
			getEasySearchResult(inputValue.value, 2000, 20, offset).then(({code,data}) => {
				if (code == 200 && data.totalCount) {
					const voiceIds = voices.value.voices.map(v => v.resourceId)
					data.resources.forEach(v => {
						if (!voiceIds.includes(v.resourceId)) {
							voices.value.voices.push(v)
						}
					})
					voices.value.more = (data.totalCount > voices.value.voices.length)

					offset += data.resources.length
					loading = false
				} else if (code == 200 && !data.totalCount ) {
					voices.value.more = false
				}
			})
		}
	}

	function loadMoreVoice() {
		getData()
	}

	return {
		voices,
		loadMoreVoice
	}
}


// 用户
export function hUser(inputValue) {
	let users = ref({
		users: [],
		more: true
	}) // 对象，包含曲目列表和more
	let offset = 0
	let loading = false

	watch(inputValue, () => {
		users.vlaue = {
			users: [],
			more: true
		}
		getData()
	})

	function getData() {
		if (users.value.more && !loading) {
			loading = true
			getSearchResult(inputValue.value, 1002, 15, offset).then(({
				code,
				result
			}) => {
				if (code == 200 && result.userprofileCount) {
					const userIds = users.value.users.map(u => u.userId)
					result.userprofiles.forEach(u => {
						if (!userIds.includes(u.userId)) {
							users.value.users.push(u)
						}
					})
					users.value.more = (result.userprofileCount > users.value.users.length)

					offset += result.userprofiles.length
					loading = false
				} else if (code == 200 && !result.userprofileCount) {
					users.value.more = false
				}
			})
		}
	}

	function loadMoreUser() {
		getData()
	}

	return {
		users,
		loadMoreUser
	}
}