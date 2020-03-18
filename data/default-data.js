const POSTS_DATA = {
  coverList:
    'https://user-images.githubusercontent.com/13499566/76646314-610fb680-6520-11ea-8151-71cb23be1112.jpg',
  coverCEO:
    'https://user-images.githubusercontent.com/13499566/76646314-610fb680-6520-11ea-8151-71cb23be1112.jpg',
  coverBlog: ''
}

/* Labels to identify a post
 *
 * Labels to:
 * - post: Label name to identify a post issue
 * - hidden: Label name to hide a publication
 * - public: Label name to show a publication
 */
const POSTS_LABELS_CONFIG = {
  post: 'post',
  hidden: 'hidden',
  public: 'public'
}

const OMITTED_LABELS = {
  public: [
    POSTS_LABELS_CONFIG.hidden,
    POSTS_LABELS_CONFIG.public,
    POSTS_LABELS_CONFIG.post
  ],
  admin: []
}

const PAGINATION = {
  optionsElementsPerPage: [
    /* {
     *   number: 10,
     *   selected: true
     * },
     * {
     *   number: 20,
     *   selected: false
     * }, */
    {
      number: 30,
      selected: true
    } /* ,
        {
      *  number: 40,
      *  selected: false
        },
        {
      *  number: 50,
      *  selected: false
        } */
  ],
  maxItemsPaginationBar: 3
}

const AVAILABLE_LANGS = ['en', 'es']

const LABELS = {
  pages: {
    privatePublicationsList: {
      titlePage: {
        en: 'Administration dashboard',
        es: 'Panel de administración'
      }
    }
  },
  components: {},
  layouts: {}
}

export {
  POSTS_DATA,
  OMITTED_LABELS,
  POSTS_LABELS_CONFIG,
  PAGINATION,
  AVAILABLE_LANGS,
  LABELS
}
