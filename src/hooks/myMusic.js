import {
	getUserDetail
} from '@/api/user.js'
import {
	getUserPlaylistNum,
	getUserPlaylists
} from '@/api/myMusic.js'

// 获取用户详情
export function hGetUserDetail() {
	const userProfile = JSON.parse(uni.getStorageSync('userProfile') || "{}")
	const userId = userProfile.userId
	let userDetail = ref({})

	userId && getUserDetail(userId).then(res => {
		userDetail.value = res
		console.log(userDetail.value);
	})

	return userDetail
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function hGetUserPlaylistNum() {
	const userPlaylistNum = ref({})

	getUserPlaylistNum().then(res => {
		userPlaylistNum.value = res
	})

	return userPlaylistNum
}

// 获取用户歌单 (喜欢 创建 收藏)
export function hGetUserPlaylists() {
	const userLikePlaylist = ref({}) // “我喜欢”歌单
	const userCreatedPlaylist = ref([]) // 用户创建的歌单
	const userConcernedPlaylist = ref([]) // 用户关注的歌单

	const userProfile = JSON.parse(uni.getStorageSync('userProfile') || "{}")
	const userId = userProfile.userId
	let userDetail = ref({})

	userId && getUserPlaylists(userId).then(res => {
		res.playlist.forEach(p => {
			if (p.userId == userId && /.+?喜欢的音乐$/.test(p.name)) {
				userLikePlaylist.value = p
			} else if (p.userId == userId && !/.+?喜欢的音乐$/.test(p.name)) {
				userCreatedPlaylist.value.push(p)
			} else {
				userConcernedPlaylist.value.push(p)
			}
		})
	})

	return {
		userLikePlaylist,
		userCreatedPlaylist,
		userConcernedPlaylist
	}
}