const userRouter = [
    {
        path: '/pages/user/index',
        aliasPath: "/pages/user/index",
        name: 'user',
        meta: {
            title: '我的',
        }
    },
    {
        path: '/pages/user/MyOrder/index',
        aliasPath: "/pages/user/MyOrder/index",
        name: 'MyOrder',
        meta: {
            title: '我的订单'
        }
    },
    {
        path: '/pages/user/MyTeam/index',
        aliasPath: "/pages/user/MyTeam/index",
        name: 'MyTeam',
        meta: {
            title: '我的团队'
        }
    },
    {
        path: '/pages/user/Login/index',
        aliasPath: "/pages/user/Login/index",
        name: 'Login',
        meta: {
            title: '登录'
        }
    }
]

export default userRouter
