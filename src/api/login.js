import request from '@/utils/request.js'

// 游客登录
export function looseLogin() {
	return request('/register/anonimous')
}


// 二维码部分API
export function getQrkey() {
	const timestamp = new Date()
	return request(`/login/qr/key?timestamp=${timestamp}`)
}

export function getQrimg(qrkey) {
	const timestamp = new Date()
	return request(`/login/qr/create?key=${qrkey}&timestamp=${timestamp}`)
}

export function getQrCheckStatus(qrkey) {
	const timestamp = new Date()
	return request(`/login/qr/check?key=${qrkey}&timestamp=${timestamp}`)
}

// 获取登录状态，返回的数据中包含用户uid,需要携带cookie
export function getLoginStatus() {
	return request(`/login/status?timestamp=${new Date()}`)
}

// 退出登录
export function logout() {
	return request('/logout')
}