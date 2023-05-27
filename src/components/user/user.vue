<template>
	<view class="user">
		<view class="image_wrapper">
			<image class="avatar" :src="imgUrl" mode="" @error="handleImageError">
			</image>
			<view class="iconfont_wrapper">
				<text class="iconfont icon-yinle"></text>
			</view>
		</view>
		<view class="middle_container">
			<text class="user_name">{{user.nickname}}</text>
			<view class="short_info">{{user.userType == 4 && '网易音乐人' || user.signature}}</view>
		</view>
		<view class="attention">
			<text class="iconfont icon-jiahao"></text>
			<text>关注</text>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		user: {
			type: Object,
			require: true
		}
	})

	const imgUrl = ref(props.user.avatarUrl)

	function handleImageError() {
		console.log('图片加载错误');
		imgUrl.value = '/static/images/myMusic/default_avatar.png'
	}
</script>

<script>
	export default {
		name: "user",
	}
</script>

<style lang="scss" scoped>
	.user {
		padding: 0 20rpx;
		display: flex;
		margin-bottom: 20rpx;
		align-items: center;

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
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin-left: 20rpx;

			.user_name {
				font-size: 28rpx;
			}

			.short_info {
				font-size: 20rpx;
				color: #989898;
				width:450rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
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