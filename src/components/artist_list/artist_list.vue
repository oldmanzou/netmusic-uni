<template>
	<artist v-for="artist in artists.artists" :key="artist.id" :artist="artist"></artist>
</template>

<script setup>
	defineProps({
		artists:{
			type:Object,
			require:true
		}
	})
</script>

<script>
	export default {
		name:"artist_list",
	}
</script>

<style lang="scss">

</style>