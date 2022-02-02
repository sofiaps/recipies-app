import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import RecipiesPage from '../views/RecipiesPage.vue';
import AuthPage from '../views/AuthPage.vue';
import { auth } from '../firebase/config';

const checkIfAuth = async (to, from, next) => {
  const user = await auth.currentUser;
  if (user) {
    next({ name: 'Recipies' });
  } else {
    next();
  }
};

const requireAuth = async (to, from, next) => {
  const user = await auth.currentUser;
  if (!user) {
    next({ name: 'Auth' });
  } else {
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/recipies',
    beforeEnter: requireAuth,
  },
  {
    path: '/recipies',
    name: 'Recipies',
    component: RecipiesPage,
    beforeEnter: requireAuth,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage,
    beforeEnter: checkIfAuth,
  },
  {
    path: '/recipe/new',
    name: 'NewRecipe',
    component: () => import('../views/CreateRecipePage.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetails',
    component: () => import('../views/ViewRecipePage.vue'),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
