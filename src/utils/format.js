	import moment from 'moment'
	
	export function formatTime(timestemp) {
		return moment(timestemp).format('mm:ss')
	}
	
	// 格式化日期
	export function formatDate(timestemp) {
		return moment(timestemp).format('YYYY.MM.DD')
	}
	
	// 格式化播放次数
	export function formatPlayCount(count) {
		return count < 10000 ? count : `${(count / 10000).toFixed(1)}万`
	}