import _ from 'lodash'
import {
  GET_PUBLIC_POSTS_LIST_PENDING,
  GET_PUBLIC_POSTS_LIST_FULFILLED,
  GET_PUBLIC_POSTS_LIST_REJECTED,
  GET_PUBLIC_REACTIONS_POSTS_LIST_PENDING,
  GET_PUBLIC_REACTIONS_POSTS_LIST_FULFILLED,
  GET_PUBLIC_REACTIONS_POSTS_LIST_REJECTED,
  GET_PRIVATE_POSTS_LIST_PENDING,
  GET_PRIVATE_POSTS_LIST_FULFILLED,
  GET_PRIVATE_POSTS_LIST_REJECTED,
  GET_PRIVATE_REACTIONS_POSTS_LIST_PENDING,
  GET_PRIVATE_REACTIONS_POSTS_LIST_FULFILLED,
  GET_PRIVATE_REACTIONS_POSTS_LIST_REJECTED,
  POST_ADD_REACTION_PENDING,
  POST_ADD_REACTION_FULFILLED,
  POST_ADD_REACTION_REJECTED,
  DELETE_REMOVE_REACTION_PENDING,
  DELETE_REMOVE_REACTION_FULFILLED,
  DELETE_REMOVE_REACTION_REJECTED,
  POST_ADD_POST_PENDING,
  POST_ADD_POST_FULFILLED,
  POST_ADD_POST_REJECTED,
  PATCH_UPDATE_POST_PENDING,
  PATCH_UPDATE_POST_FULFILLED,
  PATCH_UPDATE_POST_REJECTED,
  SET_AUTHOR_POST_VIEW_PENDING,
  SET_AUTHOR_POST_VIEW_FULFILLED,
  SET_AUTHOR_POST_VIEW_REJECTED,
  GET_LABELS_LIST_PENDING,
  GET_LABELS_LIST_REJECTED,
  GET_LABELS_LIST_FULFILLED,
  DELETE_PRIVATE_POST_PENDING,
  DELETE_PRIVATE_POST_REJECTED,
  DELETE_PRIVATE_POST_FULFILLED
} from '../data/mutation-types'
import reactionTypes from '../data/reaction-types'
import { fnFilterPostLabels } from '~/utils/utils'
import { POSTS_LABELS_CONFIG } from '~/data/default-data'

// https://dev.to/localeai/architecting-vuex-store-for-large-scale-vue-js-applications-4f1f
// 4. Resseting module state
const initialState = () => ({
  publicList: [],
  countPublic: 0,
  privateList: [],
  countPrivate: 0,
  postView: {
    author: {},
    post: {}
  },
  adminLabels: [],
  status: {
    get: {
      isPublicPending: true,
      isPublicFulfilled: false,
      isPublicRejected: false,
      isPrivatePending: true,
      isPrivateFulfilled: false,
      isPrivateRejected: false,
      isAuthorPending: true,
      isAuthorFulfilled: false,
      isAuthorRejected: false,
      isLabelPending: true,
      isLabelFulfilled: false,
      isLabelRejected: false
    },
    post: {
      isPending: false,
      isFulfilled: false,
      isRejected: false
    },
    delete: {
      isPending: false,
      isFulfilled: false,
      isRejected: false
    }
  }
})

export const state = () => initialState()

export const mutations = {
  [GET_PUBLIC_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: true,
      isPublicFulfilled: false
    }
  },
  [GET_PUBLIC_POSTS_LIST_FULFILLED](state, { posts, count }) {
    state.publicList = posts
    state.countPublic = count
    state.status.get = {
      ...state.status.get,
      isPublicPending: false,
      isPublicFulfilled: true,
      isPublicRejected: false
    }
  },
  [GET_PUBLIC_POSTS_LIST_REJECTED](state, error) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: false,
      isPublicFulfilled: false,
      isPublicRejected: true
    }
  },
  [GET_PUBLIC_REACTIONS_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: true,
      isPublicFulfilled: false
    }
  },
  [GET_PUBLIC_REACTIONS_POSTS_LIST_FULFILLED](state, payload) {
    state.publicList = payload
    state.status.get = {
      ...state.status.get,
      isPublicPending: false,
      isPublicFulfilled: true,
      isPublicRejected: false
    }
  },
  [GET_PUBLIC_REACTIONS_POSTS_LIST_REJECTED](state, error) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: false,
      isPublicFulfilled: false,
      isPublicRejected: true
    }
  },
  [GET_PRIVATE_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: true,
      isPrivateFulfilled: false
    }
  },
  [GET_PRIVATE_POSTS_LIST_FULFILLED](state, { posts, count }) {
    state.privateList = posts
    state.countPrivate = count
    state.status.get = {
      ...state.status.get,
      isPrivatePending: false,
      isPrivateFulfilled: true,
      isPrivateRejected: false
    }
  },
  [GET_PRIVATE_POSTS_LIST_REJECTED](state, error) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: true
    }
  },
  [GET_PRIVATE_REACTIONS_POSTS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: true,
      isPrivateFulfilled: false
    }
  },
  [GET_PRIVATE_REACTIONS_POSTS_LIST_FULFILLED](state, payload) {
    state.privateList = payload
    state.status.get = {
      ...state.status.get,
      isPrivatePending: false,
      isPrivateFulfilled: true,
      isPrivateRejected: false
    }
  },
  [GET_PRIVATE_REACTIONS_POSTS_LIST_REJECTED](state, error) {
    state.status.get = {
      ...state.status.get,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: true
    }
  },
  [POST_ADD_REACTION_PENDING](state) {
    state.status.post = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [POST_ADD_REACTION_FULFILLED](state, payload) {
    const { postNumber, indexReaction } = payload
    const statePost = _.find(state.publicList, {
      number: postNumber
    })
    const indexPost = _.findIndex(state.publicList, { number: postNumber })
    const stateReactionPost = statePost.reactions[indexReaction]

    // eslint-disable-next-line
    state.publicList[indexPost].reactions[
      indexReaction
    ].userLoggedHasReaction = true

    state.publicList[indexPost].reactions[indexReaction].count += 1

    state.publicList[indexPost].reactions[indexReaction].users = [
      ...stateReactionPost.users,
      payload.reaction
    ]

    state.status.post = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [POST_ADD_REACTION_REJECTED](state, error) {
    state.status.post = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  },
  [DELETE_REMOVE_REACTION_PENDING](state) {
    state.status.delete = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [DELETE_REMOVE_REACTION_FULFILLED](state, payload) {
    const { postNumber, indexReaction, idReaction } = payload
    const indexPost = _.findIndex(state.publicList, { number: postNumber })
    _.remove(
      state.publicList[indexPost].reactions[indexReaction].users,
      u => u.id === idReaction
    )

    state.publicList[indexPost].reactions[indexReaction].count -= 1
    // eslint-disable-next-line
    state.publicList[indexPost].reactions[
      indexReaction
    ].userLoggedHasReaction = false

    state.status.delete = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [DELETE_REMOVE_REACTION_REJECTED](state, error) {
    state.status.delete = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  },
  [POST_ADD_POST_PENDING](state) {
    state.status.post = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [POST_ADD_POST_FULFILLED](state) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: true,
      isPublicFulfilled: false,
      isPublicRejected: false,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: false
    }
    state.status.post = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [POST_ADD_POST_REJECTED](state, error) {
    state.status.post = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  },
  [PATCH_UPDATE_POST_PENDING](state) {
    state.status.post = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [PATCH_UPDATE_POST_FULFILLED](state) {
    state.status.get = {
      ...state.status.get,
      isPublicPending: true,
      isPublicFulfilled: false,
      isPublicRejected: false,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: false
    }
    state.status.post = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }
  },
  [PATCH_UPDATE_POST_REJECTED](state, error) {
    state.status.post = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  },
  [SET_AUTHOR_POST_VIEW_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isAuthorPending: true,
      isAuthorFulfilled: false,
      isAuthorRejected: false
    }
  },
  [SET_AUTHOR_POST_VIEW_FULFILLED](state, payload) {
    state.status.get = {
      ...state.status.get,
      isAuthorPending: false,
      isAuthorFulfilled: true,
      isAuthorRejected: false
    }
    state.postView.author = payload
  },
  [SET_AUTHOR_POST_VIEW_REJECTED](state, error) {
    state.status.get = {
      ...state.status.get,
      isAuthorPending: false,
      isAuthorFulfilled: false,
      isAuthorRejected: true
    }
  },
  [GET_LABELS_LIST_PENDING](state) {
    state.status.get = {
      ...state.status.get,
      isLabelPending: true,
      isLabelFulfilled: false
    }
  },
  [GET_LABELS_LIST_FULFILLED](state, payload) {
    state.adminLabels = payload
    state.status.get = {
      ...state.status.get,
      isLabelPending: false,
      isLabelFulfilled: true,
      isLabelRejected: false
    }
  },
  [GET_LABELS_LIST_REJECTED](state, error) {
    state.status.get = {
      ...state.status.get,
      isLabelPending: false,
      isLabelFulfilled: false,
      isLabelRejected: true
    }
  },
  [DELETE_PRIVATE_POST_PENDING](state) {
    state.status.delete = {
      isPending: true,
      isFulfilled: false,
      isRejected: false
    }
  },
  [DELETE_PRIVATE_POST_FULFILLED](state) {
    state.status.delete = {
      isPending: false,
      isFulfilled: true,
      isRejected: false
    }

    state.status.get = {
      ...state.status.get,
      isPublicPending: true,
      isPublicFulfilled: false,
      isPublicRejected: false,
      isPrivatePending: false,
      isPrivateFulfilled: false,
      isPrivateRejected: false
    }
  },
  [DELETE_PRIVATE_POST_REJECTED](state, error) {
    state.status.delete = {
      isPending: false,
      isFulfilled: false,
      isRejected: true
    }
  }
}

export const actions = {
  getPublicPostsListPending({ commit }) {
    commit(GET_PUBLIC_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPublicPostsListFulfilled({ commit }, posts) {
    commit(GET_PUBLIC_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPublicPostsListRejected({ commit }, error) {
    commit(GET_PUBLIC_POSTS_LIST_REJECTED, error)
    return Promise.resolve()
  },
  getPublicReactionsPostsListPending({ commit }) {
    commit(GET_PUBLIC_REACTIONS_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPublicReactionsPostsListFulfilled({ commit }, posts) {
    commit(GET_PUBLIC_REACTIONS_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPublicReactionsPostsListRejected({ commit }, error) {
    commit(GET_PUBLIC_REACTIONS_POSTS_LIST_REJECTED, error)
    return Promise.resolve()
  },
  getPrivatePostsListPending({ commit }) {
    commit(GET_PRIVATE_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPrivatePostsListFulfilled({ commit }, posts) {
    commit(GET_PRIVATE_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPrivatePostsListRejected({ commit }, error) {
    commit(GET_PRIVATE_POSTS_LIST_REJECTED, error)
    return Promise.resolve()
  },
  getPrivateReactionsPostsListPending({ commit }) {
    commit(GET_PRIVATE_REACTIONS_POSTS_LIST_PENDING)
    return Promise.resolve()
  },
  getPrivateReactionsPostsListFulfilled({ commit }, posts) {
    commit(GET_PRIVATE_REACTIONS_POSTS_LIST_FULFILLED, posts)
    return Promise.resolve()
  },
  getPrivateReactionsPostsListRejected({ commit }, error) {
    commit(GET_PRIVATE_REACTIONS_POSTS_LIST_REJECTED, error)
    return Promise.resolve()
  },
  postAddReactionPending({ commit }) {
    commit(POST_ADD_REACTION_PENDING)
    return Promise.resolve()
  },
  postAddReactionFulfilled({ commit }, reaction) {
    commit(POST_ADD_REACTION_FULFILLED, reaction)
    return Promise.resolve()
  },
  postAddReactionRejected({ commit }, error) {
    commit(POST_ADD_REACTION_REJECTED, error)
    return Promise.resolve()
  },
  deleteRemoveReactionPending({ commit }) {
    commit(DELETE_REMOVE_REACTION_PENDING)
    return Promise.resolve()
  },
  deleteRemoveReactionFulfilled({ commit }, reaction) {
    commit(DELETE_REMOVE_REACTION_FULFILLED, reaction)
    return Promise.resolve()
  },
  deleteRemoveReactionRejected({ commit }, error) {
    commit(DELETE_REMOVE_REACTION_REJECTED, error)
    return Promise.resolve()
  },
  postAddPostPending({ commit }) {
    commit(POST_ADD_POST_PENDING)
    return Promise.resolve()
  },
  postAddPostFulfilled({ commit }) {
    commit(POST_ADD_POST_FULFILLED)
    return Promise.resolve()
  },
  postAddPostRejected({ commit }, error) {
    commit(POST_ADD_POST_REJECTED, error)
    return Promise.resolve()
  },
  patchUpdatePostPending({ commit }) {
    commit(PATCH_UPDATE_POST_PENDING)
    return Promise.resolve()
  },
  patchUpdatePostFulfilled({ commit }) {
    commit(PATCH_UPDATE_POST_FULFILLED)
    return Promise.resolve()
  },
  patchUpdatePostRejected({ commit }, error) {
    commit(PATCH_UPDATE_POST_REJECTED, error)
    return Promise.resolve()
  },
  setAuthorPostViewPending({ commit }) {
    commit(SET_AUTHOR_POST_VIEW_PENDING)
    return Promise.resolve()
  },
  setAuthorPostViewFulfilled({ commit }, author) {
    commit(SET_AUTHOR_POST_VIEW_FULFILLED, author)
    return Promise.resolve()
  },
  setAuthorPostViewRejected({ commit }, error) {
    commit(SET_AUTHOR_POST_VIEW_REJECTED, error)
    return Promise.resolve()
  },
  getLabelsListPending({ commit }) {
    commit(GET_LABELS_LIST_PENDING)
    return Promise.resolve()
  },
  getLabelsListFulfilled({ commit }, labels) {
    commit(GET_LABELS_LIST_FULFILLED, labels)
    return Promise.resolve()
  },
  getLabelsListRejected({ commit }, error) {
    commit(GET_LABELS_LIST_REJECTED, error)
    return Promise.resolve()
  },
  deletePrivatePostPending({ commit }) {
    commit(DELETE_PRIVATE_POST_PENDING)
    return Promise.resolve()
  },
  deletePrivatePostFulfilled({ commit }) {
    commit(DELETE_PRIVATE_POST_FULFILLED)
    return Promise.resolve()
  },
  deletePrivatePostRejected({ commit }, error) {
    commit(DELETE_PRIVATE_POST_REJECTED, error)
    return Promise.resolve()
  },
  // Default values in object parameters
  // https://javascript.info/destructuring-assignment
  async getPostsList(
    { dispatch, state, rootState, $axios },
    { type = '', page = 1, tags = [] } = {}
  ) {
    let flagType = 'Public'

    if (type === 'private') {
      flagType = 'Private'
    }

    try {
      await dispatch(`get${flagType}PostsListPending`)
      let posts = null
      let postsAllRequest = null

      const postLabel = POSTS_LABELS_CONFIG.post
      const publicLabel = POSTS_LABELS_CONFIG.public

      if (type === 'private') {
        const usernameLogged = _.get(rootState.users.user, 'login', '')

        postsAllRequest = await this.$axios.get(
          `issues?creator=${usernameLogged}&labels=${postLabel},${tags}`
        )
        posts = _.values(
          await this.$axios.$get(
            `issues?creator=${usernameLogged}&labels=${postLabel},${tags}&page=${page}`
          )
        )
      } else {
        postsAllRequest = await this.$axios.get(
          `issues?labels=${postLabel},${publicLabel},${tags}`
        )
        posts = _.values(
          await this.$axios.$get(
            `issues?labels=${postLabel},${publicLabel},${tags}&page=${page}`
          )
        )
      }

      // Max number of issues that github returns in a request for page
      // https://developer.github.com/v3/issues/#list-repository-issues
      const GITHUB_ITEMS = 30
      const totalPagesGitHub = /page=(\d).+?page=(\d)/gim.exec(
        postsAllRequest.headers.link
      )
      const totalElementsInApi =
        (!totalPagesGitHub ? 1 : totalPagesGitHub[2]) * GITHUB_ITEMS

      const formattedPosts = posts.map(p => {
        const postJSON = JSON.parse(p.title)
        return {
          ...p,
          post: {
            ...postJSON,
            titleHTML: this.$markdownit.renderInline(postJSON.title),
            descriptionHTML: this.$markdownit.renderInline(
              postJSON.description
            ),
            content: p.body,
            contentHTML: this.$markdownit.render(p.body),
            coverBlog: postJSON.coverBlog,
            coverCEO: postJSON.coverCEO
          }
        }
      })

      await dispatch(`get${flagType}PostsListFulfilled`, {
        posts: _.orderBy(formattedPosts, ['number'], ['desc']),
        count: totalElementsInApi
      })
      await dispatch('getReactionsPostsList', type)
      await dispatch('getLabelsList')

      return Promise.resolve({ status: '200' })
    } catch (error) {
      dispatch(`get${flagType}PostsListRejected`, error)
      this.$errorGlobalHandler({ message: `${error}` })
      return Promise.reject(error)
    }
  },
  async getReactionsPostsList(
    { dispatch, state, $axios, rootState },
    type = 'public'
  ) {
    let { publicList: postsList } = state
    let flagType = 'Public'

    if (type === 'private') {
      const { privateList } = state
      postsList = privateList
      flagType = 'Private'
    }

    const usernameLogged = _.get(rootState.users.user, 'login', '')

    try {
      await dispatch(`get${flagType}ReactionsPostsListPending`)
      const postsWithReactionsPromises = _.map(postsList, async post => {
        const reactions = _.values(
          await this.$axios.$get(`issues/${post.number}/reactions`, {
            headers: { Accept: 'application/vnd.github.squirrel-girl-preview' }
          })
        )

        const reactionsGrouped = _.groupBy(reactions, 'content')
        const reactionsOrdered = _.map(reactionTypes, rt => {
          const reaction = _.isUndefined(reactionsGrouped[rt])
            ? null
            : reactionsGrouped[rt]
          return {
            content: rt,
            count: !reaction ? 0 : reaction.length,
            users: !reaction ? [] : reaction,
            userLoggedHasReaction: !reaction
              ? false
              : _.find(reaction, r => r.user.login === usernameLogged)
          }
        })
        return {
          ...post,
          reactions: reactionsOrdered
        }
      })
      await Promise.all(postsWithReactionsPromises).then(
        async postsWithReactions => {
          await dispatch(
            `get${flagType}ReactionsPostsListFulfilled`,
            _.orderBy(postsWithReactions, ['number'], ['desc'])
          )
          return Promise.resolve({ status: '200' })
        }
      )
    } catch (error) {
      dispatch(`get${flagType}ReactionsPostsListRejected`, error)
      this.$errorGlobalHandler({ message: `${error}` })
      return Promise.reject(error)
    }
  },
  async getLabelsList({ dispatch, $axios }) {
    try {
      await dispatch('getLabelsListPending')
      const labels = await this.$axios.$get('labels')
      const labelsFiltered = fnFilterPostLabels(
        [
          POSTS_LABELS_CONFIG.post,
          POSTS_LABELS_CONFIG.hidden,
          POSTS_LABELS_CONFIG.public
        ],
        labels
      )
      await dispatch('getLabelsListFulfilled', labelsFiltered)
    } catch (error) {
      dispatch('getLabelsListRejected', error)
      return Promise.reject(error)
    }
  },
  async handleReaction({ dispatch, rootState }, data) {
    try {
      const usernameLogged = _.get(rootState.users.user, 'login', '')
      if (usernameLogged) {
        const { number, reaction } = data
        if (reaction.userLoggedHasReaction) {
          const userLoggedReaction = _.find(
            reaction.users,
            u => u.user.login === usernameLogged
          )

          const userLoggedReactionIndex = _.findIndex(
            reaction.users,
            u => u.user.login === usernameLogged
          )

          await dispatch('deleteRemoveReaction', {
            postNumber: number,
            indexUserReaction: userLoggedReactionIndex,
            idReaction: userLoggedReaction.id,
            reaction: reaction.content
          })
          return Promise.resolve()
        } else {
          await dispatch('postAddReaction', {
            number,
            reaction: reaction.content
          })
          return Promise.resolve()
        }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async postAddReaction({ dispatch, state }, { number, reaction }) {
    try {
      await dispatch('postAddReactionPending')
      const reactionPost = await this.$axios.$post(
        `issues/${number}/reactions`,
        {
          content: reaction
        },
        {
          headers: {
            Accept: 'application/vnd.github.squirrel-girl-preview'
          }
        }
      )
      const indexReaction = _.findIndex(reactionTypes, rt => rt === reaction)
      const reactionFulfilled = {
        postNumber: number,
        indexReaction,
        reaction: reactionPost
      }
      await dispatch('postAddReactionFulfilled', reactionFulfilled)
      return Promise.resolve()
    } catch (error) {
      dispatch('postAddReactionRejected', error)
      return Promise.reject(error)
    }
  },
  async deleteRemoveReaction(
    { dispatch },
    { postNumber, indexUserReaction, indexReaction, idReaction, reaction }
  ) {
    try {
      await dispatch('deleteRemoveReactionPending')
      await this.$axios.$delete(
        `https://api.github.com/reactions/${idReaction}`,
        {
          headers: {
            Accept: 'application/vnd.github.squirrel-girl-preview'
          }
        }
      )
      const indexReaction = _.findIndex(reactionTypes, rt => rt === reaction)
      await dispatch('deleteRemoveReactionFulfilled', {
        postNumber,
        idReaction,
        indexReaction
      })
      return Promise.resolve({ status: '200' })
    } catch (error) {
      dispatch('deleteRemoveReactionRejected', error)
      return Promise.reject(error)
    }
  },
  // Default values in object parameters
  // https://javascript.info/destructuring-assignment
  async postAddPost({ dispatch, rootState }, { data = {} } = {}) {
    try {
      await dispatch('postAddPostPending')

      const usernameLogged = _.get(rootState.users.user, 'login', '')
      if (!usernameLogged) {
        throw new Error('401')
      }

      const emptyKey = _.filter(data, k => k === '' || k === null)
      if (emptyKey.length > 0) {
        throw new Error('Empty parameters')
      }

      const titleGitHubIssueFormat = {
        title: data.title,
        description: data.description,
        coverBlog: data.coverBlog,
        coverCEO: data.coverCEO
      }

      const dataPost = {
        title: JSON.stringify(titleGitHubIssueFormat),
        body: data.body,
        labels: data.labels
      }

      const result = await this.$axios.post('issues', dataPost)

      await dispatch('postAddPostFulfilled')
      return Promise.resolve(result)
    } catch (error) {
      await dispatch('postAddPostRejected', error)
      this.$errorGlobalHandler({ message: `${error}` })
      return Promise.reject(error)
    }
  },
  // Default values in object parameters
  // https://javascript.info/destructuring-assignment
  async patchUpdatePost({ dispatch, rootState }, { data = {} } = {}) {
    try {
      await dispatch('patchUpdatePostPending')
      const usernameLogged = _.get(rootState.users.user, 'login', '')
      if (!usernameLogged) {
        throw new Error('401')
      }

      const emptyKey = _.filter(data, k => k === '' || k === null)
      if (emptyKey.length > 0) {
        throw new Error('Empty parameters')
      }

      const titleGitHubIssueFormat = {
        title: data.title,
        description: data.description,
        coverBlog: data.coverBlog,
        coverCEO: data.coverCEO
      }

      const dataPost = {
        title: JSON.stringify(titleGitHubIssueFormat),
        body: data.body,
        labels: data.labels
      }

      const { postNumber } = data
      const result = await this.$axios.patch(`issues/${postNumber}`, dataPost)

      await dispatch('patchUpdatePostFulfilled')
      return Promise.resolve(result)
    } catch (error) {
      await dispatch('patchUpdatePostRejected', error)
      this.$errorGlobalHandler({ message: `${error}` })
      return Promise.reject(error)
    }
  },
  async updateAuthorPostView({ dispatch, state }, author) {
    try {
      await dispatch('setAuthorPostViewPending')
      const { url } = author
      const user = await this.$axios.$get(url)
      await dispatch('setAuthorPostViewFulfilled', user)
      return Promise.resolve({ status: '200' })
    } catch (error) {
      await dispatch('setAuthorPostViewRejected', error)
      return Promise.reject(error)
    }
  },
  async deletePrivatePost({ dispatch, rootState }, postNumber) {
    try {
      await dispatch('deletePrivatePostPending')

      const usernameLogged = _.get(rootState.users.user, 'login', '')
      if (!usernameLogged) {
        throw new Error('401')
      }

      const result = await this.$axios.patch(`issues/${postNumber}`, {
        state: 'closed'
      })

      await dispatch('deletePrivatePostFulfilled')
      return Promise.resolve(result)
    } catch (error) {
      await dispatch('deletePrivatePostRejected', error)
      this.$errorGlobalHandler({ message: `${error}` })
      return Promise.reject(error)
    }
  }
}
