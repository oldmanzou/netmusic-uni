<template>
	<scroll-view scroll-y="true" @scrolltolower="reachBottom" class="scrollWrapper">
		<voicecom v-for="voice in voices.voices" :key="voice.resourceId" :voice="voice"></voicecom>

		<view class="loadAnimation" v-show="isShowLoading">
			<text class="iconfont icon-jiazaizhong"></text>
			<text class="txt">歌曲正急速驶来！</text>
		</view>
		<view class="noMore" v-if="!voices.more">没有更多声音了~</view>
	</scroll-view>
</template>

<script setup>
	defineProps({
		voices: Object
	})

	const emit = defineEmits(['voiceReachBottom'])

	let isShowLoading = ref(false)
	
	function reachBottom() {
		isShowLoading.value = true
		setTimeout(() => {
			isShowLoading.value = false
		}, 1500)
		
		emit('voiceReachBottom')
	}
</script>

<script>
	export default {
		name: "voice_list"
	}
</script>

<style lang="scss" scoped>
	.scrollWrapper {
		height: calc(100vh - 168rpx);
		overflow: hidden;

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