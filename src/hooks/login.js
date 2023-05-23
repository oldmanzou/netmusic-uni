import drawQrcode from 'weapp-qrcode'
import {
	getQrkey,
	getQrimg,
	getQrCheckStatus,
	getLoginStatus
} from '@/api/login.js'

export function qrLogin() {
	let qrKey = ''

	createQrcode()

	// 生成二维码
	async function createQrcode() {
		let qrImgUrl = ''

		// key
		const res1 = await getQrkey()
		qrKey = res1.data.unikey

		// 获取二维码图片
		const res2 = await getQrimg(qrKey)
		qrImgUrl = res2.data.qrurl
		console.log(qrImgUrl);

		drawQrcode({
			width: 200,
			height: 200,
			canvasId: 'myQrcode',
			text: qrImgUrl
		})

		qrCheck() // 轮询
	}

	// 扫码轮询
	async function qrCheck() {
		const {
			code,
			cookie
		} = await getQrCheckStatus(qrKey)

		switch (code) {
			case 801:
				setTimeout(qrCheck, 500)
				break
			case 802:
				setTimeout(qrCheck, 500)
				break
			case 803:
				login(cookie)
				uni.setStorageSync('cookie', cookie)
				break
		}
	}

	async function login(cookie) {
		const statusRes = await getLoginStatus(cookie)
		console.log(statusRes);
		if(statusRes.data.profile) {
			uni.setStorageSync('userProfile', JSON.stringify(statusRes.data.profile))
			
			uni.navigateTo({
				url: '/pages/index/index'
			})
		}else {
			uni.showToast({
				title:'扫码失败,请重新扫码'
			})
			
			createQrcode()
		}
	}
}