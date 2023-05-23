<template>
	<view class="container">
		<!-- 高斯模糊背景 -->
		<view class="coverWrapper">
			<view class="bg" v-if="songDetail.al" :style="{'background-image': `url('${songDetail?.al?.picUrl}')`}">
			</view>
			<view class="bgCover"></view>
		</view>

		<view class="header">
			<text class="artist">{{joinArtist(songDetail.ar)}}</text>
			<view class="like">关注</view>
		</view>

		<template v-if="front">
			<view class="cd" :class="{play:isPlay}">
				<view class="needle">
					<view class="circle"></view>
					<image src="@/static/images/play/needle.png"></image>
				</view>
				<view class="disContainer" :style="{'animation-play-state': isPlay ? 'running' : 'paused'}">
					<image src="@/static/images/play/disc.png" class="disImg"></image>
					<image :src="songDetail?.al?.picUrl" mode="" class="cover"></image>
				</view>
			</view>

			<view class="moreOperate">
				<text class="iconfont icon-xihuan"></text>
				<text class="iconfont icon-xiazai"></text>
				<text class="iconfont icon-geciweidianji"></text>
				<text class="iconfont icon-pinglun"></text>
				<text class="iconfont icon-gengduo-shuxiang"></text>
			</view>
		</template>

		<template v-else>
			<view class="lyricHeader">
				<text class="iconfont icon-24gl-volumeZero"></text>
				<view class="middle">
					<view class="btn active">歌词</view>
					<view class="btn">百科</view>
				</view>
				<text class="iconfont icon-touping"></text>
			</view>

			<view class="lyricWrapper">
				<scroll-view scroll-y="true" class="lyricContainer" :scroll-top="scrollTop" scroll-with-animation>
					<view class="scrollWrapper">
						<view class="blank"></view>
						<view class="lyricItem" v-for="l in lyric" :key="`${l.time}${l.txt}`"
							:class="[`class${l.time}`,{active:activeLyricTime == l.time}]">
							<view class="txt">{{l.txt}}</view>
							<view class="trans" v-if="l.translation">{{l.translation}}</view>
						</view>
					</view>
				</scroll-view>
			<!-- 	<view class="middle_line">
					<text class="iconfont icon-bofang2"></text>
					<view class="line"></view>
					<text class="txt">00:00</text>
				</view> -->
			</view>

			<view class="otherOperate">
				<text class="iconfont icon-shipinbofang"></text>
				<view class="right">
					<view class="showTran">音</view>
					<text class="iconfont icon-gengduo"></text>
				</view>
			</view>
		</template>

		<view class="progress">
			<text class="currentTime">{{currentPlayTime}}</text>
			<slider class="slider" :value="currentProgressValue" @change="sliderChange" @changing="sliderChanging"
				activeColor="#fff" backgroundColor="#d7d4ce" block-color="#fff" block-size="10" />
			<text>{{duration}}</text>
		</view>

		<view class="player">
			<text class="iconfont icon-liebiaoxunhuan"></text>
			<text class="iconfont icon-shangyishou" @click="switchSong('prev')"></text>
			<text class="iconfont playBtn" :class="isPlay ? 'icon-zanting': 'icon-24gf-playCircle'"
				@click="playOrPause"></text>
			<text class="iconfont icon-xiayishou" @click="switchSong('next')"></text>
			<text class="iconfont icon-24gl-playlist"></text>
		</view>
	</view>
</template>

<script setup>
	import {
		init
	} from '@/hooks/play.js'

	let {
		songDetail,
		isPlay,
		playOrPause,
		currentPlayTime,
		currentProgressValue,
		duration,
		sliderChanging,
		sliderChange,
		switchSong,
		lyric,
		activeLyricTime,
		scrollTop
	} = init()

	function joinArtist(artists = []) {
		return artists.map(item => item.name).join('/')
	}

	let front = ref(false)
</script>
<script>
	export default {
		name: 'Play'
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100%;

		.coverWrapper {
			position: absolute;
			width: 100%;
			height: 100%;

			.bg {
				width: 100%;
				height: 100%;
				background-repeat: no-repeat;
				background-size: 300%;
				background-position: center;
				filter: blur(25rpx);
			}

			.bgCover {
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				background-color: rgba(0, 0, 0, 0.4); // 原色
			}
		}

		.header {
			padding-top: 5rpx;
			display: flex;
			justify-content: center;

			.artist {
				z-index: 5;
				font-size: 25rpx;
				color: #fff;
				max-width: 500rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.like {
				z-index: 5;
				margin: 13rpx 0 0 16rpx;
				padding: 0 2rpx;
				font-size: 13rpx;
				background-color: rgba(255, 255, 255, 0.1);
				color: #fff;
			}
		}

		.cd {
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			&.play {
				.needle {
					image {
						transform: rotate(0);
					}
				}
			}

			.needle {
				position: relative;
				z-index: 10;

				image {
					width: 192rpx;
					height: 274rpx;
					margin-left: 96rpx;
					transform-origin: 28rpx 4rpx;
					transform: rotate(-29deg);
					transition: transform 1s linear;
				}

				.circle {
					z-index: 1;
					position: absolute;
					left: 110rpx;
					top: -26rpx;
					width: 50rpx;
					height: 50rpx;
					border-radius: 50%;
					background-color: #fff;
				}
			}

			.disContainer {
				position: absolute;
				top: 210rpx;
				width: 598rpx;
				height: 598rpx;
				animation: disRotate 10s linear 1s infinite;

				.disImg {
					z-index: 2;
					position: absolute;
					width: 100%;
					height: 100%;
				}

				.cover {
					position: absolute;
					top: 0;
					bottom: 0;
					right: 0;
					left: 0;
					margin: auto;
					width: 370rpx;
					height: 370rpx;
				}
			}

			@keyframes disRotate {
				from {
					transform: rotate(0deg);
				}

				to {
					transform: rotate(360deg);
				}
			}
		}

		.moreOperate {
			position: absolute;
			left: 50%;
			bottom: 260rpx;
			width: 90%;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-around;

			text {
				font-size: 45rpx;
				color: #d7d4ce;
			}
		}

		.lyricHeader {
			margin-top: 40rpx;
			position: absolute;
			width: 100%;
			box-sizing: border-box;
			padding: 0 50rpx;
			display: flex;
			justify-content: space-between;

			.icon-24gl-volumeZero {
				font-size: 45rpx;
				color: rgba(255, 255, 255, 0.3);
			}

			.middle {
				height: 40rpx;
				color: rgba(255, 255, 255, 0.3);
				font-size: 24rpx;
				display: flex;
				border: 1rpx solid rgba(255, 255, 255, 0.3);
				border-radius: 21rpx;

				.btn {
					width: 100rpx;
					height: 40rpx;
					line-height: 40rpx;
					text-align: center;
					border-radius: 20rpx;
				}

				.active {
					background-color: rgba(255, 255, 255, 0.3);
					color: #fff;
				}
			}

			.icon-touping {
				font-size: 45rpx;
				color: rgba(255, 255, 255, 0.3);
			}
		}

		.lyricWrapper {
			position: absolute;
			top: 130rpx;
			height: 780rpx;
			overflow: hidden;
			// box-shadow: inset 0 5rpx 20rpx 20rpx rgba(0, 0, 0, 0.2);
			color: rgba(255, 255, 255, 0.8);

			.lyricContainer {
				width: 750rpx;
				height: 780rpx;

				.scrollWrapper {
					position: relative;
				}

				.blank {
					height: 300rpx;
				}

				.lyricItem {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 40rpx;
					font-size: 25rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.txt {
						width: 620rpx;
						text-align: center;
					}

					.trans {
						width: 620rpx;
						text-align: center;
					}
				}

				.active {
					color: #fff;
					font-weight: bold;
					font-size: 30rpx;
				}
			}
		
			.middle_line {
				position: absolute;
				top: 50%;
				width: 100%;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				padding: 0 10rpx;
				
				.line {
					transform: translateY(16rpx);
					flex: 1;
					border-top: 1rpx solid rgba(255,255,255,0.3);
					margin: 0 20rpx;
				}
				
				.txt {
					font-size: 26rpx;
				}
			}
		}

		.otherOperate {
			position: absolute;
			bottom: 225rpx;
			box-sizing: border-box;
			padding: 0 40rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;

			.icon-shipinbofang {
				color: gray;
				font-size: 45rpx;
			}

			.right {
				display: flex;
				align-items: center;
				color: rgba(255, 255, 255, 0.3);

				.showTran {
					width: 57rpx;
					height: 35rpx;
					line-height: 35rpx;
					text-align: center;
					font-size: 22rpx;
					border-radius: 17.5rpx;
					border: 1rpx solid rgba(255, 255, 255, 0.3);
					margin-right: 30rpx;

				}

				.icon-gengduo {
					font-size: 40rpx;
				}
			}
		}

		.progress {
			position: absolute;
			left: 50%;
			bottom: 140rpx;
			transform: translateX(-50%);
			width: 90%;
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				font-size: 20rpx;
				color: #d7d4ce;
			}

			:deep(.slider) {
				flex: 1;
			}
		}

		.player {
			position: absolute;
			left: 50%;
			bottom: 54rpx;
			width: 78%;
			transform: translateX(-50%);
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #fff;

			text {
				font-size: 41rpx;
			}

			.playBtn {
				font-size: 73rpx;
			}
		}
	}
</style>