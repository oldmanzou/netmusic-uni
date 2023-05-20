	import {
		getDefaultSearchKeyword,
		getBanners,
		getPersonalized
	} from '@/api/home.js'

	// 获取默认搜索关键字
	export function getSearchKeyword() {
		let defaultSearchKeyword = ref('')

		getDefaultSearchKeyword().then(res => {
			defaultSearchKeyword.value = res.data.realkeyword
		})

		return defaultSearchKeyword
	}

	export function hGetBanners(){
		let banners = ref([])

		getBanners().then(res => {
			banners.value = res.banners
		})

		return banners
	}
	
	export function hGetPersonalized() {
		let personalized = ref([])
		
		getPersonalized().then(res=>{
			personalized.value = res.result
		})
		
		return personalized
	}
	
	