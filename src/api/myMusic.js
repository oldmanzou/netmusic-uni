import request from "@/utils/request";

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function getUserPlaylistNum() {
	return request('/user/subcount')
}

// 获取用户歌单 (喜欢 创建 收藏)
export function getUserPlaylists(uid) {
	return request(`/user/playlist?uid=${uid}`)
}