<template>
	<view class="single" v-if="single" @click="toPlayPage">
		<view class="left">
			<view class="name">{{single.name}}</view>
			<view class="dis">{{single.ar.map(a => a.name).join('/')}} - {{single.al.name}}</view>
		</view>
		<view class="right">
			<text class="iconfont icon-shipin"></text>
			<text class="iconfont icon-gengduo-shuxiang"></text>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		single: {
			type: Object,
			require: true
		}
	})

	function toPlayPage() {
		uni.navigateTo({
			url: `/songPackage/play/play?songId=${props.single.id}`
		})
	}
</script>

<script>
	export default {
		name: "single1",
	}
</script>

<style lang="scss" scoped>
	.single {
		padding: 15rpx 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid #e5e5e5 !important;
		margin: 0 20rpx;

		&:last-child {
			border-bottom: none;
		}

		.left {
			flex: 1;

			.name {
				font-size: 26rpx;
				width: 560rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.dis {
				font-size: 22rpx;
				color: #989898;
			}
		}

		.right {
			.iconfont {
				margin-left: 10rpx;
				color: #989898;
			}
		}
	}
</style>