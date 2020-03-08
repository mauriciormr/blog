<template>
  <div class="paginate">
    <div
      v-if="firtsItem.number !== currentPage"
      @click="prev"
      class="paginate__item"
    >
      <i class="fa fa-angle-left paginate__item__icon" aria-hidden="true" />
    </div>
    <div
      v-for="page in firstSection"
      @click="go(page.number)"
      :class="page.selected ? '--selected' : ''"
      class="paginate__item"
    >
      <span class="paginate__item__icon">
        {{ page.number }}
      </span>
    </div>
    <div v-if="secondSection.length > 0" class="paginate__item">
      <span class="paginate__item__icon">...</span>
    </div>
    <div
      v-for="page in secondSection"
      @click="go(page.number)"
      :class="page.selected ? '--selected' : ''"
      class="paginate__item"
    >
      <span class="paginate__item__icon">
        {{ page.number }}
      </span>
    </div>
    <div
      v-if="lastItem.number !== currentPage"
      @click="next"
      class="paginate__item"
    >
      <i class="fa fa-angle-right paginate__item__icon" aria-hidden="true" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { PAGINATION } from '~/data/default-data'

export default {
  props: {
    pages: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      maxItems: PAGINATION.maxItemsPaginationBar,
      elementsPerPage: PAGINATION.elementsPerPage
    }
  },
  computed: {
    firstSection() {
      const end = Math.max(0, this.currentPage - 1 + this.maxItems)
      const start = Math.max(0, end - this.maxItems)

      return _.slice(this.pages, start, end)
    },
    secondSection() {
      const start = Math.max(this.maxItems, this.pages.length - this.maxItems)
      const end = Math.max(this.maxItems, this.pages.length)
      const items = _.slice(this.pages, start, end)

      const numberLastFirst = _.get(_.last(this.firstSection), 'number', 0)
      const numbersSecond = _.map(items, i => i.number)
      const firstInSecond = _.includes(numbersSecond, numberLastFirst)

      return firstInSecond ? [] : items
    },
    currentPage() {
      return +_.get(_.find(this.pages, 'selected'), 'number', 0)
    },
    firtsItem() {
      return _.head(this.pages)
    },
    lastItem() {
      return _.last(this.pages)
    }
  },
  methods: {
    go(page) {
      let fullpath = this.getFullPathWithQueries()
      fullpath += `&page=${page}`
      this.$router.push(fullpath)
    },
    next() {
      let fullpath = this.getFullPathWithQueries()
      fullpath += `&page=${this.currentPage + 1}`
      this.$router.push(fullpath)
    },
    prev() {
      let fullpath = this.getFullPathWithQueries()
      fullpath += `&page=${this.currentPage - 1}`
      this.$router.push(fullpath)
    },
    getFullPathWithQueries() {
      const path = this.$route.path
      const query = this.$route.query

      let fullpath = `${path}?`
      _.forEach(query, (value, key) => {
        if (key !== 'page' && value) {
          fullpath += `${key}=${value}&`
        }
      })
      return fullpath
    }
  }
}
</script>
<style lang="scss" scoped>
.paginate {
  @apply flex justify-end;
  @apply text-secondary text-baseSize;

  &__item {
    @apply cursor-pointer rounded;
    @apply border border-divContainer bg-secondary;
    @apply flex justify-center items-center;

    &:hover {
      @apply bg-primarySelected;
    }

    &.--selected {
      @apply bg-primary text-primary;
    }

    &__icon {
      @apply p-2;
    }
  }
}
</style>
