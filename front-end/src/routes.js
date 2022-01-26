function lazyLoad(view){
  return() => import(`@/views/${view}.vue`)
}

export default [
  { name: "Home", path: '/', component: lazyLoad('Home') },
  { name: "About", path: '/about', component: lazyLoad('About') },
  { name: "Help", path: '/help', component: lazyLoad('Help') },
  { name: "Article", path: '/article/:subject', component: lazyLoad('Article') },
  { name: "NotFound", path: '/not_found', component: lazyLoad('NotFound') }
]