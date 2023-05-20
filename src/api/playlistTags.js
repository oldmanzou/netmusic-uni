import request from '@/utils/request.js'

// 获取所有歌单标签
export function getAllTag() {
	return request('/playlist/catlist')
}

// 获取精品歌单标签
export function getBestTag() {
	return request('/playlist/highquality/tags')
}