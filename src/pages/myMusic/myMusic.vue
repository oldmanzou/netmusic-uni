<template>
	<view class="my_container" @touchend="myContainerTouchend">
		<view class="header" :class="{blankFont:showBlankFont}"
			:style="{backgroundColor:`rgba(218,64,54,${transparent})`}">
			<text class="iconfont icon-liebiao" @click="showLeftPopup"></text>
			<view class="top_userInfo" v-show="showUserInfo">
				<!-- <image :src="userDetail?.profile?.avatarUrl || '../../static/images/myMusic/default_avatar.png'" class="avatar"></image> -->
				<image :src="userDetail?.profile?.avatarUrl" class="avatar"></image>
				<text class="username">{{userDetail?.profile?.nickname}}</text>
			</view>
			<text class="iconfont icon-sousuo"></text>
		</view>

		<sidebar :showPopup="showPopup" @update:showPopup="showPopup = $event"></sidebar>

		<view class="userBaseInfo" :style="{opacity: 1 - transparent }">
			<image :src="userDetail?.profile?.avatarUrl" mode="" class="avatar"></image>
			<view class="username">
				<text class="txt">{{userDetail?.profile?.nickname}}</text>
			</view>
			<view class="otherInfo">
				<text>{{userDetail?.profile?.follows}} 关注</text>
				<text>{{userDetail?.profile?.followeds}} 粉丝</text>
				<text>Lv.{{userDetail.level}}</text>
			</view>
		</view>

		<view class="icon_nav">
			<view class="nav_item">
				<text class="iconfont icon-24gf-musicAlbum"></text>
				<text class="txt">本地下载</text>
			</view>
			<view class="nav_item">
				<text class="iconfont icon-24gf-bag"></text>
				<text class="txt">已购</text>
			</view>
			<view class="nav_item">
				<text class="iconfont icon-bg-play"></text>
				<text class="txt">最近播放</text>
			</view>
			<view class="nav_item">
				<text class="iconfont icon-haoyou-mianxing"></text>
				<text class="txt">我的好友</text>
			</view>
			<view class="nav_item">
				<text class="iconfont icon-shoucang1"></text>
				<text class="txt">收藏和赞</text>
			</view>
			<view class="nav_item">
				<text class="iconfont icon-guangpan"></text>
				<text class="txt">电音专区</text>
			</view>
			<view class="nav_item">
				<text class="iconfont icon-paobu"></text>
				<text class="txt">跑步漫游</text>
			</view>
			<view class="nav_item">
				<text class="iconfont icon-jia-yuankuang"></text>
				<text class="txt">音乐应用</text>
			</view>
		</view>

		<!-- 我喜欢的音乐 -->
		<view class="myLikeMusics" @click="toUserPlaylistPage(userLikePlaylist.id)">
			<view class="imgWrapper">
				<image :src="userLikePlaylist.coverImgUrl" class="songPic"></image>
				<view class="cover">
					<text class="iconfont icon-aixin"></text>
				</view>
			</view>
			<view class="right_container">
				<view class="discription">
					<text class="txt">我喜欢的音乐</text>
					<text class="songCount">{{userLikePlaylist.trackCount}} 首</text>
				</view>
				<view class="heartbeat">
					<text class="iconfont icon-xindong"></text>
					<text class="txt">心动模式</text>
				</view>
			</view>
		</view>

		<!-- 电梯导航-歌单分类tabs -->
		<u-tabs :list="list" :is-scroll="false" :current="0" lineColor="#dd001b" lineWidth="30rpx"></u-tabs>

		<!-- 用户创建的歌单 -->
		<view class="createPlaylist">
			<view class="create_header">
				<text class="count">创建歌单({{userPlaylistNum.createdPlaylistCount - 1}}个)</text>
				<text class="iconfont icon-jiahao"></text>
				<text class="iconfont icon-gengduo-shuxiang"></text>
			</view>
			<view class="playlists">
				<view class="playlist" v-for="p in userCreatedPlaylist" :key="p.id" @click="toUserPlaylistPage(p.id)">
					<image :src="p.coverImgUrl" class="coverImg"></image>
					<view class="right_container">
						<view class="discription">
							<view class="txt">{{p.name}}</view>
							<text class="songCount">{{p.trackCount}} 首</text>
						</view>
						<text class="iconfont icon-gengduo-shuxiang"></text>
					</view>
				</view>
			</view>
			<view class="import_music">
				<view class="icon_wrapper">
					<text class="iconfont icon-daoru"></text>
				</view>
				<text class="dis">一键导入外部音乐</text>
			</view>
		</view>

		<!-- 用户收藏的歌单 -->
		<view class="collect_container">
			<view class="collect_header">
				<text class="count">收藏歌单({{userPlaylistNum.subPlaylistCount}}个)</text>
				<text class="iconfont icon-gengduo-shuxiang"></text>
			</view>
			<view class="playlists" v-for="p in userConcernedPlaylist" :key="p.id" @click="toPlaylistPage(p.id)">
				<view class="playlist">
					<image :src="p.coverImgUrl" class="coverImg"></image>
					<view class="right_container">
						<view class="discription">
							<view class="txt">{{p.name}}</view>
							<text class="songCount">{{p.trackCount}} 首,by 云音乐官方歌单</text>
						</view>
						<text class="iconfont icon-gengduo-shuxiang"></text>
					</view>
				</view>
			</view>
		</view>

		<!-- 歌单助手 -->
		<view class="playlist_helper">
			<text class="title">歌单助手</text>
			<view size="mini" class="btn">试试看</view>
		</view>
	</view>
</template>

<script setup>
	import {
		hGetUserDetail,
		hGetUserPlaylistNum,
		hGetUserPlaylists
	} from '@/hooks/myMusic.js'

	let list = ref([{
		name: '创建歌单'
	}, {
		name: '收藏歌单'
	}, {
		name: '歌单助手'
	}])

	// *******************页面滚动******************
	let rpxToPx = ref(1) // 1rpx 等于多少px（当前设备）
	uni.getSystemInfo({
		success(data) {
			rpxToPx.value = data.screenWidth / 750
		}
	})
	let scrollThreshold = computed(() => 150 * rpxToPx.value) // 滚动阈值:单位px
	let scroll = ref(0) // 滚动的距离
	let transparent = computed(() => scroll.value / (150 * rpxToPx.value)) // 顶部导航的透明度
	let showBlankFont = computed(() => (scroll.value / scrollThreshold.value) > 0.7)
	let showUserInfo = computed(() => (scroll.value / scrollThreshold.value) > 0.9)
	onPageScroll(({
		scrollTop
	}) => {
		scroll.value = scrollTop
		if (scrollTop < scrollThreshold.value) {} else {}
	})

	function myContainerTouchend() {
		if (scroll.value < scrollThreshold.value) {
			uni.pageScrollTo({
				duration: 100,
				scrollTop: 0
			})
		}
	}

	// *******************用户详情******************
	const userDetail = hGetUserDetail()


	// *******************用户信息 , 歌单，收藏，mv, dj 数量******************
	const userPlaylistNum = hGetUserPlaylistNum()


	const {
		userLikePlaylist,
		userCreatedPlaylist,
		userConcernedPlaylist
	} = hGetUserPlaylists()

	// *******************跳转歌单页面******************
	// 去用户自己的歌单页面(如:"我喜欢歌单","用户创建歌单"),会禁止收藏按钮
	function toUserPlaylistPage(id) {
		uni.navigateTo({
			url: `/pages/playlist/playlist?id=${id}&disCollect=true`
		})
	}

	function toPlaylistPage(id) {
		uni.navigateTo({
			url: `/pages/playlist/playlist?id=${id}`
		})
	}

	// *******************左侧弹出框******************
	let showPopup = ref(false)

	function showLeftPopup() {
		showPopup.value = true
	}
</script>

<script>
	export default {
		name: 'myMusic'
	}
</script>

<style lang="scss" scoped>
	view[hidden] {
		display: none !important;
	}

	.my_container {
		padding: 80rpx 30rpx 30rpx;
		background-color: #eaeaea;

		.header {
			z-index: 1;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			height: 80rpx;
			padding: 0 30rpx;
			background-color: #eaeaea;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #2f2f2f;

			.iconfont {
				font-size: 40rpx;
			}

			.top_userInfo {
				height: 100%;
				display: flex;
				align-items: center;

				.avatar {
					width: 45rpx;
					height: 45rpx;
					border-radius: 50%;
				}

				.username {
					margin-left: 15rpx;
					font-size: 25rpx;
				}
			}

			&.blankFont {
				color: #fff;
			}
		}

		.userBaseInfo {
			margin-top: 50rpx;
			width: 100%;
			height: 200rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			.avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				transform: translateY(-50%);
			}

			.username {
				margin-top: -27rpx;

				.txt {
					font-weight: bold;
				}
			}

			.otherInfo {
				width: 250rpx;
				margin-top: 23rpx;
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				color: #979797;
			}
		}

		.icon_nav {
			margin-top: 20rpx;
			width: 100%;
			height: 250rpx;
			background: #fff;
			display: flex;
			flex-wrap: wrap;
			border-radius: 20rpx;

			.nav_item {
				width: 25%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.iconfont {
					color: #d33e38;
					font-size: 50rpx;

					&.icon-jia-yuankuang {
						color: #f6f6f6;
					}
				}

				.txt {
					font-size: 22rpx;
					color: #676767;
				}
			}
		}

		.myLikeMusics {
			margin-top: 25rpx;
			width: 100%;
			height: 130rpx;
			background-color: #fff;
			border-radius: 20rpx;
			display: flex;
			box-sizing: border-box;
			padding: 20rpx;

			.imgWrapper {
				position: relative;
				margin-right: 20rpx;
				border-radius: 15rpx;
				overflow: hidden;

				.songPic {
					width: 90rpx;
					height: 100%;
					border-radius: 15rpx;
				}

				.cover {
					position: absolute;
					top: 0;
					width: 100%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0.3);
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;

					.iconfont {
						font-size: 40rpx;
					}
				}
			}

			.right_container {
				flex: 1;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.discription {
					display: flex;
					flex-direction: column;
					align-items: start;
					justify-content: center;

					.txt {
						font-size: 27rpx;
					}

					.songCount {
						font-size: 20rpx;
						color: #a6a6a6;
					}
				}

				.heartbeat {
					border: 1rpx solid #a6a6a6;
					border-radius: 19rpx;
					width: 107rpx;
					height: 30rpx;
					padding: 3rpx 8rpx;
					display: flex;
					align-items: center;

					.iconfont {
						font-size: 28rpx;
					}

					.txt {
						margin-left: 5rpx;
						font-size: 18rpx;
					}
				}
			}
		}

		// 电梯导航歌单
		// :deep(.u-tabs) {
		// 	position: sticky;
		// 	top: 80rpx;
		// }

		// 电梯导航歌单u-tab组件
		:deep(.u-tabs__wrapper__nav__item) {
			width: 187rpx;

			.u-tabs__wrapper__nav__item__text {
				font-size: 26rpx;
				font-weight: bold;
			}

			.u-tabs__wrapper__nav__line {
				bottom: 16rpx;
			}
		}

		// 用户创建的歌单
		.createPlaylist {
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;
			margin-top: 20rpx;

			.create_header {
				display: flex;
				justify-content: space-between;
				color: #989898;

				.count {
					flex: 1;
					font-size: 22rpx;
				}

				.iconfont {
					font-size: 36rpx;
					margin-left: 20rpx;
				}
			}

			.playlists {
				.playlist {
					display: flex;
					margin-top: 20rpx;

					.coverImg {
						width: 90rpx;
						height: 90rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}

					.right_container {
						flex: 1;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.discription {
							display: flex;
							flex-direction: column;
							justify-content: center;

							.txt {
								font-size: 28rpx;
								width: 475rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}

							.songCount {
								font-size: 23rpx;
								color: #989898;
							}
						}

						.icon-gengduo-shuxiang {
							font-size: 38rpx;
							color: #989898;
						}
					}
				}
			}

			.import_music {
				margin-top: 20rpx;
				color: #323232;
				display: flex;

				.icon_wrapper {
					width: 90rpx;
					height: 90rpx;
					background-color: #f3f3f3;
					text-align: center;
					line-height: 90rpx;
					border-radius: 10rpx;

					.iconfont {
						font-size: 40rpx;
					}
				}

				.dis {
					margin-left: 20rpx;
					font-size: 28rpx;
					line-height: 90rpx;
				}
			}
		}

		// 用户收藏的歌单
		.collect_container {
			margin-top: 20rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.collect_header {
				display: flex;
				justify-content: space-between;
				color: #989898;

				.count {
					font-size: 22rpx;
				}

				.iconfont {
					font-size: 36rpx;
				}
			}

			.playlists {
				.playlist {
					display: flex;
					margin-top: 20rpx;

					.coverImg {
						width: 90rpx;
						height: 90rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
					}

					.right_container {
						flex: 1;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.discription {
							display: flex;
							flex-direction: column;
							justify-content: center;

							.txt {
								font-size: 28rpx;
								width: 475rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}

							.songCount {
								font-size: 23rpx;
								color: #989898;
							}
						}

						.icon-gengduo-shuxiang {
							font-size: 38rpx;
							color: #989898;
						}
					}
				}
			}
		}

		// 歌单助手
		.playlist_helper {
			margin-top: 20rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 20rpx;

			.title {
				color: #989898;
				font-size: 22rpx;
			}

			.btn {
				margin: 0 auto;
				width: 159rpx;
				height: 45rpx;
				line-height: 45rpx;
				text-align: center;
				border-radius: 25rpx;
				font-size: 25rpx;
				background-color: #d63936;
				color: #fff;
			}
		}
	}
</style>