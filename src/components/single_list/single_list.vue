<template>
	<scroll-view scroll-y="true" class="single_container" @scrolltolower="reachBottom">
		<view class="single_header">
			<text class="iconfont icon-24gf-playCircle"></text>
			<text class="title">播放全部</text>
			<text class="iconfont icon-quanxuan"></text>
		</view>
		<view class="single_list">
			<single :single="single" v-for="single in singles.songs" :key="`${single.id}${single.name}`"></single>
		</view>

		<view class="loadAnimation" v-show="isShowLoading">
			<text class="iconfont icon-jiazaizhong"></text>
			<text class="txt">歌曲正急速驶来！</text>
		</view>
		<view class="noMore" v-if="!singles.more">没有更多单曲了~</view>
	</scroll-view>
</template>

<script setup>
	defineProps({
		singles: {
			type: Object,
			require: true
		}
	})

	const emit = defineEmits(['singleReachBottom'])

	let isShowLoading = ref(false)

	// 触底
	function reachBottom() {
		isShowLoading.value = true
		setTimeout(() => {
			isShowLoading.value = false
		}, 1500)
		emit('singleReachBottom')
	}
</script>

<script>
	export default {
		name: "single_list",
	}
</script>

<style lang="scss" scoped>
	.single_container {
		background-color: #fff;
		padding: 0 20rpx;
		box-sizing: border-box;
		height: calc(100vh - 168rpx);

		.single_header {
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #e6e6e6;
			// padding: 0 20rpx;

			.icon-24gf-playCircle {
				color: #d53c36;
				font-size: 38rpx;
			}

			.title {
				flex: 1;
				font-size: 30rpx;
				font-weight: 400;
			}

			.icon-quanxuan {
				font-size: 35rpx;
				color: #000;
				font-weight: 700;
			}
		}

		.loadAnimation {
			height: 90rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #d53c36;

			.iconfont {
				font-size: 38rpx;
				animation: fontRotate linear 1s infinite;
			}

			@keyframes fontRotate {
				from {
					transform: rotate(0);
				}

				to {
					transform: rotate(360deg);
				}
			}

			.txt {
				margin-top: 5rpx;
				font-size: 25rpx;
				font-weight: 700;
			}
		}

		.noMore {
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 20rpx;
			color: #989898;
		}
	}
</style>