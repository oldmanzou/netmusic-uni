<template>
	<view class="indexContainer">
		<!-- 头部 -->
		<view class="header">
			<text class="iconfont icon-liebiao" @click="showLeftPopup"></text>
			<view class="inputWrapper">
				<text class="iconfont icon-sousuo"></text>
				<input type="text" :placeholder="defaultSearchKeyword" placeholder-class="placeholder">
				<text class="iconfont icon-saoma"></text>
			</view>
			<text class="iconfont icon-maikefeng"></text>
		</view>

		<sidebar :showPopup="showPopup" @update:showPopup="showPopup = $event"></sidebar>

		<!-- 广告swiper -->
		<swiper :indicator-dots="true" indicator-color="rgba(255,255,255,0.3)" indicator-active-color="#FFFFFF"
			:autoplay="true" :interval="3000" :duration="1000" class="bannerSwiper">
			<swiper-item v-for="item in banners" :key="item.pic">
				<image :src="item.pic" />
			</swiper-item>
		</swiper>

		<!-- 导航列表 -->
		<scroll-view scroll-x="true" class="navigator" enable-flex>
			<view class="nav_wrapper">
				<view class="nav_item" @click="toDailyPage">
					<text class="iconfont icon-rili"></text>
					<text class="nav_name">每日推荐</text>
				</view>
				<view class="nav_item">
					<text class="iconfont icon-shouyinji"></text>
					<text class="nav_name">私人FM</text>
				</view>
				<view class="nav_item" @click="toPlaylistSquare">
					<text class="iconfont icon-gedan"></text>
					<text class="nav_name">歌单</text>
				</view>
				<view class="nav_item">
					<text class="iconfont icon-paihangbang"></text>
					<text class="nav_name">排行榜</text>
				</view>
				<view class="nav_item">
					<text class="iconfont icon-tushu"></text>
					<text class="nav_name">有声书</text>
				</view>
				<view class="nav_item">
					<text class="iconfont icon-changpian"></text>
					<text class="nav_name">数字专辑</text>
				</view>
				<view class="nav_item">
					<text class="iconfont icon-guanzhu"></text>
					<text class="nav_name">关注新歌</text>
				</view>
				<view class="nav_item">
					<text class="iconfont icon-changge"></text>
					<text class="nav_name">一歌一遇</text>
				</view>
				<view class="nav_item">
					<text class="iconfont icon-jingjia"></text>
					<text class="nav_name">收藏家</text>
				</view>
				<view class="nav_item">
					<text class="iconfont icon-youxiyouxiji"></text>
					<text class="nav_name">游戏专区</text>
				</view>
			</view>
		</scroll-view>

		<!-- 推荐歌单 -->
		<playList-x title="推荐歌单" :playlist="personalized"></playList-x>

		<!-- 用户的雷达歌单 暂未找到接口 -->
		<!-- <playList title="小邹本邹的雷达歌单"></playList> -->
	</view>
</template>

<script setup>
	import {
		getSearchKeyword,
		hGetBanners,
		hGetPersonalized
	} from '@/hooks/home.js'

	// 未登录,跳转到登录页面
	const userProfile = uni.getStorageSync('userProfile')
	if (!userProfile) uni.navigateTo({
		url: '/pages/login/login'
	})

	let defaultSearchKeyword = getSearchKeyword() // 默认搜索关键字
	let banners = hGetBanners() // banners列表
	let personalized = hGetPersonalized() // 获取推荐歌单

	// 去每日推荐页面
	function toDailyPage() {
		uni.navigateTo({
			url: '/songPackage/dailyRecommend/dailyRecommend'
		})
	}

	// 去歌单广场
	function toPlaylistSquare() {
		uni.navigateTo({
			url: '/pages/playlistSquare/playlistSquare'
		})
	}
	
	// 是否显示左侧弹出框
	let showPopup = ref(false)
	
	function showLeftPopup() {
		showPopup.value = true
	}
</script>
<script>
	export default {
		name: 'Index'
	}
</script>

<style lang="scss" scoped>
	.indexContainer {
		padding: 60rpx 20rpx 0;

		// 头部
		.header {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1;
			height: 80rpx;
			background-color: #fff;
			line-height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;

			.inputWrapper {
				height: 60rpx;
				flex: 1;
				margin: 0 20rpx;
				display: flex;
				justify-content: space-between;
				background-color: #f3e3ed;
				border-radius: 30rpx;
				padding: 0 20rpx;

				input {
					height: 100%;
					flex: 1;
					margin-left: 10rpx;
				}

				.placeholder {
					font-size: 25rpx;
				}

				.icon-saoma {
					font-size: 40rpx;
				}
			}

			.icon-maikefeng {
				font-size: 38rpx;
			}
		}

		// 广告swiper
		.bannerSwiper {
			margin-top: 25rpx;
			border-radius: 10rpx;
			overflow: hidden;
			height: 196rpx;

			// 指示点样式
			:deep(.uni-swiper-dots) {
				left: 5%;
				bottom: 5%;

				.uni-swiper-dot {
					width: 10rpx;
					height: 10rpx;
				}
			}

			swiper-item {
				height: 196rpx;
			}

			image {
				width: 100%;
				height: 196rpx;
			}
		}

		// 导航列表
		.navigator {
			margin-top: 20rpx;
			height: 100rpx;

			.nav_wrapper {
				width: 200%;
				display: flex;

				.nav_item {
					width: 20%;
					display: flex;
					flex-direction: column;
					align-items: center;

					.iconfont {
						font-size: 60rpx;
						color: #d76861;
					}

					.nav_name {
						font-size: 19rpx;
						margin-top: 10rpx;
						color: #6c6c78;
					}
				}
			}
		}

		.playlist {
			position: relative;
			top: 20rpx;
		}



	}
</style>