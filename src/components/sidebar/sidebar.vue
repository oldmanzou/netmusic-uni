<template>
	<u-popup mode="left" :show="isShowLeftPopup" @close="closeLeftPopup">
		<view class="popup_container">
			<view class="popup_header">
				<image class="avatar" :src="userProfile.avatarUrl" mode=""></image>
				<text class="username">{{userProfile.nickname}}</text>
				<text class="iconfont icon-xiangyou1"></text>
				<text class="iconfont icon-saoma1"></text>
			</view>

			<!-- 退出登录 -->
			<view class="logout_btn" @click="showBottomPopup">
				退出登录/关闭
			</view>
		</view>

		<!-- 底部弹出框 -->
		<u-popup :show="isShowBottomPopup" round="15" class="b_popup" @close="closeBottomPopup">
			<view class="bottom_popup_container">
				<view class="bottom_popup_title">
					退出登录/关闭
				</view>
				<view class="btns">
					<navigator class="btn" open-type="exit" target="miniProgram">关闭云音乐</navigator>
					<view class="btn" @click="showModal">退出云音乐登录</view>
				</view>
			</view>
		</u-popup>

		<!-- 退出登录的拟态框 -->
		<u-modal :show="isShowLogoutModal" content="确定退出当前账号吗?" showCancelButton confirmText="退出" cancelText="取消"
			confirmColor="#c04745" cancelColor="#c04745" @confirm="logout"
			@cancel="isShowLogoutModal= false"></u-modal>
	</u-popup>
</template>

<script setup>
	const props = defineProps({
		// 是否显示左侧popup
		showPopup: {
			type: Boolean,
			default: false
		}
	})

	const emit = defineEmits(['update:showPopup'])

	import {
		changePopup,
		getUserProfile,
		hLogout
	} from '@/hooks/sidebar'

	// ***********弹出框部分***********
	let {
		isShowLeftPopup,
		isShowBottomPopup,
		showBottomPopup,
		closeBottomPopup,
		closeLeftPopup
	} = changePopup(props,emit)

	// ***********用户简介部分***********
	let userProfile = getUserProfile()

	// ***********拟态框部分***********
	const {
		isShowLogoutModal,
		showLogoutModal,
		userLogout
	} = hLogout()

	function showModal() {
		closeBottomPopup()
		showLogoutModal()
	}
	
	function logout() {
		closeLeftPopup()
		userLogout()
	}
</script>

<script>
	export default {
		name: "sidebar"
	}
</script>

<style lang="scss" scoped>
	.popup_container {
		box-sizing: border-box;
		width: 633rpx;
		height: 100%;
		padding: 30rpx 30rpx 50rpx;
		background-color: #f6f6f6;
		// background-color: pink;

		.popup_header {
			display: flex;
			align-items: center;

			.avatar {
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
			}

			.username {
				margin-left: 15rpx;
				font-size: 28rpx;
			}

			.icon-xiangyou1 {
				flex: 1;
				margin-left: 5rpx;
				font-size: 28rpx;
			}

			.icon-saoma1 {
				font-size: 40rpx;
			}
		}

		.logout_btn {
			margin-top: 25rpx;
			width: 100%;
			height: 70rpx;
			background-color: #fff;
			border-radius: 15rpx;
			text-align: center;
			line-height: 70rpx;
			color: #d53b37;
			font-size: 30rpx;
		}
	}

	// 样式穿透无效
	// :deep(.u-popup__content) {
	// 	width: 631rpx;
	// 	flex: none;
	// }

	.bottom_popup_container {
		box-sizing: border-box;
		width: 633rpx;

		.bottom_popup_title {
			height: 70rpx;
			font-size: 22rpx;
			color: #666;
			line-height: 70rpx;
			padding-left: 25rpx;
			border-bottom: 1rpx solid #666;
		}

		.btns {
			.btn {

				height: 70rpx;
				font-size: 25rpx;
				line-height: 70rpx;
				padding-left: 25rpx;
			}
		}
	}

	// 拟态框部分 无效
	// :deep(.u-popup__content) {
	// 	.u-line {
	// 		border: none;
	// 	}
	// }
</style>