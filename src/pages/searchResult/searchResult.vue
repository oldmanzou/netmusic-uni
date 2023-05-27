<template>
	<view class="header">
		<view class="search_wrapper">
			<text class="iconfont icon-sousuo"></text>
			<input type="text" v-model="inputValue" class="input">
			<text class="iconfont icon-chahao"></text>
		</view>
		<text class="search_btn">搜索</text>
	</view>

	<!-- tabs -->
	<scroll-view scroll-x="true" class="tabScrollView">
		<u-tabs :list="tabs" :current="currentSwiperIndex" lineWidth="70rpx" lineHeight="13rpx"
			lineColor="rgba(255,255,255,0.3)" inactiveStyle="color:rgba(255,255,255,0.5);font-size:27rpx"
			activeStyle="font-size:27rpx;color:#fff;" @change="tabChange"></u-tabs>
	</scroll-view>

	<!-- swiper tabs的内容区 -->
	<swiper class="swiper" :current="currentSwiperIndex" duration="100">
		<!-- 综合 -->
		<swiper-item class="swiper-item all">
			<!-- 推荐-（歌手、视频）和 歌单 -->
			<view class="recommend">
				<text class="recommend_title">你可能感兴趣的</text>
				<!-- 歌手 -->
				<view class="artist" v-if="multimatch.artist" v-for="a in multimatch.artist" :key="a.id">
					<view class="image_wrapper">
						<image class="avatar" :src="a.picUrl" mode=""></image>
						<view class="iconfont_wrapper">
							<text class="iconfont icon-yinle"></text>
						</view>
					</view>
					<view class="middle_container">
						<text class="artist_name">歌手: {{a.name}}</text>
						<text class="short_info">粉丝: {{(a.fansSize / 10000).toFixed(1)}}万 歌曲: {{a.musicSize}}</text>
						<text class="iconfont icon-fans">TA的乐迷团 ></text>
					</view>
					<view class="attention">
						<text class="iconfont icon-jiahao"></text>
						<text>关注</text>
					</view>
				</view>

				<!-- 歌单 -->
				<view class="playlist" v-if="multimatch.playlist" v-for="p in multimatch.playlist" :key="p.id">
					<image :src="p.coverImgUrl" class="playlist_cover" mode=""></image>
					<view class="playlist_info">
						<view class="playlist_name">歌单: {{p.name}}</view>
						<text class="playlist_dis">歌曲:{{p.trackCount}}，播放:{{Math.floor(p.playCount / 10000)}}万</text>
					</view>
				</view>

				<!-- 视频 -->
				<view class="mv" v-if="multimatch.new_mlog" v-for="m in multimatch.new_mlog" :key="m.baseInfo.id">
					<view class="mv_wrapper">
						<image class="mv_cover" :src="m.baseInfo.resource.mlogBaseData.coverUrl" mode=""></image>
						<text class="iconfont icon-bofang2"></text>
					</view>
					<view class="mv_info">
						<view class="mv_name">{{m.baseInfo.resource.mlogBaseData.text}}</view>
						<text class="mv_dis">{{m.baseInfo.resource.userProfile.nickname}},
							{{formatTime(m.baseInfo.resource.mlogBaseData.duration)}},
							播放:{{(m.baseInfo.resource.mlogExtVO.playCount / 10000).toFixed(1)}}万</text>
					</view>
				</view>
			</view>

			<!-- 单曲 使用综合数据 -->
			<view class="single_container container" v-if="allData.song">
				<view class="single_header">
					<text class="title">单曲</text>
					<view class="playAll">
						<text class="iconfont icon-bofang2"></text>
						<text class="txt">播放全部</text>
					</view>
				</view>
				<view class="single_list">
					<single :single="s" v-for="s in allData.song.songs" :key="s.id"></single>
				</view>
				<view class="more" v-if="allData.song.more">
					<text>{{allData.song.moreText}}</text>
					<text class="iconfont icon-xiangyou1"></text>
				</view>
			</view>

			<!-- 歌单 使用综合数据 -->
			<view class="container" v-if="allData.playList">
				<view class="title">歌单</view>
				<view class="playlists">
					<playlist v-for="p in allData.playList.playLists" :key="p.id" :playlist="p"></playlist>
				</view>
				<view class="more" v-if="allData.playList.more">
					<text class="txt">{{allData.playList.moreText}}</text>
					<text class="iconfont icon-xiangyou1"></text>
				</view>
			</view>

			<!-- 视频 -->
			<view class="video_container container" v-if="video.videoCount">
				<view class="title">视频</view>
				<view class="video_list">
					<view class="video" v-for="v in video.videos" :key="v.vid">
						<view class="image_wrapper">
							<image class="cover" :src="v.coverUrl"></image>
							<text class="iconfont icon-bofang2"></text>
						</view>
						<view class="video_info">
							<view class="name">{{v.title}}</view>
							<view class="dis">{{formatTime(v.durationms)}}, by {{v.creator[0].userName}},
								{{formatPlayCount(v.playTime)}}播放
							</view>
						</view>
					</view>
				</view>
				<view class="more" v-if="video.videoCount > 5">
					<text class="txt">查看更多茜拉相关视频</text>
					<text class="iconfont icon-xiangyou1"></text>
				</view>
			</view>

			<!-- 播客 -->
			<view class="container" v-if="podcast.djRadiosCount">
				<view class="title">播客</view>
				<view class="podcast_list">
					<podcastcom v-for="p in podcast.djRadios" :key="p.id" :podcast="p"></podcastcom>
				</view>
				<view class="more" v-if="podcast.djRadiosCount > 3">
					<text class="txt">查看全部{{podcast.djRadiosCount}}个播单</text>
					<text class="iconfont icon-xiangyou1"></text>
				</view>
			</view>

			<!-- 歌手 使用综合数据 -->
			<view class="artist_container container" v-if="allData.artist">
				<view class="title">艺人</view>
				<view class="artist_list">
					<artist v-for="a in allData.artist.artists" :key="a.id" :artist="a"></artist>
				</view>
				<view class="more" v-if="allData.artist.more">
					<text class="txt">{{allData.artist.moreText}}</text>
					<text class="iconfont icon-xiangyou1"></text>
				</view>
			</view>

			<!-- 声音 -->
			<view class="container" v-if="voice.totalCount">
				<view class="title">声音</view>
				<view class="voice_list">
					<voicecom v-for="v in voice.resources" :key="v.resourceId" :voice="v"></voicecom>
				</view>
				<view class="more" v-if="voice.totalCount > 2">
					<text class="txt">查看全部{{voice.totalCount}}个声音</text>
					<text class="iconfont icon-xiangyou1"></text>
				</view>
			</view>

			<!-- 专辑 使用综合数据 -->
			<view class="container" v-if="allData.album">
				<view class="title">专辑</view>
				<view class="album_list">
					<album v-for="a in allData.album.albums" :key="a.id" :album="a"></album>
				</view>
				<view class="more" v-if="allData.album.more">
					<text class="txt">{{allData.album.moreText}}</text>
					<text class="iconfont icon-xiangyou1"></text>
				</view>
			</view>

			<!-- 用户 -->
			<view class="container" v-if="allData.user">
				<view class="title">用户</view>
				<view class="user_list">
					<user v-for="u in allData.user.users" :key="u.userId" :user="u"></user>
				</view>
				<view class="more" v-if="allData.user.more">
					<text class="txt">{{allData.user.moreText}}</text>
					<text class="iconfont icon-xiangyou1"></text>
				</view>
			</view>
		</swiper-item>

		<!-- 单曲 -->
		<swiper-item class="swiper-item single">
			<single_list :singles="singles" @singleReachBottom="singleReachBottom"></single_list>
		</swiper-item>

		<!-- 歌单 -->
		<swiper-item class="swiper-item playlist">
			<playlist_list :playlists="playlists" @playlistReachBottom="playlistReachBottom"></playlist_list>
		</swiper-item>

		<!-- 视频 -->
		<swiper-item class="swiper-item ">
			<video_list></video_list>
		</swiper-item>

		<!-- 歌手 -->
		<swiper-item class="swiper-item artist">
			<artist_list :artists="artists"></artist_list>
		</swiper-item>

		<!-- 播客 -->
		<swiper-item class="swiper-item">
		</swiper-item>
		
		<!-- 歌词 -->
		<swiper-item class="swiper-item">
		</swiper-item>

		<!-- 专辑 -->
		<swiper-item class="swiper-item">
		</swiper-item>

		<!-- 声音 -->
		<swiper-item class="swiper-item voice">
			<voice_list :voices="voices" @voiceReachBottom="voiceReachBottom"></voice_list>
		</swiper-item>

		<!-- 话题 -->
		<swiper-item class="swiper-item">
		</swiper-item>

		<!-- 用户 -->
		<swiper-item class="swiper-item">
			<user_list :users="users" @userReachBottom="userReachBottom"></user_list>
		</swiper-item>
	</swiper>
</template>

<script setup>
	// 工具函数
	import {
		formatTime,
		formatDate,
		formatPlayCount
	} from '@/utils/format.js'
	import {
		hGetMultimatch,
		searchAllTypeContent,
		getAllData,
		hSingle,
		hPlaylist,
		hVideo,
		hArtist,
		hUser,
		hVoice
	} from '@/hooks/searchResult.js'

	// *********************************tabs***********************************
	const tabs = reactive([{
			name: '综合',
		}, {
			name: '单曲',
		}, {
			name: '歌单'
		}, {
			name: '视频'
		}, {
			name: '歌手'
		}, {
			name: '播客'
		}, {
			name: '歌词'
		}, {
			name: '专辑'
		}, {
			name: '声音'
		},
		{
			name: '话题'
		},
		{
			name: '用户'
		}
	])
	const currentSwiperIndex = ref(8)

	function tabChange(e) {
		currentSwiperIndex.value = e.index
	}

	// *********************************搜索框输入值***********************************
	let inputValue = ref('')
	onLoad(({
		keyword = '告五人'
	}) => {
		inputValue.value = keyword
	})

	// *********************************综合***********************************
	// 综合-多重匹配
	const multimatch = hGetMultimatch(inputValue)

	// 综合-搜索结果（请求各类型）
	let {
		video,
		podcast,
		lyric,
		voice,
		topic,
	} = searchAllTypeContent(inputValue)

	// 综合-搜索结果 请求“综合类型”
	let allData = getAllData(inputValue)

	// *********************************单曲***********************************
	let {
		singles,
		loadMoreSingle
	} = hSingle(inputValue)

	function singleReachBottom() {
		loadMoreSingle()
	}

	// *********************************歌单***********************************
	let {
		playlists,
		loadMorePlaylist
	} = hPlaylist(inputValue)

	function playlistReachBottom() {
		loadMorePlaylist()
	}

	// *********************************视频***********************************
	let {
		videos,
		loadMoreVideo
	} = hVideo(inputValue)

	// *********************************歌手***********************************
	let {
		artists,
		loadMoreArtist
	} = hArtist(inputValue)

	// *********************************声音***********************************
	let {
		voices,
		loadMoreVoice
	} = hVoice(inputValue)
	
	function voiceReachBottom() {
		loadMoreVoice()
	}

	// *********************************用户***********************************
	let {
		users,
		loadMoreUser
	} = hUser(inputValue)
	
	function userReachBottom() {
		loadMoreUser()
	}
</script>

<script>
	export default {
		name: 'searchResult',
	}
</script>

<style lang="scss" scoped>
	.header {
		z-index: 1;
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
			}

			.icon-chahao {
				font-size: 35rpx;
				color: rgba(255, 255, 255, 0.4);
			}
		}

		.search_btn {
			font-size: 30rpx;
			color: rgba(255, 255, 255, 0.8);
		}
	}

	.tabScrollView {
		z-index: 1;
		position: fixed;
		top: 80rpx;
		background-color: #d53c36;

		:deep(.u-tabs__wrapper__nav__line) {
			bottom: 20rpx;
		}
	}

	.swiper {
		// margin-top: 168rpx;
		// height: 100%;
		position: absolute;
		top: 168rpx;
		width: 100%;
		height: calc(100vh - 168rpx);

		.swiper-item {
			// background-color: #f6f6f6;
			background-color: #fff;
			overflow: auto;

			// 综合
			&.all {
				background-color: pink;
				box-sizing: border-box;
				padding: 25rpx;

				// 多重匹配
				.recommend {
					box-sizing: border-box;
					width: 100%;
					background-color: #fff;
					border-radius: 25rpx;
					padding: 0 20rpx 20rpx;

					.recommend_title {
						height: 28rpx;
						font-size: 20rpx;
						color: #838383;
					}

					.artist {
						margin-top: 20rpx;
						display: flex;
						align-items: center;

						.image_wrapper {
							position: relative;
							width: 80rpx;
							height: 80rpx;

							.avatar {
								width: 80rpx;
								height: 80rpx;
								border-radius: 50%;
							}

							.iconfont_wrapper {
								position: absolute;
								bottom: 4rpx;
								right: -10rpx;
								background-color: #d53c36;
								border-radius: 50%;
								width: 35rpx;
								height: 35rpx;
								display: flex;
								justify-content: center;
								align-items: center;

								.iconfont {
									color: #fff;
									font-size: 25rpx;
								}
							}
						}

						.middle_container {
							flex: 1;
							margin-left: 25rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;

							.artist_name {
								font-size: 28rpx;
							}

							.short_info {
								font-size: 20rpx;
								color: #969696;
							}

							.icon-fans {
								font-size: 22rpx;
								color: #587b97;
							}
						}

						.attention {
							border: 1rpx solid #d53c36;
							width: 100rpx;
							height: 40rpx;
							border-radius: 20rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							font-size: 20rpx;
							color: #d53c36;
						}
					}

					.mv {
						margin-top: 20rpx;
						display: flex;

						.mv_wrapper {
							position: relative;
							height: 70rpx;

							.mv_cover {
								width: 105rpx;
								height: 70rpx;
								border-radius: 15rpx;
							}

							.iconfont {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								color: rgba(255, 255, 255, 0.8);
							}
						}

						.mv_info {
							margin-left: 20rpx;
							display: flex;
							flex-direction: column;
							justify-content: center;

							.mv_name {
								width: 420rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								font-size: 28rpx;
							}

							.mv_dis {
								font-size: 20rpx;
								color: #969696;
							}
						}
					}

					.playlist {
						margin-top: 20rpx;
						display: flex;

						.playlist_cover {
							width: 80rpx;
							height: 80rpx;
							border-radius: 15rpx;
						}

						.playlist_info {
							margin-left: 25rpx;
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: flex-start;

							.playlist_name {
								font-size: 28rpx;
								width: 420rpx;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}

							.playlist_dis {
								font-size: 20rpx;
								color: #969696;
							}
						}
					}
				}

				.single_container {
					width: 100%;
					box-sizing: border-box;

					.single_header {
						height: 80rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1rpx solid #e5e5e5;
						margin: 0 20rpx;

						.title {
							font-weight: bold;
							padding: 0;
						}

						.playAll {
							display: flex;
							justify-content: center;
							align-items: center;
							border: 1rpx solid #d53c36;
							color: #d53c36;
							padding: 5rpx 10rpx;
							border-radius: 18rpx;

							.iconfont {
								font-size: 18rpx;
								margin-right: 5rpx;
							}

							.txt {
								font-size: 18rpx;
							}
						}
					}

					.more {
						border-top: none;
					}
				}

				.video_container {


					.video_list {
						overflow: hidden;

						.video {
							padding: 0 20rpx;
							display: flex;
							margin-bottom: 20rpx;

							.image_wrapper {
								position: relative;
								width: 173rpx;
								height: 102rpx;
								border-radius: 15rpx;

								.cover {
									width: 173rpx;
									height: 102rpx;
									border-radius: 15rpx;
								}

								.iconfont {
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
									font-size: 38rpx;
									color: rgba(255, 255, 255, 0.6);
								}
							}

							.video_info {
								margin-left: 20rpx;
								flex: 1;
								display: flex;
								flex-direction: column;
								justify-content: center;

								.name {
									width: 400rpx;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									font-size: 28rpx;
								}

								.dis {
									font-size: 20rpx;
									color: #989898;
								}
							}
						}
					}


				}

				.artist_container {
					.artist_list {
						overflow: hidden;
					}
				}
			}

			// 歌手
			&.artist {
				padding-top: 10rpx;
			}
			
			// 声音
			&.voice {
				padding-top: 10rpx;
			}
		}
	}

	.container {
		margin-top: 20rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}

	.title {
		height: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		padding: 0 20rpx;
	}

	.more {
		border-top: 1rpx solid #e5e5e5;
		font-size: 18rpx;
		color: #989898;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;

		.iconfont {
			position: relative;
			top: 2rpx;
			font-size: 20rpx;
		}
	}
</style>