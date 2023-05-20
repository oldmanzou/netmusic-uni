const state = {
	userSelectTags: [{
			name: '推荐',
		}, {
			name: '官方'
		}, {
			name: '精品'
		},
		{
			name: '华语'
		}, {
			name: '流行'
		}, {
			name: '电子'
		}, {
			name: '说唱'
		}
	]
}

const mutations = {
	USERSELECTTAGS(state, userSelectTags) {
		state.userSelectTags = userSelectTags
	}
}

const actions = {}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}