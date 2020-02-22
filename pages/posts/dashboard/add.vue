<template>
  <div class="container-page">
    <h2>Add post</h2>
    <div class="actions">
      <button @click="openCloseCovers()">
        Covers
      </button>
      <button @click="publish('hidden')">
        Draft
      </button>
      <button @click="publish('public')">
        Publish
      </button>
    </div>
    <div v-if="isOpenCovers" class="media-covers">
      <div>
        <label>Blog</label>
        <input
          v-model="coverBlog"
          type="text"
          placeholder="URL cover principal"
        />
      </div>
      <div>
        <label>Redes sociales</label>
        <input v-model="coverCEO" type="text" placeholder="URL cover CEO" />
      </div>
    </div>
    <Toolbar
      :dom="getRefTextArea"
      @updateContentFromToolbar="updateContentFromToolbar"
    />
    <div class="editor-preview">
      <div class="editor">
        <input
          :value="titleText"
          @input="updateTitle"
          class="editor__title"
          type="text"
        />
        <input
          :value="descriptionText"
          @input="updateDescription"
          class="editor__description"
          type="text"
        />
        <textarea
          ref="textarea"
          :value="blogText"
          @input="updateContent"
          class="editor__content"
        />
      </div>
      <div class="preview">
        <div class="preview__title">
          <h1 v-html="compiledTitleMarkdown" />
        </div>
        <div class="preview__description">
          <p v-html="compiledDescriptionMarkdown" />
        </div>
        <div v-html="compiledContentMarkdown" class="preview__content" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import Toolbar from '~/components/toolbar/Toolbar.vue'

export default {
  components: {
    Toolbar
  },
  data() {
    return {
      titleText: 'Title post',
      descriptionText: 'Description post',
      blogText: '# Content post',
      isOpenCovers: false,
      coverBlog: ' ',
      coverCEO: ' '
    }
  },
  computed: {
    compiledTitleMarkdown() {
      return this.$markdownit.renderInline(this.titleText)
    },
    compiledDescriptionMarkdown() {
      return this.$markdownit.renderInline(this.descriptionText)
    },
    compiledContentMarkdown() {
      return this.$markdownit.render(this.blogText)
    }
  },
  methods: {
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
    ...mapActions({
      addPost: 'posts/postAddPost'
    }),
    getRefTextArea() {
      return this.$refs.textarea
    },
    updateContentFromToolbar(content) {
      this.blogText = content
    },
    publish(type = 'public') {
      const dataPost = {
        type,
        data: {
          title: this.titleText,
          description: this.descriptionText,
          body: this.blogText,
          coverBlog: this.coverBlog,
          coverCEO: this.coverCEO
        }
      }
      this.addPost(dataPost).then(() => this.$router.push('/posts/dashboard'))
    }
  }
}
</script>

<style>
.actions {
  margin: 20px 10px;
}

.editor-preview {
  height: 100vh;
  display: flex;
  width: 100%;
}

.editor,
.preview {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 2;
  overflow: auto;
  width: 100%;
}

.editor__title,
.preview__title,
.editor__description,
.preview__description {
  margin-bottom: 20px;
}

.editor__content {
  flex: 1;
  border: none;
  border-right: 1px solid #ccc;
  background-color: #f6f6f6;
  font-family: 'Monaco', courier, monospace;
  padding: 20px;
}
</style>
