import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import Product from "@/views/ProductView.vue";
import Review from "@/views/ReviewView.vue";
import Profile from "@/views/ProfileView.vue";
import Cart from "@/views/CartView.vue";
import ProductsView from "@/views/ProductsView.vue";
import AdminView from "@/views/AdminView.vue";
import EditProductView from "@/views/EditProductView.vue";
import CreateProductView from "@/views/CreateProductView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/product/:id/review',
      name: 'review',
      component: Review
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/category/:id',
      name: 'products',
      component: ProductsView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView
    },
    {
      path: '/admin/product/:id/edit',
      name: 'EditProduct',
      component: EditProductView
    },
    {
      path: '/admin/product/create',
      name: 'CreateProduct',
      component: CreateProductView
    },
  ]
})

export default router
