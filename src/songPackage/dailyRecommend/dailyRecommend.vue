<template>
	<view class="container">
		<!-- 头部 -->
		<view class="header">
			<view class="tabs">
				<view class="tabs_wrapper">
					<view class="tab active">默认推荐</view>
					<view class="tab">风格推荐</view>
				</view>
			</view>
			<text class="iconfont icon-gengduo-shuxiang"></text>
		</view>

		<!-- 歌曲列表 -->
		<songList class="songList" :songs="dailySongs"></songList>
	</view>
</template>
<script setup>
	import {
		hGetDailySongs
	} from '@/hooks/dailyRecommend.js'

	let dailySongs = hGetDailySongs()
</script>

<script>
	export default {
		name: 'daliyRecommend'
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 80rpx;

		.header {
			position: fixed;
			top: 20rpx;
			left: 0;
			right: 0;
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;

			.tabs {
				flex: 1;
				display: flex;
				justify-content: center;

				.tabs_wrapper {
					display: flex;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 30rpx;

					.tab {
						width: 200rpx;
						border-radius: 30rpx;
						line-height: 60rpx;
						text-align: center;
						font-size: 25rpx;

						&.active {
							background-color: #fff;
						}
					}
				}
			}

			.iconfont {
				font-size: 45rpx;
			}
		}

		.songList {
			position: sticky;
			top: 280rpx;
		}
	}
</style>