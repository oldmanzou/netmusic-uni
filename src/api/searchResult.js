import request from '@/utils/request.js'

// 搜索多重匹配
export function getMultimatch(keywords) {
	return request(`/search/multimatch?keywords=${keywords}`)
}

