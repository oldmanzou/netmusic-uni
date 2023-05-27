<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
});
onShow(() => {
});
onHide(() => {
});
</script>
<style lang="scss">
	@import url('./static/iconfont/iconfont.css');
	@import "@/uni_modules/uview-plus/index.scss";
	page{
		height: 100%;
		// overflow: hidden;
	}
	
	/* 隐藏scroll-view 在安卓机上的横向滚动条 */
	::-webkit-scrollbar{
	    width: 0;
	    height: 0;
	    color: transparent;
	    display:none;
	}
	
	view[hidden] {
		display: none !important;
	}
</style>
