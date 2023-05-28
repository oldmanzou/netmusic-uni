<template>
	<view class="playlist" @click="toPlaylistPage">
		<image class="cover" :src="playlist.coverImgUrl" mode=""></image>
		<view class="playlist_info">
			<view class="name">{{playlist.name}}</view>
			<text class="other_info">{{playlist.trackCount}}首, by {{playlist.creator.nickname}},
				播放{{formatPlayCount(playlist.playCount)}}次</text>
		</view>
	</view>
</template>

<script setup>
	import {
		formatPlayCount
	} from '@/utils/format.js'

	const props = defineProps({
		playlist: {
			type: Object,
			require: true
		}
	})

	function toPlaylistPage() {
		uni.navigateTo({
			url: `/songPackage/playlist/playlist?id=${props.playlist.id}`
		})
	}
</script>

<script>
	export default {
		name: "playlist",
	}
</script>

<style lang="scss" scoped>
	.playlist {
		padding: 0 20rpx;
		display: flex;
		margin-bottom: 20rpx;

		.cover {
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
		}

		.playlist_info {
			flex: 1;
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.name {
				font-size: 28rpx;
				width: 550rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.other_info {
				font-size: 20rpx;
				color: #989898;
			}
		}
	}
</style>