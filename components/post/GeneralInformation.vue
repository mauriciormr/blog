<template>
  <div>
    <Loading v-if="isDataPending" class="loading" />
    <div v-else class="general">
      <h2 class="general__title">
        Categories
      </h2>
      <div class="general__tags-list">
        <span
          v-for="label in adminLabels"
          @click="updateQuery(label.name)"
          :style="
            existLabel(tagsToFilter, label.name)
              ? `backgroundColor: #${label.color}`
              : ''
          "
          class="general__tags-list__tag"
        >
          #{{ label.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'

import Loading from '~/components/Loading.vue'

export default {
  components: { Loading },
  data() {
    return {
      tagsToFilter: []
    }
  },
  computed: {
    ...mapState({
      adminLabels: state => state.posts.adminLabels,
      isDataPending: state => state.posts.status.get.isLabelPending
    })
  },
  methods: {
    updateQuery(labelName) {
      const isLabelAdded = this.existLabel(this.tagsToFilter, labelName)
      if (isLabelAdded) {
        _.remove(this.tagsToFilter, t => t === labelName)
        this.tagsToFilter = [...this.tagsToFilter]
      } else {
        this.tagsToFilter = [...this.tagsToFilter, labelName]
      }
      this.$router.push(`?tags=${this.tagsToFilter.join()}`)
    },
    existLabel(tagsNames = [], tagNameToSearch = '') {
      return _.includes(tagsNames, tagNameToSearch)
    }
  }
}
</script>

<style lang="scss" scoped>
.blog__sidebar {
  @apply bg-secondary;
}

.general {
  &__title {
    @apply font-raleway text-baseSize font-semibold;
    @apply border-b border-divContainer mb-4;
  }

  &__tags-list {
    @apply mt-0 mb-4;
    @apply font-poppins text-secondary;
    @apply flex flex-wrap;

    &__tag {
      @apply text-center text-xs;
      @apply mr-1 mt-1 p-1;
      @apply rounded bg-base;
      @apply cursor-pointer;
      @apply flex justify-center items-center;

      &:hover {
        @apply bg-primarySelected;
      }
    }
  }
}
</style>
