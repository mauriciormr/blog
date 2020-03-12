<template>
  <div>
    <Loading
      v-if="(isDataPending && typeAction === 'edit') || showLoading"
      class="loading"
    />
    <ResourceNotFound
      v-else-if="!post && typeAction === 'edit'"
      :error="error"
    />
    <div v-else class="post-editor">
      <div>
        <h2 class="post-editor__title">
          Add publication
        </h2>
      </div>
      <div class="post-editor__actions">
        <button @click="openCloseCovers()" class="button-secondary">
          <i class="fa fa-picture-o" aria-hidden="true" />
          Covers
        </button>
        <button @click="publish('hidden')" class="button-secondary">
          <i class="fa fa-eye-slash" aria-hidden="true" />
          Draft
        </button>
        <button @click="publish('public')" class="button-primary">
          <i class="fa fa-paper-plane-o" aria-hidden="true" />
          Publish
        </button>
      </div>
      <div v-if="isOpenCovers" class="post-editor__media-covers">
        <button @click="openCloseModalPreview" class="button-secondary --small">
          <i class="fa fa-file-image-o" aria-hidden="true" />
          Covers preview
        </button>
        <div class="post-editor__media-covers__field">
          <label>Blog</label>
          <input
            v-model="coverBlog"
            type="text"
            placeholder="URL cover principal"
            class="input-text --small"
          />
        </div>
        <div class="post-editor__media-covers__field">
          <label>Redes sociales</label>
          <input
            v-model="coverCEO"
            type="text"
            placeholder="URL cover CEO"
            class="input-text --small"
          />
        </div>
      </div>
      <Toolbar
        :dom="getRefTextArea"
        @updateContentFromToolbar="updateContentFromToolbar"
        :class="full ? '--hidden' : '--show'"
      />
      <div class="post-editor__container">
        <button
          @click="fullpreview"
          class="post-editor__container__fullpreview"
        >
          <i class="fa fa-arrows-alt" aria-hidden="true" />
        </button>
        <div
          :class="full ? '--hidden' : '--show'"
          class="post-editor__container__editor"
        >
          <div class="post-editor__container__editor__field">
            <label>Title</label>
            <input
              :value="titleText"
              @input="updateTitle"
              class="input-text --small"
              type="text"
            />
          </div>
          <div class="post-editor__container__editor__field">
            <label>Description</label>
            <input
              :value="descriptionText"
              @input="updateDescription"
              class="input-text --small"
              type="text"
            />
          </div>
          <div
            class="post-editor__container__editor__field post-editor__container__editor__labels"
          >
            <label>Tags</label>
            <select
              class="post-editor__container__editor__labels__select input-text --small"
            >
              <option
                v-for="label in adminLabels"
                @click="addLabel(label)"
                value="label.name"
              >
                {{ label.name }}
              </option>
            </select>
            <div class="post-editor__container__editor__labels__list">
              <span
                v-for="label in postLabels"
                :style="`backgroundColor: #${label.color}`"
                class="post-editor__container__editor__labels__list__item"
              >
                {{ label.name }}
                <i
                  @click="removeLabel(label)"
                  class="fa fa-times-circle post-editor__container__editor__labels__list__item__icon"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
          <textarea
            ref="textarea"
            :value="blogText"
            @input="updateContent"
            class="post-editor__container__editor__text"
          />
        </div>
        <PostPublicPreview
          :post="customObjectPost"
          class="post-editor__container__preview"
        />
      </div>
    </div>
    <ModalCoversPreview
      v-if="isOpenModalPreview"
      :coverCEO="coverCEO"
      :title="titleText"
      :description="descriptionText"
      @closeModal="openCloseModalPreview"
      class="modal"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

import { mapActions, mapState } from 'vuex'
import { errorHandler } from '~/utils/validate-errors'
import { fnFilterPostLabels } from '~/utils/utils'
import { OMITTED_LABELS, POSTS_LABELS_CONFIG } from '~/data/default-data'

import Toolbar from '~/components/toolbar/Toolbar.vue'
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import ModalCoversPreview from '~/components/post/ModalCoversPreview.vue'
import Loading from '~/components/Loading.vue'
import PostPublicPreview from '~/components/post/PostPublicPreview.vue'

export default {
  components: {
    Toolbar,
    ResourceNotFound,
    ModalCoversPreview,
    Loading,
    PostPublicPreview
  },
  props: {
    typeAction: {
      type: String,
      required: false,
      default: 'add'
    },
    postNumber: {
      type: String,
      required: false,
      default: null
    }
  },
  data() {
    return {
      titlePage: '',
      error: {
        message: '404'
      },
      titleText: 'Title post',
      descriptionText: 'Description post',
      blogText: '# Content post',
      isOpenCovers: false,
      coverBlog: '',
      coverCEO: '',
      postLabels: [],
      isOpenModalPreview: false,
      full: false,
      showLoading: false
    }
  },
  computed: {
    ...mapState({
      post: state => state.posts.postView.post,
      adminLabels: state => state.posts.adminLabels,
      isDataPending: state => state.posts.status.get.isPublicPending
    }),
    compiledTitleMarkdown() {
      return this.$markdownit.renderInline(this.titleText)
    },
    compiledDescriptionMarkdown() {
      return this.$markdownit.renderInline(this.descriptionText)
    },
    compiledContentMarkdown() {
      return this.$markdownit.render(this.blogText)
    },
    customObjectPost() {
      let post = {
        reactions: [],
        titleHTML: this.compiledTitleMarkdown,
        descriptionHTML: this.compiledDescriptionMarkdown,
        contentHTML: this.compiledContentMarkdown,
        cover: this.coverBlog,
        formatDate: moment().format('MMM DD'),
        formatYear: moment().format('YYYY'),
        formatLabels: fnFilterPostLabels(OMITTED_LABELS.public, this.postLabels)
      }

      if (this.typeAction === 'edit') {
        post = {
          ...post,
          formatDate: moment(this.post.created_at).format('MMM DD'),
          formatYear: moment(this.post.created_at).format('YYYY'),
          formatLabels: fnFilterPostLabels(
            OMITTED_LABELS.public,
            this.postLabels
          )
        }
      }
      return post
    }
  },
  mounted() {
    this.getPrivateLabelsList()
    if (this.typeAction === 'edit') {
      this.getPost(this.postNumber)
        .then(() => {
          this.formatPost(this.post)
        })
        .catch(error => {
          this.error = { message: `${error}` }
          this.titlePage = errorHandler(this.error).message
        })
    } else {
      this.setPost()
      this.titlePage = 'Add publication'
    }
  },
  methods: {
    ...mapActions({
      updatePost: 'posts/patchUpdatePost',
      addPost: 'posts/postAddPost',
      setPost: 'posts/getPostPending',
      getPost: 'posts/getPost',
      getPrivateLabelsList: 'posts/getLabelsList'
    }),
    // Markdown Editor Example
    // https://vuejs.org/v2/examples/index.html
    updateContent: _.debounce(function(e) {
      this.blogText = e.target.value
    }, 300),
    updateTitle: _.debounce(function(e) {
      this.titleText = e.target.value
    }, 300),
    updateDescription: _.debounce(function(e) {
      this.descriptionText = e.target.value
    }, 300),
    openCloseCovers() {
      this.isOpenCovers = !this.isOpenCovers
    },
    openCloseModalPreview() {
      this.isOpenModalPreview = !this.isOpenModalPreview
    },
    fullpreview() {
      this.full = !this.full
    },
    addLabel(label) {
      this.postLabels = [...this.postLabels, label]
    },
    removeLabel(label) {
      this.postLabels = [...fnFilterPostLabels([label.name], this.postLabels)]
    },
    getRefTextArea() {
      return this.$refs.textarea
    },
    updateContentFromToolbar(content) {
      this.blogText = content
    },
    formatPost(post) {
      this.coverBlog = _.get(post.post, 'coverBlog', this.coverBlog).trim()

      this.coverCEO = _.get(post.post, 'coverCEO', this.coverCEO).trim()

      this.titleText = _.get(post.post, 'title', this.titleText)

      this.descriptionText = _.get(
        post.post,
        'description',
        this.decriptionText
      )

      const backupLabels = [...post.labels]
      this.postLabels = fnFilterPostLabels(
        [
          POSTS_LABELS_CONFIG.post,
          POSTS_LABELS_CONFIG.hidden,
          POSTS_LABELS_CONFIG.public
        ],
        backupLabels
      )
      this.blogText = _.get(post.post, 'content', this.blogText)

      this.titlePage = post ? post.post.title : errorHandler(this.error).message
    },
    publish(type = 'public') {
      const fn = this
      this.showLoading = true

      this.postLabels = fnFilterPostLabels(
        [
          POSTS_LABELS_CONFIG.post,
          POSTS_LABELS_CONFIG.hidden,
          POSTS_LABELS_CONFIG.public
        ],
        this.postLabels
      )

      this.postLabels = _.map(this.postLabels, l => l.name)
      this.postLabels = [...this.postLabels, type, POSTS_LABELS_CONFIG.post]
      let dataPost = {
        data: {
          title: this.titleText,
          description: this.descriptionText,
          body: this.blogText,
          coverBlog: !this.coverBlog ? ' ' : this.coverBlog,
          coverCEO: !this.coverCEO ? ' ' : this.coverCEO,
          labels: this.postLabels
        }
      }
      if (this.typeAction === 'edit') {
        dataPost = {
          ...dataPost,
          data: {
            ...dataPost.data,
            postNumber: this.postNumber
          }
        }

        this.updatePost(dataPost)
          .then(result => {
            fn.$notify({
              group: 'foo',
              title: 'Sucess',
              type: 'success',
              text: errorHandler({ message: `${result.status}` }).message
            })
            this.$router.push('/posts/dashboard')
          })
          .catch(error => {
            fn.$notify({
              group: 'foo',
              title: 'Error',
              type: 'error',
              text: errorHandler({ message: `${error}` }).message
            })
            this.showLoading = false
          })
      } else {
        this.addPost(dataPost)
          .then(result => {
            fn.$notify({
              group: 'foo',
              title: 'Sucess',
              type: 'success',
              text: errorHandler({ message: `${result.status}` }).message
            })
            this.$router.push('/posts/dashboard')
          })
          .catch(error => {
            fn.$notify({
              group: 'foo',
              title: 'Error',
              type: 'error',
              text: errorHandler({ message: `${error}` }).message
            })
            this.showLoading = false
          })
      }
    }
  },
  head() {
    return {
      title: this.typeAction !== 'edit' ? 'Add publication' : this.titlePage
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  @apply pt-8;
}

.post-editor {
  @apply p-4;

  &__title {
    @apply mt-0;
  }

  .toolbar {
    @apply justify-center;
    @apply mt-6 mb-2;

    &.--hidden {
      @apply hidden;
    }

    &.--show {
      @apply flex;
    }
  }

  &__actions {
    @apply flex justify-end;
    @apply my-6;

    button {
      @apply ml-2;
    }
  }

  &__media-covers {
    @apply my-6;
    @apply flex flex-col items-end;

    &__field {
      @apply w-full;
      @apply mb-2;

      label {
        @apply font-poppins text-secondary;
      }

      input.input-text {
        @apply text-primary;
      }
    }
  }

  &__container {
    @apply flex flex-col;

    &__fullpreview {
      @apply rounded-full bg-primary shadow w-8;
      @apply text-secondary text-baseSize text-center;
      @apply fixed cursor-pointer;
      right: 2rem;
      bottom: 2rem;
    }

    &__editor {
      &.--hidden {
        @apply hidden;
      }

      &.--show {
        @apply block;
      }

      label {
        @apply font-poppins text-secondary;
      }

      input.input-text,
      select.input-text {
        @apply text-primary;
      }

      &__field {
        @apply mb-4;
        @apply flex flex-col;
      }

      &__labels {
        &__select {
          @apply py-2;
        }

        &__list {
          @apply mt-1;
          @apply font-poppins text-secondary text-sm;
          @apply flex flex-wrap;

          &__item {
            @apply text-center;
            @apply mr-1 mt-1 px-1;
            @apply rounded;

            &__icon {
              @apply ml-1;
              @apply cursor-pointer;
            }
          }
        }
      }

      &__text {
        @apply border bg-base border-divContainer w-full;
        @apply p-2;
        @apply font-poppins text-sm;
        height: 90vh;
      }
    }

    &__preview {
      @apply rounded border border-divContainer;
    }
  }
}

@screen tablet {
  .post-editor {
    .toolbar {
      @apply justify-end;
    }

    &__container {
      &__fullpreview {
        @apply w-12 h-12;
        @apply text-2xl;
      }
    }
  }
}

@screen laptop {
  .post-editor {
    .toolbar {
      @apply w-1/2;
    }

    &__actions {
      @apply w-1/2;
    }

    &__media-covers {
      @apply w-1/2;
    }

    &__container {
      @apply flex-row;

      &__editor {
        @apply w-1/2;
        @apply mr-2;
      }

      &__editor.--hidden + &__preview {
        @apply w-4/5 m-auto;
      }

      &__preview {
        @apply w-1/2;
      }
    }
  }
}

@screen desktop {
  .post-editor {
    .toolbar {
      @apply flex-no-wrap;
    }
  }
}
</style>
