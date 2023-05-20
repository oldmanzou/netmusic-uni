import request from '@/utils/request.js'

// 获取每日推荐歌曲列表
export function getDailySongs() {
	return request('/recommend/songs')
}

// 获取精品歌单
export function getBestPlaylist(limit = 21, before, tag) {
	const requesObj = {
		limit
	}
	if (tag) requesObj['tag'] = tag
	if (before) requesObj['before'] = before

	return request('/top/playlist/highquality', requesObj)
}

// 获取普通歌单(all 或 tag)
export function getPlaylists(tag = 全部, offset = 0, limit = 50) {
	return request(`/top/playlist?cat=${tag}&limit=${limit}&offset=${offset}`)
}

// 获取歌单详情
export function getPlaylistDetail(id) {
	return request(`/playlist/detail?id=${id}`)
}