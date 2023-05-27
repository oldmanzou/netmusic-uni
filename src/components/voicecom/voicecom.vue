<template>
	<view class="voice" v-if="voice.baseInfo">
		<image :src="voice.baseInfo.coverUrl" mode="" class="cover"></image>
		<view class="info">
			<view class="name">{{voice.baseInfo.name}}</view>
			<view class="dis">{{formatTime(voice.baseInfo.duration)}}, by {{voice.baseInfo.dj.nickname}},
				播放{{formatPlayCount(voice.baseInfo.listenerCount)}}次</view>
		</view>
		<text class="iconfont icon-yunhang"></text>
	</view>
</template>

<script setup>
	import {
		formatTime,
		formatPlayCount
	} from '@/utils/format.js'

	defineProps({
		voice: {
			type: Object,
			require: true
		}
	})
</script>

<script>
	export default {
		name: "voicecom"
	}
</script>

<style lang="scss" scoped>
	.voice {
		backgroud:red;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;

		.cover {
			width: 80rpx;
			height: 80rpx;
			border-radius: 15rpx;
		}

		.info {
			flex: 1;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.name {
				font-size: 28rpx;
				width: 480rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.dis {
				font-size: 20rpx;
				color: #989898;
			}
		}

		.iconfont {
			font-size: 48rpx;
			color: #d53c36;
		}
	}
</style>