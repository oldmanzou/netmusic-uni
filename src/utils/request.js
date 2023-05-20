import {
	baseUrl
} from './config.js'

export default (url, data = {}, method = 'GET') => {
	return new Promise((resolve, reject) => {
		uni.request({
			url:baseUrl + url,
			data: {
				cookie: uni.getStorageSync('cookie'),
				...data
			},
			method,
			success: res => {
				resolve(res.data)
			},
			fail: err => {
				reject(err)
			}
		})
	})
}