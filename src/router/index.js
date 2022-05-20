import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('../views/Index.vue'),
            children: [
                {
                    path: '/',
                    redirect: '/query'
                },
                {
                    path: '/query',
                    name: 'main',
                    component: () => import('../views/Main.vue')
                },
                {
                    path: '/batchQuery',
                    name: 'batchQuery',
                    component: () => import('../views/BatchQuery.vue')
                },
                {
                    path: '/submitFinger',
                    name: 'submitFinger',
                    component: () => import('../views/SubmitFinger.vue')
                },
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('../views/LoginView.vue')
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('../views/RegisterView.vue')
                },
                {
                    path: '/fingerLibrary',
                    name: 'fingerLibrary',
                    component: () => import('../views/FingerLibrary.vue'),
                    props: route => ({
                        page: route.query.page,
                        size: route.query.size,
                        app_type: route.query.app_type,
                        key1: route.query.key,
                        value: route.query.value,
                    })
                },
                {
                    path: '/rank',
                    name: 'rank',
                    component: () => import('../views/Rank.vue')
                },
                {
                    path: '/profile',
                    name: 'profile',
                    component: () => import('../views/Profile.vue'),
                    props: route => ({
                        page: route.query.page,
                        size: route.query.size,
                    })
                },
                {
                    path: '/fingerManager',
                    name: 'fingerManager',
                    component: () => import('../views/admin/FingerManager.vue'),
                    props: route => ({
                        page: route.query.page,
                        size: route.query.size,
                        app_type: route.query.app_type,
                        key1: route.query.key,
                        value: route.query.value,
                    })
                },
                {
                    path: '/userManager',
                    name: 'userManager',
                    component: () => import('../views/admin/UserManager.vue')
                },
                {
                    path: '/fingerView/:id',
                    name: 'fingerView',
                    component: () => import('../views/admin/FingerView.vue'),
                    props: true
                },
                {
                    path: '/scanSetting',
                    name: 'scanSetting',
                    component: () => import('../views/admin/ScanSetting.vue')
                },
            ]
        }
    ]
})

export default router