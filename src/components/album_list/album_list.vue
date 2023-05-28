<template>
	<scroll-view scroll-y="true" class="scrollWrapper" @scrolltolower="reachBottom">
		<album v-for="album in albums.albums" :key="album.id" :album="album"></album>
		
		<view class="loadAnimation" v-show="isShowLoading">
			<text class="iconfont icon-jiazaizhong"></text>
			<text class="txt">正在加载中！</text>
		</view>
		<view class="noMore" v-if="!albums.more">没有更多专辑了~</view>
	</scroll-view>
</template>

<script setup>
	defineProps({
		albums: {
			type: Object,
		}
	})
	
	const emit = defineEmits(['albumReachBottom'])
	
	let isShowLoading = ref(false)
	
	function reachBottom() {
		isShowLoading.value = true
		setTimeout(() => {
			isShowLoading.value = false
		}, 1500)
		
		emit('albumReachBottom')
	}
</script>

<script>
	export default {
		name:"album_list"
	}
</script>

<style lang="scss" scoped>  
.scrollWrapper {
	padding-top: 10rpx;
	width: 100%;
	height: calc(100vh - 168rpx);
	
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