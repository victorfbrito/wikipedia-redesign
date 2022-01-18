import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'
import Article from './views/Article.vue'
import Help from './views/Help.vue'

export default [
  { name: "Home", path: '/', component: Home },
  { name: "About", path: '/about', component: About },
  { name: "Help", path: '/help', component: Help },
  { name: "Article", path: '/article/:subject', component: Article },
  { name: "NotFound", path: '/not_found', component: NotFound }
]