<template>
	<view class="artist">
		<view class="image_wrapper">
			<image class="avatar" :src="artist.picUrl" mode=""></image>
		</view>
		<view class="middle_container">
			<text class="artist_name">歌手: {{artist.name}} {{ artist?.alia?.[0] && `(${artist?.alia?.[0]})` }}</text>
			<text class="iconfont icon-fans">TA的乐迷团 ></text>
		</view>
		<view class="attention">
			<text class="iconfont icon-jiahao"></text>
			<text>关注</text>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		artist: {
			type: Object,
			require: true
		}
	})
</script>

<script>
	export default {
		name: "artist",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.artist {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;

		.image_wrapper {
			position: relative;
			width: 80rpx;
			height: 80rpx;

			.avatar {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.iconfont_wrapper {
				position: absolute;
				bottom: 4rpx;
				right: -10rpx;
				background-color: #d53c36;
				border-radius: 50%;
				width: 35rpx;
				height: 35rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.iconfont {
					color: #fff;
					font-size: 25rpx;
				}
			}
		}

		.middle_container {
			flex: 1;
			margin-left: 25rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.artist_name {
				font-size: 28rpx;
			}

			.short_info {
				font-size: 20rpx;
				color: #969696;
			}

			.icon-fans {
				font-size: 22rpx;
				color: #587b97;
			}
		}

		.attention {
			border: 1rpx solid #d53c36;
			width: 100rpx;
			height: 40rpx;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 20rpx;
			color: #d53c36;
		}
	}
</style>