
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Music/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Music/explore",
    "route": "/Music"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-QTAJBAHM.js",
      "chunk-OJOEEYY3.js"
    ],
    "route": "/Music/explore"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-R6EMHTGE.js",
      "chunk-OJOEEYY3.js"
    ],
    "route": "/Music/artist/taylor-swift"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-R6EMHTGE.js",
      "chunk-OJOEEYY3.js"
    ],
    "route": "/Music/artist/eminem"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-R6EMHTGE.js",
      "chunk-OJOEEYY3.js"
    ],
    "route": "/Music/artist/beyonce"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-R6EMHTGE.js",
      "chunk-OJOEEYY3.js"
    ],
    "route": "/Music/artist/*"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-HJA6H6W6.js"
    ],
    "route": "/Music/library"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7409, hash: '177b2e8993a6419976eb5d4f2a1103e54669c571596cf07dc147d691dd5a4b21', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1051, hash: 'da6fb0089259ad999e8a39cb3801e8bd3bd3c266c9583b7a20dbc7f13bf02c1f', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'artist/taylor-swift/index.html': {size: 32329, hash: '74b4ead05cc5932731fb853025048457e46bbe12fd18f37580f94bbdb9ce49a1', text: () => import('./assets-chunks/artist_taylor-swift_index_html.mjs').then(m => m.default)},
    'artist/eminem/index.html': {size: 32329, hash: '74b4ead05cc5932731fb853025048457e46bbe12fd18f37580f94bbdb9ce49a1', text: () => import('./assets-chunks/artist_eminem_index_html.mjs').then(m => m.default)},
    'artist/beyonce/index.html': {size: 32329, hash: '74b4ead05cc5932731fb853025048457e46bbe12fd18f37580f94bbdb9ce49a1', text: () => import('./assets-chunks/artist_beyonce_index_html.mjs').then(m => m.default)},
    'library/index.html': {size: 23930, hash: '8263335816b526c60c7ab846909c4280c615a9448ab52f9a2173429e1c8d0ffe', text: () => import('./assets-chunks/library_index_html.mjs').then(m => m.default)},
    'explore/index.html': {size: 307382, hash: '88c300bb1e179a37b5965af69cdc9b42c69d26b51b65a10ae64fe1f6bba9e6db', text: () => import('./assets-chunks/explore_index_html.mjs').then(m => m.default)},
    'styles-A44QBXJC.css': {size: 319446, hash: 'Tp9gz15QeGc', text: () => import('./assets-chunks/styles-A44QBXJC_css.mjs').then(m => m.default)}
  },
};
