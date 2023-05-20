<template>
	<view class="header" :style="{'background-color': color}">
		<view class="top">
			<text class="type">歌单</text>
			<text class="iconfont icon-sousuo"></text>
			<text class="iconfont icon-gengduo-shuxiang"></text>
		</view>

		<view class="info_wrapper">
			<view class="head">
				<image :src="playlistDetail.coverImgUrl" class="cover"></image>
				<view class="info">
					<view class="name">
						<text class="txt">{{playlistDetail.name}}</text>
						<view class="icon">
							<text class="iconfont icon-xiala"></text>
						</view>
					</view>
					<view class="creator">
						<image :src="playlistDetail?.creator?.avatarUrl" class="avatar"></image>
						<text class="creatorName">{{playlistDetail?.creator?.nickname}}</text>
						<view class="attention">
							<text class="iconfont icon-jiahao"></text>
							<text class="txt">关注</text>
						</view>
					</view>
					<view class="tags">
						<view class="tag">
							<text class="tagName">8.4分</text>
							<text class="iconfont icon-xiangyou1"></text>
						</view>
						<view class="tag" v-for="item in playlistDetail.algTags" :key="item" >
							<text class="tagName">{{item}}</text>
							<text class="iconfont icon-xiangyou1"></text>
						</view>
					</view>
				</view>
			</view>
			<view class="discription">
				<view class="txt">{{playlistDetail.description}}</view>
				<text class="iconfont icon-xiangyou1"></text>
			</view>
		</view>

		<view class="btns">
			<view class="btn">
				<text class="iconfont icon-fenxiang1"></text>
				<text class="num">{{playlistDetail.shareCount}}</text>
			</view>
			<view class="btn">
				<text class="iconfont icon-pinglun"></text>
				<text class="num">{{playlistDetail.commentCount}}</text>
			</view>
			<view class="btn best">
				<text class="iconfont icon-shoucangjia"></text>
				<text class="num">{{playlistDetail.subscribedCount}}</text>
			</view>
		</view>
	</view>

	<view class="container"></view>

	<songList :songs="tracks" class="songlist"></songList>
</template>

<script setup>
	import {
		getDetailAndTracks
	} from '@/hooks/playlist.js'

	let {
		color,
		playlistDetail,
		tracks
	} = getDetailAndTracks()
</script>

<script>
	export default {
		name: 'playlist'
	}
</script>

<style lang="scss" scoped>
	.header {
		overflow: hidden;
		padding: 0 25rpx;
		color: #fff;

		.top {
			margin: 10rpx;
			height: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;


			.type {
				flex: 1;
				font-weight: bold;
			}

			.iconfont {
				font-weight: bold;
			}

			.icon-gengduo-shuxiang {
				font-size: 38rpx;
				margin-left: 50rpx;
			}
		}

		.info_wrapper {
			margin-top: 30rpx;

			.head {
				display: flex;
				justify-content: space-between;

				.cover {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}

				.info {
					flex: 1;
					margin-left: 20rpx;

					.name {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.txt {
							width: 430rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							font-size: 28rpx;
							font-weight: bold;
						}

						.icon {
							width: 35rpx;
							height: 35rpx;
							background-color: rgba(255, 255, 255, 0.3);
							line-height: 35rpx;
							text-align: center;
							border-radius: 50%;
						}
					}

					.creator {
						margin: 20rpx 0;
						height: 60rpx;
						display: flex;
						align-items: center;

						.avatar {
							width: 50rpx;
							height: 50rpx;
							border-radius: 50%;
						}

						.creatorName {
							margin-left: 10rpx;
							font-size: 22rpx;
							color: rgba(255, 255, 255, 0.5);
						}

						.attention {
							margin-left: 10rpx;
							width: 80rpx;
							height: 28rpx;
							border-radius: 16.5rpx;
							padding: 5rpx 0;
							background-color: rgba(255, 255, 255, 0.2);
							display: flex;
							align-items: center;
							justify-content: center;

							.iconfont {
								font-size: 25rpx;
							}

							.txt {
								font-size: 18rpx;
								margin-left: 3rpx;
								color: rgba(255, 255, 255, 0.7);
							}
						}
					}

					.tags {
						display: flex;

						.tag {
							margin-right: 10rpx;
							background-color: rgba(255, 255, 255, 0.2);
							padding: 5rpx 10rpx;
							height: 30rpx;
							line-height: 25rpx;
							border-radius: 9.5rpx;

							.tagName {
								font-size: 20rpx;
							}

							.iconfont {
								font-size: 20rpx;
							}
						}
					}
				}
			}

			.discription {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: rgba(255, 255, 255, 0.8);

				.txt {
					font-size: 22rpx;
					width: 670rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.iconfont {
					font-size: 22rpx;
				}
			}
		}

		.btns {
			display: flex;
			justify-content: space-between;
			margin: 30rpx 0 60rpx;
			font-weight: bold;

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 28%;
				height: 68rpx;
				background-color: rgba(255, 255, 255, 0.2);
				text-align: center;
				border-radius: 34rpx;

				.num {
					margin-bottom: 5rpx;
					font-size: 22rpx;
					margin-left: 10rpx;
				}
			}

			.best {
				background-color: #dd001b;
			}
		}
	}

	.container {
		position: relative;
		top: -30rpx;
		height: 60rpx;
		background-color: #fff;
		border-radius: 30rpx;

	}

	.songlist {
		position: relative;
		top: -70rpx;
	}
</style>