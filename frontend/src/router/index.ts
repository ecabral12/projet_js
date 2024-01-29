import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeViewTest from '../views/HomeViewTest.vue'
import UpdateBookingView from '../views/UpdateBookingView.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeViewTest
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'loginView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
      beforeEnter: function () {
        let user = localStorage.getItem("user");
        if (user) {
          router.push("/")
        }
      }
    },
    {
      path: '/register',
      name: 'registerView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue'),
      beforeEnter: function () {
        let user = localStorage.getItem("user");
        if (user) {
          router.push("/")
        }
      }
    },
    {
      path: '/booking',
      name: 'bookingView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BookingView.vue')
    },
    {
      path: '/myaccount',
      name: 'myaccount',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MyAccount.vue')
    },
    {
      path: '/updateBooking/:reservationId', //TODO remove id in the url
      name: 'update',
      component: UpdateBookingView,
      props: (route) => ({ reservationId: route.params.reservationId })
    },
  ]
})

export default router
