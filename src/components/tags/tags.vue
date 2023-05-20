<template>
	<view class="container">
		<view class="header">
			<view class="title_wrapper">
				<text class="title">{{title}}</text>
				<text v-if="isMyTag" class="edit_text">(长按可编辑)</text>
			</view>
			<view v-if="isMyTag" class="editBtn" >编辑</view>
		</view>
		<view class="tags">
			<view class="tag" v-for="tag in tags" :key="tag.name">
				<text v-if="tag.hot" class="iconfont icon-huo"></text>
				{{tag.name}}
			</view>
		</view>
	</view>
</template>

<script setup>
	defineProps({
		title:{
			type:String,
			default:'标题'
		},
		isMyTag:{
			type:Boolean,
			default:false
		},
		tags:{
			type:Array,
			default() {
				return []
			}
		}
	})
</script>

<script>
	export default {
		name:"tags"
	}
</script>

<style lang="scss" scoped>
.container {
	padding:0 30rpx;
	margin: 30rpx 0;
	.header {
		display: flex;
		justify-content: space-between;
		.title_wrapper {
			.title {
				font-size: 25rpx;
			}
			
			.edit_text {
				margin-left: 15rpx;
				font-size: 20rpx;
				color: #333;
			}
		} 
		
		.editBtn {
			font-size: 20rpx;
			padding: 5rpx 10rpx;
			border: 1rpx solid #dd001b;
			color:#dd001b;
			border-radius: 21rpx;
		}
	}

	.tags {
		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		
		.tag {
			box-sizing: border-box;
			width: 22%;
			font-size: 23rpx;
			padding: 15rpx 0;
			background-color: #f3f3f3;
			border-radius: 72rpx;
			margin: 8rpx;
			text-align: center;
			
			.icon-huo {
				color: #dd001b;
				font-size: 26rpx;
			}
		}
	}
}
</style>