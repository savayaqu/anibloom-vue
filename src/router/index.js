import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";
import UploadView from "@/views/UploadView.vue";
import LoginView from "@/views/LoginView.vue";
import AccessesView from "@/views/AccessesView.vue";
import EditFileView from "@/views/EditFileView.vue";
import EditFileRightsView from "@/views/EditFileRightsView.vue";
import Product from "@/views/Product.vue";
import Review from "@/views/Review.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/accesses',
      name: 'accesses',
      component: AccessesView
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: EditFileView
    },
    {
      path: '/rights/:id',
      name: 'rights',
      component: EditFileRightsView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/product/:id/review',
      name: 'review',
      component: Review
    },

  ]
})

export default router
