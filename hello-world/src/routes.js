import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Article from './views/Article.vue'
import Help from './views/Help.vue'

export default [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/help', component: Help },
  { path: '/article/:subject', component: Article },
  { path: '/not_found', component: NotFound }
]