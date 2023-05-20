import {
	getAllTag
} from '@/api/playlistTags.js'

export function hGetAllTag() {
	let tagObj = ref({})
	
	getAllTag().then(({categories,sub}) => {
		const result = {}
		Object.values(categories).forEach(item =>{
			result[item] = []
		})
		sub.forEach(item => {
			result[categories[item.category]].push(item)
		})
		console.log(result);
		tagObj.value = result
	})

	return tagObj
}