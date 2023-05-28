import {
	getDefaultKeyword,
	getSearchResult
} from '@/api/search.js'

// 获取搜索的默认关键词
export function getKeyword() {
	let defaultKeyword = ref('')

	getDefaultKeyword().then(res => {
		defaultKeyword.value = res.data.realkeyword
	})

	return defaultKeyword
}

export function searchRelevant() {
	let inputValue = ref('')
	let searchResultArr = ref([])
	let historyArr = ref(JSON.parse(uni.getStorageSync('searchHistory') || "[]"))
	let isShowHistory = computed(() => inputValue.value == '')

	onLoad(({
		keyword = ''
	}) => {
		inputValue.value = keyword
	})

	watch(inputValue, handleInput)

	// 搜索(防抖)
	let flag = false

	function handleInput() {
		if (flag) return

		flag = true
		setTimeout(() => {
			flag = false
			const value = inputValue.value.trim()
			if (value) {
				// 执行搜索
				getSearchResult(value).then(({
					code,
					result,
				}) => {
					searchResultArr.value = []
					if (code == 200) {
						// 历史记录
						historyArr.value.unshift(value)
						historyArr.value = Array.from(new Set(historyArr.value))
						uni.setStorageSync('searchHistory', JSON.stringify(historyArr.value))

						if (result.songCount) {
							// 搜索结果
							// 富文本渲染
							result.songs.forEach(s => {
								s.richName = s.name.replace(value,
									`<span style="color:#95969a">${value}</span>`)
							})
							searchResultArr.value = result.songs
						}
					}
				})
			}
		}, 700)
	}

	// 删除所有历史记录
	function delHistory() {
		uni.showModal({
			content: '确定清空全部历史记录?',
			confirmText: '清空',
			cancelColor: '#d53c36',
			confirmColor: '#d53c36',
			success: function(res) {
				if (res.confirm) {
					historyArr.value = []
					uni.removeStorageSync('searchHistory')
				}
			}
		});
	}

	return {
		inputValue,
		searchResultArr,
		historyArr,
		isShowHistory,
		handleInput,
		delHistory
	}
}