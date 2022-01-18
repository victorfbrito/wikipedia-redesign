import { createApp } from 'vue/dist/vue.esm-bundler.js'
import { createRouter, createWebHistory } from 'vue-router'
// import UserPost from './views/UserPost.vue'
// eslint-disable-next-line
import App from './App.vue'
import "@/assets/global.css"
// // eslint-disable-next-line
import routes from './routes'


// const routes = [
//   { path: '/home', component: Home },
//   { path: '/about', component: About },
//   { path: '/users/:username/posts/:postId', component: UserPost }
// ]

// export const router = createRouter({
//   history: createWebHistory(),
//   routes
// })


// // Vue.config.productionTip = false

// // Vue.directive('click-outside', {
// //   bind: function (el, binding, vnode) {
// //     el.clickOutsideEvent = function (event) {
// //       // here I check that click was outside the el and his children
// //       if (!(el == event.target || el.contains(event.target))) {
// //         // and if it did, call method provided in attribute value
// //         vnode.context[binding.expression](event);
// //       }
// //     };
// //     document.body.addEventListener('click', el.clickOutsideEvent)
// //   },
// //   unbind: function (el) {
// //     document.body.removeEventListener('click', el.clickOutsideEvent)
// //   },
// // });

// const app = createApp({})
// app.component('home', { render(h) { return h(App) } });

// // app.use(router)

// app.mount('#app')

// new Vue({
//   render: h => h(App)
// }).$mount('#app')

// new Vue({
//   data: {
//     currentRoute: window.location.pathname
//   },
//   // computed: {
//   //   ViewComponent() {
//   //     const matchingView = routes[this.currentRoute]
//   //     return matchingView
//   //       ? require('./pages/' + matchingView + '.vue').default
//   //       : require('./pages/404.vue').default
//   //   }
//   // },
//   render(h) {
//     return h(App)
//     // return h(this.ViewComponent)
//   },
// }).use(router).$mount('#app')



// window.addEventListener('popstate', () => {
//   app.currentRoute = window.location.pathname
// })

const app = createApp({})

//const Home = { template: '<div>aa1111111</div>' }
app.component('home', {
  template: '<div>home</div>',
})

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.mount('#app')
