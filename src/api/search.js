import request from '@/utils/request.js'

// 获取默认搜索关键词
export function getDefaultKeyword() {
	return request('/search/default')
}

// 搜索 该接口返回的字段比较全，但不不完整，如“声音”这个类型获取不到
export function getSearchResult(keyword, type = 1, limit = 9, offset = 0) {
	return request(`/cloudsearch?keywords=${keyword}&type=${type}&limit=${limit}&offset=${offset}`)
}

// 搜索 该接口返回的字段比较简短
export function getEasySearchResult(keyword, type = 1, limit = 15, offset = 0) {
	return request(`/search?keywords=${keyword}&type=${type}&limit=${limit}&offset=${offset}`)
}