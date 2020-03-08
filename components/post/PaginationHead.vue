<template>
  <div class="paginate-head">
    <select class="paginate-head__select input-text --small">
      <option
        v-for="option in optionsElementsPerPage"
        :selected="option.number === elementsPerPage"
        @click="updateQueryItemsPerPage(option.number)"
        :class="option.number === elementsPerPage ? '--selected' : ''"
        class="paginate-head__select__item"
      >
        {{ option.number }}
      </option>
    </select>
  </div>
</template>

<script>
import _ from 'lodash'
import { PAGINATION } from '~/data/default-data'

export default {
  props: {
    elementsPerPage: {
      type: Number,
      required: true,
      default: _.get(
        _.find(PAGINATION.optionsElementsPerPage, 'selected'),
        'number'
      )
    }
  },
  data() {
    return {
      optionsElementsPerPage: PAGINATION.optionsElementsPerPage
    }
  },
  methods: {
    updateQueryItemsPerPage(number) {
      let fullpath = this.getFullPathWithQueries()
      fullpath += `&items=${number}`
      this.$router.push(fullpath)
    },
    getFullPathWithQueries() {
      const path = this.$route.path
      const query = this.$route.query

      let fullpath = `${path}?`
      _.forEach(query, (value, key) => {
        if (key !== 'items' && value) {
          fullpath += `${key}=${value}&`
        }
      })
      return fullpath
    }
  }
}
</script>
<style lang="scss" scoped>
.paginate-head {
  @apply flex justify-end items-center;
  @apply text-primary font-raleway text-baseSize;

  &__select {
    &__item {
      @apply p-1;

      &.--selected {
        @apply bg-primarySelected;
      }
    }
  }
}
</style>
