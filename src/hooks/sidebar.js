import {
	logout
} from '@/api/login.js'

// 弹出框部分
export function changePopup(props, emit) {
	let isShowLeftPopup = computed({
		get() {
			return props.showPopup
		},
		set(newValue) {
			emit('update:showPopup',newValue)
		}
	})


	// let isShowLeftPopup = ref(false)
	let isShowBottomPopup = ref(false)

	function closeLeftPopup() {
		isShowLeftPopup.value = false
	}

	// 显示底部弹出框
	function showBottomPopup() {
		isShowBottomPopup.value = true
	}

	function closeBottomPopup() {
		isShowBottomPopup.value = false
	}

	return {
		isShowLeftPopup,
		isShowBottomPopup,
		showBottomPopup,
		closeBottomPopup,
		closeLeftPopup
	}
}

// 用户简介部分
export function getUserProfile() {
	const userProfile = JSON.parse(uni.getStorageSync('userProfile') || "{}")
	return userProfile
}

// 拟态框部分
export function hLogout() {
	let isShowLogoutModal = ref(false)

	// 显示退出登录的拟态框
	function showLogoutModal() {
		isShowLogoutModal.value = true
	}

	function userLogout() {
		logout().then(({
			code
		}) => {
			if (code == 200) {
				isShowLogoutModal.value = false
				uni.clearStorageSync();
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		})
	}

	return {
		isShowLogoutModal,
		showLogoutModal,
		userLogout
	}
}