<template>
	<view class="container">
		<div v-if="isBest" class="header">
			<text class="title">{{title}}</text>
			<view class="filter">
				<text class="iconfont icon-shaixuan"></text>
				<text class="txt" @click="openPopup">筛选</text>
			</view>
		</div>

		<!-- 筛选 -->
		<u-popup :show="showPopup" :round="10" @close="closePopup">
			<view class="popupContainer">
				<view class="popupHeader">
					所有精品歌单
				</view>
				<view class="listContainer">
					<scroll-view scroll-y="true" class="tagScroll">
						<view class="all">
							全部精选
						</view>
						<view class="list">
							<view class="item" v-for="item in bestTags" :key="item.id">
								{{item.name}}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>

		<!-- 歌单列表 -->
		<view class="playlists">
			<view class="playlist" v-for="item in (isBest ?  bestPlaylist : playlist)" :key="item.id"
				@click="toPlaylistPage(item.id)">
				<image :src="item.coverImgUrl" class="cover"></image>
				<text class="discription">{{item.name}}</text>
				<view class="playCount">
					<text class="iconfont icon-bofang1"></text>
					<text class="count">{{formatNumber(item.playCount)}}</text>
				</view>
			</view>
			<view v-if="!more" class="more">已经没有更多歌单啦~</view>
		</view>
	</view>
</template>

<script setup>
	import {
		hGetBestTag,
		hGetBestPlaylist,
		hook
	} from '@/hooks/playlist-y.js'

	let props = defineProps({
		tag: {
			type: String,
			// require: true
		}, // 是否为精品歌单
		reachBottom: {
			type: Boolean,
			default: false
		}
	})

	const emit = defineEmits(['update:reachBottom'])

	// **********************精品歌单相关**********************************
	let {
		isBest,
		title,
		bestTags,
		bestPlaylist,
		more,
		loadMore,
		playlist
	} = hook(props)

	// 弹出层
	let showPopup = ref(false)

	function closePopup() {
		showPopup.value = false
	}

	function openPopup() {
		showPopup.value = true
	}

	// **********************歌单通用*********************************
	watch(() => props.reachBottom, () => {
		if (props.reachBottom) {
			loadMore.value()
			emit('update:reachBottom', false)
		}
	})

	// 格式化数字
	function formatNumber(num) {
		return Math.floor(num / 10000) + '万'
	}

	function toPlaylistPage(playlistId) {
		uni.navigateTo({
			url: `/pages/playlist/playlist?id=${playlistId}`
		})
	}
</script>

<script>
	export default {
		name: "playlist-y"
	}
</script>

<style lang="scss" scoped>
	.container {
		.header {
			height: 90rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				font-size: 25rpx;

			}

			.filter {
				.txt {
					position: relative;
					top: -5rpx;
					font-size: 25rpx;
				}
			}
		}

		.popupContainer {
			padding: 20rpx 20rpx 0;

			.popupHeader {
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
				font-weight: bold;
				font-size: 30rpx;
			}

			.listContainer {

				.tagScroll {
					height: 747rpx;

					.all {
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;
						background-color: #d7524b;
						border-radius: 30rpx;
						font-size: 25rpx;
						color: #fff;
					}


					.list {
						display: flex;
						flex-wrap: wrap;

						.item {
							font-size: 25rpx;
							background-color: rgba(0, 0, 0, 0.1);
							line-height: 60rpx;
							width: 23%;
							height: 60rpx;
							text-align: center;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							border-radius: 30rpx;
							margin-right: 2%;
							margin-top: 40rpx;
							padding: 0 6rpx;
							box-sizing: border-box;
						}
					}
				}


			}
		}

		.playlists {
			width: 105%;
			display: flex;
			flex-wrap: wrap;

			.playlist {
				box-sizing: border-box;
				width: 33.3%;
				padding-right: 16rpx;
				position: relative;
				margin-bottom: 40rpx;


				.cover {
					width: 218rpx;
					height: 218rpx;
					border-radius: 15rpx;
				}

				.discription {
					font-size: 25rpx;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.playCount {
					position: absolute;
					top: 8rpx;
					right: 28rpx;
					background-color: rgba(0, 0, 0, 0.3);
					width: 100rpx;
					padding: 5rpx 0rpx;
					border-radius: 25rpx;
					color: #fff;
					text-align: center;
					line-height: 20rpx;

					.iconfont {
						font-size: 18rpx;
					}

					.count {
						font-size: 20rpx;
					}
				}
			}

			.more {
				margin-top: 30rpx;
				width: 100%;
				font-size: 25rpx;
				text-align: center;
				color: #333;
			}
		}
	}
</style>