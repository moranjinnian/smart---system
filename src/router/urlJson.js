import Layout from '../views/layout/index'

export function getrouter() {
    let url = [{
        path: '/home',
        component: Layout,
        redirect: 'home/homePage',
        children: [{
            path: 'homePage',
            component: () => import ('../views/homePage'),
            name: 'homePage',
            meta: {title: 'homePage', icon: 'form', noCache: true}
        }]
    },
        {
            path: '/system',
            component: Layout,
            redirect: 'system/user',
            children: [{
                path: 'user',
                component: () => import ('../views/system/user'),
                name: 'user',
                meta: {title: 'homePage', icon: 'form', noCache: true}
            }]
        },
        {
            path: '/login',
            component: () => import ('../views/login/index'), hidden: true
        },
        {
            path: '/permmission',
            component: () => import ('../views/permmission'), hidden: true
        },
        {
            path: '/bridgeHome',
            component: () => import ('../views/bridge/home/bridgeHome'), hidden: true
        },
        {
            path: '/404',
            component: () => import ('../views/notfind'), hidden: true
        }]
    return url
}
