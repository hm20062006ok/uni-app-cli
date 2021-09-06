const shopRouter = [
    {
        path: '/pages/shop/index',
        aliasPath: "/pages/shop/index",
        name: 'shop',
        meta: {
            title: '购物车',
        }
    },
    {
        path: '/pages/shop/GoodsClass/index',
        aliasPath: "/pages/shop/GoodsClass/index",
        name: 'goodClass',
        meta: {
            title: '分类',
        }
    },
    {
        path: '/pages/shop/GoodDetails/index',
        aliasPath: '/pages/shop/GoodDetails/index',
        name: 'GoodDetails',
        meta: {
            title: '商品详情'
        }
    }
]

export default shopRouter
