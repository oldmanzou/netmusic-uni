<template>
	<view class="container">
		<view class="title">
			<text>{{title}}</text>
			<text class="iconfont icon-xiangyou1"></text>
		</view>
		<scroll-view scroll-x="true" class="playlist">
			<view class="wrapper">
				<view class="item" v-for="item in playlist" :key="item.id">
					<image class="coverImg" :src="item.picUrl" />
					<text class="dis">{{item.name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "playList",
		props: {
			title: {
				type: String,
				default: '标题'
			},
			playlist: {
				type: Array,
				default () {
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 375rpx;
		margin-top: 20rpx;
	}

	.title {
		font-size: 30rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-weight: bold;

		.iconfont {
			font-size: 25rpx;
			margin-left: 5rpx;

		}
	}

	.playlist {
		.wrapper {
			width: 225%;
			display: flex;

			.item {
				width: 250rpx;
				margin-right: 20rpx;
				display: flex;
				flex-direction: column;
				align-items: center;

				.coverImg {
					width: 100%;
					height: 255rpx;
					border-radius: 15rpx;
				}

				.dis {
					font-size: 21rpx;
				}

				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
</style>