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
    },
    publicPublicationsList: {
      titlePage: {
        en: 'Publications',
        es: 'Publicaciones'
      }
    },
    login: {
      loginButtonIcon: {
        en: 'Login',
        es: 'Iniciar sesión'
      }
    },
    callback: {
      callbackTitle: {
        en: 'Authentification',
        es: 'Autentificación'
      },
      callbackMessage: {
        en: 'Authentication in process...',
        es: 'Autentificación en proceso...'
      }
    }
  },
  components: {
    modalDeletePost: {
      modalDeletePostMessage: {
        en: 'Do you want delete this post?',
        es: '¿Quieres borrar ésta publicación?'
      },
      modalDeleteActionsCancel: {
        en: 'Cancel',
        es: 'Cancelar'
      },
      modalDeleteActionsDelete: {
        en: 'Delete',
        es: 'Borrar'
      }
    },
    generalInformation: {
      generalTitle: {
        en: 'Categories',
        es: 'Categorías'
      },
      generalTagsListFilterButton: {
        en: 'Filter',
        es: 'Filtrar'
      }
    },
    addEditPostEditor: {
      postEditorTitleAdd: {
        en: 'Add publication',
        es: 'Agregar publicación'
      },
      postEditorTitleEdit: {
        en: 'Edit publication',
        es: 'Editar publicación'
      },
      postEditorActionsCovers: {
        en: 'Set covers',
        es: 'Establecer covers'
      },
      postEditorActionsDraft: {
        en: 'Save as draft',
        es: 'Guardar como borrador'
      },
      postEditorActionsPublish: {
        en: 'Publish',
        es: 'Publicar'
      },
      postEditorMediaCoversCovers: {
        en: 'Covers preview',
        es: 'Visualizar covers'
      },
      postEditorMediaCoversFieldBlog: {
        en: 'Cover blog',
        es: 'Cover blog'
      },
      postEditorMediaCoversFieldBlogPlaceholder: {
        en: 'URL main cover',
        es: 'URL cover principal'
      },
      postEditorMediaCoversFieldSocial: {
        en: 'Cover social media',
        es: 'Cover redes sociales'
      },
      postEditorMediaCoversFieldSocialPlaceholder: {
        en: 'URL cover CEO',
        es: 'URL cover CEO'
      },
      postEditorContainerEditorFieldTitle: {
        en: 'Title',
        es: 'Título'
      },
      postEditorContainerEditorFieldTitlePlaceholder: {
        en: 'Title post',
        es: 'Título publicación'
      },
      postEditorContainerEditorFieldDescription: {
        en: 'Description',
        es: 'Descripción'
      },
      postEditorContainerEditorFieldDescriptionPlaceholder: {
        en: 'Description post',
        es: 'Descripción publicación'
      },
      postEditorContainerEditorFieldBlogTextPlaceholder: {
        en: '# Content post',
        es: '# Contenido publicación'
      },
      postEditorContainerEditorFieldTags: {
        en: 'Tags',
        es: 'Etiquetas'
      }
    },
    searchBar: {
      searchBarInputPlaceholder: {
        en: 'Search',
        es: 'Buscar'
      }
    },
    authorInformation: {
      authorCardTitle: {
        en: 'Author',
        es: 'Autor'
      },
      authorCardButtonProfile: {
        en: 'View profile',
        es: 'Ver perfil'
      }
    }
  },
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
