<template>
	<view class="podcast">
		<image :src="podcast.picUrl" mode="" class="cover"></image>
		<view class="podcast_info">
			<view class="name">{{podcast.name}}</view>
			<view class="dis">{{podcast.programCount}}个声音, 播放{{formatPlayCount(podcast.playCount)}}次, by
				{{podcast.dj.nickname}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		formatPlayCount
	} from '@/utils/format.js'

	defineProps({
		podcast: {
			type: Object,
			require: true
		}
	})
</script>

<script>
	export default {
		name: "podcastcom"
	}
</script>

<style lang="scss" scoped>
	.podcast {
		display: flex;
		padding: 0 20rpx;
		margin-bottom: 20rpx;

		.cover {
			width: 80rpx;
			height: 80rpx;
			border-radius: 15rpx;
		}

		.podcast_info {
			flex: 1;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.name {
				font-size: 28rpx;
				width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.dis {
				font-size: 20rpx;
				color: #989898;
				width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>