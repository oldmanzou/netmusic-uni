<template>
	<view class="container">
		<view class="header">
			<scroll-view scroll-x="true" class="tagScroll">
				<u-tabs :list="tags" :current="1" lineColor="#dd001b" lineWidth="30rpx" @click="tagClick"></u-tabs>
			</scroll-view>
			<text class="iconfont icon-ziyuanxhdpi" @click="toPlaylistTagsPage"></text>
		</view>

		<playlist-y :tag="currentTag" :reachBottom="reachBottom" @update:reachBottom="cancelReachBottom"></playlist-y>
	</view>
</template>

<script setup>
	const store = useStore()
	let tags = computed(() => store.state.playlistTags.userSelectTags)
	let currentTag = ref('官方')
	let reachBottom = ref(false)

	function toPlaylistTagsPage() {
		uni.navigateTo({
			url: '/pages/playlistTags/playlistTags'
		})
	}

	function tagClick(index) {
		currentTag.value = index.name
	}

	onReachBottom(() => {
		reachBottom.value = true
	})

	function cancelReachBottom(e) {
		reachBottom.value = e
	}
</script>
<script>
	export default {
		name: 'playlistSquare'
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 80rpx 30rpx 0;
		
		.header {
			z-index: 1;
			background-color: #fff;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			padding: 0 30rpx;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.tagScroll {
				width: 600rpx;
				margin-left: -20rpx;
			}
		}
	}
</style>