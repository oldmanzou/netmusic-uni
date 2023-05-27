<template>
	<scroll-view scroll-y="true" @scrolltolower="reachBottom" class="playlists_container">
		<playlist v-for="playlist in playlists.playlists" :key="playlist.id" :playlist="playlist"></playlist>
		<view class="loadAnimation" v-show="isShowLoading">
			<text class="iconfont icon-jiazaizhong"></text>
			<text class="txt">歌曲正急速驶来！</text>
		</view>
		<view class="noMore" v-if="!playlists.more">没有更多单曲了~</view>
	</scroll-view>
</template>

<script setup>
	defineProps({
		playlists: {
			type: Object,
			require: true
		}
	})

	const emit = defineEmits(['playlistReachBottom'])

	// *********************************************
	let isShowLoading = ref(false)

	function reachBottom() {
		console.log('触底');
		isShowLoading.value = true
		setTimeout(() => {
			isShowLoading.value = false
		}, 1500)
		emit('playlistReachBottom')
	}
</script>

<script>
	export default {
		name: "playlist_list"
	}
</script>

<style lang="scss" scoped>
	.playlists_container {
		background-color: #fff;
		padding-top: 10rpx;
		height: calc(100vh - 168rpx);
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
</style>