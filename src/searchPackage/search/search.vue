<template>
	<view class="header">
		<view class="search_wrapper">
			<text class="iconfont icon-sousuo"></text>
			<input type="text" v-model.trim="inputValue" :placeholder="defaultKeyword"
				placeholder-class="input_placeholder" class="input">
		</view>
		<text class="search_btn" @click="clickSearchBtn">搜索</text>
	</view>

	<!-- tabs -->
	<view class="tabs">
		<view class="tab">
			<view class="tab_content">
				<text class="iconfont icon-yonghuguanli"></text>
				<view class="name">歌手</view>
			</view>
		</view>
		<view class="tab">
			<view class="tab_content">
				<text class="iconfont icon-music"></text>
				<view class="name">曲风</view>
			</view>
		</view>
		<view class="tab">
			<view class="tab_content">
				<text class="iconfont icon-icon-test"></text>
				<view class="name">专区</view>
			</view>
		</view>
		<view class="tab">
			<view class="tab_content">
				<text class="iconfont icon-tinggeshiqu1"></text>
				<view class="name">识曲</view>
			</view>
		</view>
	</view>

	<view class="bottom_container">
		<!-- 历史记录 -->
		<view class="history_container" v-show="isShowHistory">
			<view class="search_history">
				<view class="title">
					<text class="txt">搜索历史</text>
					<text class="iconfont icon-shanchu" @click="delHistory"></text>
				</view>
				<view class="history_list">
					<view class="history_item" v-for="h in historyArr" :key="h" @click="toSearchResultPage(h)">{{h}}</view>
				</view>
			</view>
		</view>

		<!-- 搜索结果 -->
		<view class="search_result" v-show="!isShowHistory">
			<view class="item" v-for="s in searchResultArr" :key="s.id" @click="toSearchResultPage(s.name)">
				<text class="iconfont icon-sousuo"></text>
				<view class="txt" v-html="s.richName"></view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		getKeyword,
		searchRelevant
	} from '@/hooks/search.js'

	const defaultKeyword = getKeyword()

	const {
		inputValue,
		searchResultArr,
		historyArr,
		isShowHistory,
		handleInput,
		delHistory
	} = searchRelevant()

	// 跳转搜索结果页面
	function toSearchResultPage(keyword) {
		uni.navigateTo({
			url: `/searchPackage/searchResult/searchResult?keyword=${keyword}`
		})
	}
	
	// 点击搜索按钮的回调
	function clickSearchBtn() {
		const keyword = inputValue.value.trim() || defaultKeyword.value
		toSearchResultPage(keyword)
	}
</script>

<script>
	export default {
		name: 'search'
	}
</script>

<style lang="scss" scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #d53c36;
		padding: 0 30rpx;

		.search_wrapper {
			margin-right: 20rpx;
			height: 55rpx;
			border-radius: 27.5rpx;
			padding-left: 25rpx;
			flex: 1;
			display: flex;
			align-items: center;
			background-color: rgba(255, 255, 255, 0.2);

			.iconfont {
				color: #fff;
				font-size: 28rpx;
				margin-right: 25rpx;
			}

			.input {
				width: 100%;
				height: 100%;
				caret-color: #fff;
				color: rgba(255, 255, 255, 0.8);
				font-size: 28rpx;

				:deep(.input_placeholder) {
					padding-left: 15rpx;
					color: rgba(255, 255, 255, 0.4);
					font-size: 28rpx;
				}
			}



		}

		.search_btn {
			font-size: 30rpx;
			color: rgba(255, 255, 255, 0.8);
		}
	}

	.tabs {
		position: fixed;
		top: 80rpx;
		width: 100%;
		height: 60rpx;
		display: flex;
		background-color: #f9f8fd;

		.tab {
			height: 100%;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;

			&:last-child .tab_content {
				border-right: none;
			}

			.tab_content {
				flex: 1;
				display: flex;
				justify-content: center;
				border-right: 1rpx solid #e2e3e7;

				.iconfont {
					font-size: 34rpx;
					color: #d53c36;
				}

				.name {
					margin-left: 8rpx;
					font-size: 27rpx;
				}
			}
		}
	}

	.bottom_container {
		height: 100%;
		background-color: #f9f8fd;

		.history_container {
			// background-color: #f9f8fd;
			// background-color: pink;

			.search_history {
				margin-top: 160rpx;
				padding: 0 20rpx;

				.title {
					height: 40rpx;
					margin-bottom: 10rpx;
					display: flex;
					justify-content: space-between;

					.txt {
						font-size: 23rpx;
						font-weight: bold;
					}
				}

				.history_list {
					display: flex;
					flex-wrap: wrap;

					.history_item {
						padding: 5rpx 15rpx;
						font-size: 23rpx;
						background-color: #fff;
						margin-right: 10rpx;
						margin-bottom: 20rpx;
						border-radius: 19rpx;
						max-width: 300rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}

		.search_result {
			margin-top: 160rpx;

			.item {
				display: flex;
				padding-left: 20rpx;
				height: 90rpx;
				line-height: 90rpx;

				.iconfont {
					margin-right: 15rpx;
				}

				.txt {
					font-size: 27rpx;
					flex: 1;
					border-bottom: 1rpx solid #eff0f4;

					// .keyword {
					// 	color: #95969a;
					// }
				}
			}
		}
	}
</style>