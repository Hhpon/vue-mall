import Address from '@/views/Address'
import Admin from '@/views/admin/Admin'
import Home from '@/views/admin/Home'
import imglist from '@/views/admin/imglist'
import shoplist from '@/views/admin/shoplist'
import userlist from '@/views/admin/userlist'
import OrderList from '@/views/admin/orderlist'
import Cart from '@/views/Cart'
import GoodsList from '@/views/GoodsList'
import GoodsShop from '@/views/GoodsShop'
import Index from '@/views/Index'
import OrderConfirm from '@/views/OrderConfirm'
import orderSuccess from '@/views/orderSuccess'
import Test from '@/views/test'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/GoodsShop',
      name: 'GoodsShop',
      component: GoodsShop
    },
    {
      path: '/GoodsList',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
    {
      path: '/OrderConfirm',
      name: 'OrderConfirm',
      component: OrderConfirm
    },
    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: orderSuccess
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/Home',
      component: Home,
      name: '数据列表',
      redirect: "/Home/userlist",
      children: [
        { path: '/Home/userlist', component: userlist, name: 'userlist' },
        { path: '/Home/shoplist', component: shoplist, name: 'shoplist' },
        { path: '/Home/orderList', component: OrderList, name: 'orderList' },
        { path: '/Home/imglist', component: imglist, name: 'imglist' },
      ]
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})
