<template>
	<view class="album">
		<image class="cover" :src="album.picUrl" mode=""></image>
		<view class="info">
			<view class="name">{{album.name}}</view>
			<view class="dis">{{album.artist.name}} {{formatDate(album.publishTime)}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		formatDate,
	} from '@/utils/format.js'

	defineProps({
		album: {
			type: Object,
			require: true
		}
	})
</script>

<script>
	export default {
		name: "album",
	}
</script>

<style lang="scss" scoped>
	.album {
		padding: 0 20rpx;
		display: flex;
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
				width: 480rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: #989898;
			}
		}
	}
</style>