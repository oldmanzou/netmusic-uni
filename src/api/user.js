import request from '@/utils/request.js'

export function getUserDetail(uid) {
	return request(`/user/detail/?uid=${uid}`)
}