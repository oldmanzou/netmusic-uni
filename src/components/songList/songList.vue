<template>
	<view class="songContainer">
		<view class="header">
			<view class="playAll">
				<text class="iconfont icon-24gf-playCircle"></text>
				<text class="txt">播放全部</text>
			</view>
			<text class="iconfont icon-shuaxin"></text>
			<text class="iconfont icon-quanxuan"></text>
		</view>

		<scroll-view scroll-y="true" class="songList">
			<view class="song" v-for="song in songs" :key="song.id" @click="toPlayPage(song.id)">
				<image class="cover" :src="song.al.picUrl" lazy-load></image>
				<view class="songInfo">
					<view class="songName">{{song.name}}</view>
					<view class="otherInfo">
						<!-- <view class="tag" v-if="song.reason">{{song.reason}}</view> -->
						<view class="tag" v-if="song.fee == 1">vip</view>
						<view class="tag" v-if="song.fee == 4">购买专辑</view>
						<text class="artist" v-if="song.ar">{{joinArtistsName(song.ar) + '-' + song.al.name}}</text>
					</view>
				</view>
				<text class="iconfont icon-bofang"></text>
				<text class="iconfont icon-gengduo-shuxiang" @click.stop="openPopup(song)"></text>
			</view>
		</scroll-view>

		<u-popup :show="isShowPopup" round="10" @close="closePopup">
			<view class="popupContainer">
				<view class="popup_header">
					<image class="cover" :src="song?.al?.picUrl" mode=""></image>
					<view class="songInfo">
						<view class="songName">歌曲: {{song?.name}}</view>
						<text class="artist">{{joinArtistsName(song.ar || [])}}</text>
					</view>
				</view>
				<scroll-view scroll-y="true" class="operateScrollView">
					<view class="item">
						<text class="iconfont icon-xiayigexiayishou"></text>
						<text class="txt">下一首播放</text>
					</view>
					<view class="item">
						<text class="iconfont icon-shoucang"></text>
						<text class="txt">收藏到歌单</text>
					</view>
					<view class="item">
						<text class="iconfont icon-xiazai"></text>
						<text class="txt">下载
							<text class="extra">VIP</text>
						</text>
					</view>
					<view class="item">
						<text class="iconfont icon-pinglun"></text>
						<text class="txt">评论</text>
					</view>
					<view class="item">
						<text class="iconfont icon-xiayigexiayishou"></text>
						<text class="txt">分享</text>
					</view>
					<view class="item">
						<text class="iconfont icon-gerentouxiang"></text>
						<text class="txt">歌手：SAint-Sober/Mariho</text>
					</view>
					<view class="item">
						<text class="iconfont icon-haoyou"></text>
						<text class="txt">创作者：Mariho/SAint-Sober</text>
					</view>
					<view class="item">
						<text class="iconfont icon-zhuanji"></text>
						<text class="txt">专辑：DISTANCE</text>
					</view>
					<view class="item">
						<text class="iconfont icon-cloud"></text>
						<text class="txt">云推歌 (已有45人推荐)</text>
					</view>
					<view class="item">
						<text class="iconfont icon-shipinbofang"></text>
						<text class="txt">相关视频</text>
					</view>
					<view class="item">
						<text class="iconfont icon-wuxianpu"></text>
						<text class="txt">求谱/上传乐谱</text>
					</view>
					<view class="item">
						<text class="iconfont icon-lingsheng"></text>
						<text class="txt">设为铃声
							<text class="extra">VIP</text>
						</text>
					</view>
					<view class="item">
						<text class="iconfont icon-goumai"></text>
						<text class="txt">单曲购买
							<text class="extra">永久拥有该单曲</text>
						</text>
					</view>
					<view class="item">
						<text class="iconfont icon-kabao"></text>
						<text class="txt">音乐礼品卡
							<text class="extra">送好友</text>
						</text>
					</view>
					<view class="item">
						<text class="iconfont icon-pingbi"></text>
						<text class="txt">屏蔽歌曲或歌手</text>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>

</template>

<script setup>
	import pubSub from 'pubsub-js'
	
	const props = defineProps({
		songs: {
			type: Array,
			default () {
				return []
			}
		}
	})

	let songIds = computed(() => props.songs.map(item => item.id))

	// 订阅
	pubSub.subscribe('requestPrevOrNextSongId', (eventName, {
		type,
		currentSongId
	}) => {
		let index = songIds.value.indexOf(currentSongId)
		switch (type) {
			case 'prev':
				index--
				if (index < 0) index = songIds.value.length - 1
				break
			case 'next':
				index++
				if (index > songIds.value.length - 1) index = 0
				break
		}

		pubSub.publish('getPrevOrNextSongId', songIds.value[index])
	})

	// 工具函数
	function joinArtistsName(artist) {
		return artist.map(item => item.name).join('/')
	}
	
	// popup 部分
	let song = ref({})

	let isShowPopup = computed(() => {
		return !!song.value.id
	})

	function openPopup(s) {
		song.value = s
	}

	function closePopup() {
		song.value = {}
	}

	// 跳转播放页
	function toPlayPage(songId) {
		uni.navigateTo({
			url: `/songPackage/play/play?songId=${songId}`
		})
	}
</script>

<script>
	export default {
		name: "songList"
	}
</script>

<style lang="scss" scoped>
	.songContainer {
		padding: 0 20rpx;

		.header {
			display: flex;
			height: 60rpx;
			line-height: 60rpx;
			justify-content: space-between;

			.playAll {
				flex: 1;

				.iconfont {
					color: #dd001b;
					font-size: 40rpx;
				}

				.txt {
					font-size: 30rpx;
					margin-left: 15rpx;

				}
			}

			.icon-shuaxin {
				font-size: 40rpx;
				margin-right: 30rpx;
			}
		}

		.songList {
			margin-top: 20rpx;
			height: calc(100vh - 160rpx);

			.song {
				display: flex;
				justify-content: space-between;
				height: 70rpx;
				align-items: center;
				margin-bottom: 20rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.cover {
					width: 70rpx;
					height: 70rpx;
					border-radius: 10rpx;
				}

				.songInfo {
					flex: 1;
					margin-left: 20rpx;

					.songName {
						font-size: 30rpx;
						width: 490rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.otherInfo {
						display: flex;

						.tag {
							height: 28rpx;
							padding: 0 5rpx;
							font-size: 18rpx;
							background-color: rgba(221, 0, 27, 0.1);
							color: #ff1239;
						}

						.artist {
							margin-left: 8rpx;
							font-size: 24rpx;
							line-height: 24rpx;
							width: 350rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}

				.icon-bofang {
					margin-right: 17rpx;
					font-size: 44rpx;
				}

				.icon-gengduo-shuxiang {
					font-size: 44rpx;
				}
			}
		}

		.popupContainer {
			padding: 20rpx 20rpx 0;

			.popup_header {
				display: flex;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #f2f2f2;

				.cover {
					width: 90rpx;
					height: 90rpx;
					border-radius: 10rpx;
				}

				.songInfo {
					flex: 1;
					display: flex;
					flex-direction: column;
					margin-left: 15rpx;
					justify-content: center;

					.songName {
						font-size: 30rpx;
					}

					.artist {
						font-size: 25rpx;
						color: #979797;
					}
				}
			}

			.operateScrollView {
				height: 730rpx;
				color: #343434;

				.item {
					height: 60rpx;
					line-height: 60rpx;
					margin-bottom: 10rpx;

					.iconfont {
						font-size: 38rpx;
					}

					.txt {
						margin-left: 20rpx;
						font-size: 25rpx;

						.extra {
							border: 1rpx solid #dd001b;
							font-size: 13rpx;
							padding: 0 3rpx;
							border-radius: 1rpx;
							color: #dd001b;
						}
					}
				}
			}
		}
	}
</style>