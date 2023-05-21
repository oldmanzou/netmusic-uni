import {
	onLoad
} from "@dcloudio/uni-app";
import {
	getSongDetail,
	getSongUrl
} from '@/api/play.js'
import {
	inject,
	watch,
	watchEffect
} from "vue";
import moment from 'moment'
import pubSub from 'pubsub-js'

// 初始化
export function init() {
	let songId = ref('')
	let songDetail = ref({})
	let songUrl = ref('')
	let duration = ref('00:00')
	let currentPlayTime = ref('00:00') // 当前歌曲播放进度
	let currentProgressValue = ref(0) // 当前歌曲进度条取值
	let isPlay = ref(false)
	let isChanging = ref(false)
	const $global = inject('$global')

	onLoad((option) => {
		if (option.songId) {
			uni.setStorageSync('songId', option.songId)
		}

		songId.value = option.songId || uni.getStorageSync('songId')

		into()
	})

	function into() {
		hGetSongDetail()
		initPlayer()
	}

	// 获取歌曲详情
	async function hGetSongDetail() {
		const result = await getSongDetail(songId.value)
		songDetail.value = result.songs[0]
		duration.value = moment(songDetail.value.dt).format('mm:ss')
		setTitle()
	}

	function setTitle() {
		uni.setNavigationBarTitle({
			title: songDetail.value.name
		})
	}

	// 初始化播放器
	async function initPlayer() {
		await hGetSongUrl()
		await configAppSongUrl()
		play()
	}

	async function hGetSongUrl() {
		const result = await getSongUrl(songId.value)
		songUrl.value = result.data[0].url
	}

	function configAppSongUrl() {
		if (!Object.keys($global.$audioContext).length) {
			const backgroudAudioManager = uni.getBackgroundAudioManager()
			
			backgroudAudioManager.coverImgUrl = songDetail.value.al.picUrl
			
			// 监听进度
			backgroudAudioManager.onTimeUpdate(() => {
				currentPlayTime.value = moment(backgroudAudioManager.currentTime * 1000).format('mm:ss')
				if (!isChanging.value) {
					currentProgressValue.value = (backgroudAudioManager.currentTime / backgroudAudioManager
						.duration) * 100
				}
			})
			
			backgroudAudioManager.onPlay(()=>{
				onlyChangePlayStyle()
			})
			
			backgroudAudioManager.onPause(()=>{
				onlyChangePauseStyle()
			})
			
			backgroudAudioManager.onPrev(() =>{
				switchSong('prev')
			})
			
			backgroudAudioManager.onNext(()=>{
				switchSong('next')
			})
			
			backgroudAudioManager.onEnded(() =>{
				switchSong('next')
			})

			$global.$audioContext = backgroudAudioManager
		}
	}

	// 播放器操作
	function playOrPause() {
		isPlay.value ? pause() : play()
	}

	function play() {
		$global.$audioContext.src = songUrl.value
		$global.$audioContext.title = songDetail.value.name
		isPlay.value = true
	}

	function pause() {
		$global.$audioContext.pause()
		isPlay.value = false
	}
	
	function onlyChangePlayStyle() {
		isPlay.value = true
	}
	
	function onlyChangePauseStyle() {
		isPlay.value = false
	}

	function switchSong(type) {
		pubSub.unsubscribe('getPrevOrNextSongId');

		pubSub.subscribe('getPrevOrNextSongId', (eventName, id) => {
			songId.value = id
			uni.setStorageSync('songId', id)
			into()
		})

		pubSub.publish('requestPrevOrNextSongId', {
			type,
			currentSongId: songDetail.value.id
		})
	}

	// 进度条操作
	function sliderChanging(e) {
		isChanging.value = true
	}

	function sliderChange(e) {
		const value = e.detail.value
		currentProgressValue.value = value

		$global.$audioContext.seek((value * $global.$audioContext.duration) / 100)

		isChanging.value = false
	}


	return {
		songDetail,
		isPlay,
		playOrPause,
		currentPlayTime,
		currentProgressValue,
		duration,
		sliderChanging,
		sliderChange,
		switchSong
	}
}