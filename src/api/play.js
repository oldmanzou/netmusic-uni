import request from '@/utils/request.js'

// 获取歌曲详情
export function getSongDetail(songId) {
	return request(`/song/detail?ids=${songId}`)
}

// 获取歌曲音源url
export function getSongUrl(songId) {
	return request(`/song/url?id=${songId}`)
}

// 获取歌词
export function getLyric(songId) {
	return request(`/lyric?id=${songId}`)
}