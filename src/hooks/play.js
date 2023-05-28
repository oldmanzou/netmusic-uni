import {
	getSongDetail,
	getSongUrl,
	getLyric
} from '@/api/play.js'
import {
	computed,
	getCurrentInstance,
	inject,
	onMounted,
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
	let lyric = ref([])
	let lyricTimes = computed(() => lyric.value.map(l => l.time))

	// 当前应该高亮的歌词
	let activeLyricTime = computed(() => {
		const lyricTimes = lyric.value.map(l => l.time)
		const currentTime = moment.duration(`00:${currentPlayTime.value}`).asSeconds()
		const index = lyricTimes.findIndex(t => t > currentTime)
		return lyricTimes[index - 1]
	})

	let scrollTop = ref(0)

	let rpxToPx = 1 // 1rpx 等于多少px（当前设备）
	uni.getSystemInfo({
		success(data) {
			rpxToPx = data.screenWidth / 750
		}
	})

	const instance = getCurrentInstance()

	onLoad((option) => {
		if (option.songId) {
			uni.setStorageSync('songId', option.songId)
		}

		songId.value = option.songId || uni.getStorageSync('songId')

		into()
	})

	async function into() {
		// 重置
		currentPlayTime.value = '00:00'
		currentProgressValue.value = 0

		await hGetSongDetail()
		hGetLyric()
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

	// 获取歌词
	function hGetLyric() {
		getLyric(songId.value).then(res => {
			// 歌词正文数组
			const mainBody = Array.from(res.lrc.lyric.matchAll(/(?<time>\[.*?\])(?<txt>.+?((?=\n)|$))/g)).map(
				item =>
				({
					time: item.groups.time,
					txt: item.groups.txt,
					translation: null
				})
			)

			// 歌词译文的类型 拼音或翻译
			const otherTxt = res.romalrc.lyric || res.tlyric.lyric

			// 歌词译文数组
			const translation = Array.from(otherTxt.matchAll(/(?<time>\[.*?\])(?<txt>.+?((?=\n)|$))/g))
				.map(item => ({
					time: item.groups.time,
					txt: item.groups.txt
				}))

			// 将译文写入到正文数组对象中
			mainBody.forEach(m => {
				translation.forEach(t => {
					if (t.time == m.time || t.time == m.time.replace(']', '0]')) {
						m.translation = t.txt
					}
				})
			})

			mainBody.forEach(item => {
				const timeStr = item.time.match(/(?<=\[)(.+?)(?=\.\d+\])/)[0] // 格式 00:00
				item.time = moment.duration(`00:${timeStr}`).asSeconds() // 01:10 => 70   秒 
			})
			lyric.value = mainBody
		})
	}

	let prevEleTop = 0

	function getDomInfo(selector) {
		let scrollViewTop = 0
		let query = uni.createSelectorQuery().in(instance)

		query.select(`.${selector}`).fields({
			size: true
		}, res => {}).exec()
	}

	// 初始化播放器
	async function initPlayer() {
		await hGetSongUrl()
		await configAppSongUrl()

		// 使用该进度监听函数,只有不在configAppSongUrl函数里面调用才会生效
		$global.$audioContext.onTimeUpdate(() => {
			const cTime = $global.$audioContext.currentTime

			currentPlayTime.value = moment(cTime * 1000).format('mm:ss')
			if (!isChanging.value) {
				currentProgressValue.value = (cTime / songDetail.value.dt) * 100
			}

			if (lyricTimes.value.includes(Math.floor(cTime))) {
				getDomInfo(`class${Math.floor(cTime)}`)
			}
		})

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

			backgroudAudioManager.onPlay(() => {
				onlyChangePlayStyle()
			})

			backgroudAudioManager.onPause(() => {
				onlyChangePauseStyle()
			})

			backgroudAudioManager.onPrev(() => {
				switchSong('prev')
			})

			backgroudAudioManager.onNext(() => {
				switchSong('next')
			})

			backgroudAudioManager.onEnded(() => {
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
		switchSong,
		lyric,
		activeLyricTime,
		scrollTop
	}
}