import request from '@/utils/request.js'

// 获取默认搜索关键字
export function getDefaultSearchKeyword() {
	return request('/search/default')
}

// 获取banner列表
export function getBanners() {
	return request('/banner?type=2')
}

// export function 获取推荐歌单
export function getPersonalized(limit = 6) {
	return request('/personalized', {
		limit
	})
}