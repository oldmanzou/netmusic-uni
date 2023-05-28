<template>
	<view class="header">
		<view @click="handleLooseLogin" class="looseLoginBtn">立即体验</view>
	</view>

	<view class="logo">
		<image src="@/static/images/logo.jpg" />
	</view>

	<view class="qrCode">
		<canvas v-if="isShowQr" style="width: 200px; height: 200px;" canvas-id="myQrcode"></canvas>
		<u-button @click="showQr" size="mini" type="primary" shape="circle">切换二维码登录</u-button>
	</view>
</template>

<script setup>
	import {
		qrLogin
	} from '@/hooks/login.js'
	import {
		looseLogin
	} from '@/api/login.js'

	let isShowQr = ref(false)

	// 游客登录
	async function handleLooseLogin() {
		const result = await looseLogin()
		console.log(result);
		uni.setStorageSync('cookie', result.cookie)
		uni.setStorageSync('userProfile', JSON.stringify({
			userId: result.userId
		}))

		// 需要切换到index
		uni.switchTab({
			url: '/pages/index/index'
		})
	}

	// 显示二维码
	function showQr() {
		isShowQr.value = true

		qrLogin()
	}
</script>

<script>
	export default {
		name: 'Login',
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		line-height: 60rpx;
		height: 60rpx;

		.looseLoginBtn {
			float: right;
			margin-right: 20rpx;
			font-size: 25rpx;
			color: #333;
			font-weight: bold;
		}
	}

	.logo {
		height: 400rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
		}
	}

	.qrCode {
		display: flex;
		flex-direction: column;
		align-items: center;

		canvas {
			width: 400rpx;
			height: 400rpx;
		}
		
		:deep(.u-button) {
			margin-top: 20rpx;
			width: 180rpx;
			height: 70rpx;
			font-weight: bold;
		}
	}
</style>