<template>
	<tags title="我的歌单广场" isMyTag :tags="myTags"></tags>
	<tags title="语种" :tags="tagObj['语种']"></tags>
	<tags title="风格" :tags="tagObj['风格']"></tags>
	<tags title="场景" :tags="tagObj['场景']"></tags>
	<tags title="情感" :tags="tagObj['情感']"></tags>
	<tags title="主题" :tags="tagObj['主题']"></tags>
</template>

<script setup>
	import {
		hGetAllTag
	} from '@/hooks/playlistTags.js'
	let tagObj = hGetAllTag() // 获取标签
	
	const store = useStore()
	let myTags = computed(() => store.state.playlistTags.userSelectTags) // 用户选择的tags
</script>

<script>
	export default {
		name: 'playlistTags'
	}
</script>

<style lang="scss">

</style>