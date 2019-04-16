import Vue from 'vue';
import Router from 'vue-router';
import Contracts from '../components/contract/Contracts'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import CreateContract from '../components/contract/CreateContracts'
import ViewContract from '../components/contract/ViewContracts'
import EditContract from '../components/contract/EditContracts'
import CategoryContracts from '../components/contract/CategoryContracts'
import UserAdmin from '../components/administration/UserAdmin'
import UserAdminEdit from '../components/administration/UserAdminEdit'
import PartnerOverview from '../components/partner/Partner'
import ViewPartner from '../components/partner/ViewPartner'
import EditPartner from '../components/partner/EditPartner'
import CreatePartner from '../components/partner/CreatePartner'
import store from '../store/store'
import AuthenticationService from '../services/AuthenticationService'

Vue.use(Router);

/**
 * Create new Router object
 */

export const router = new Router({
  mode: 'history',
  routes: [
    /**
     * Contract routes
     */
    {
      path: '/',
      name: 'root',
      component: Contracts
    },
    {
      path: '/contracts',
      name: 'contracts',
      component: Contracts
    },
    {
      path: '/contract/add',
      name: 'contracts-create',
      component: CreateContract
    },
    {
      path: '/contract/:contractId',
      name: 'contract',
      component: ViewContract
    },
    {
      path: '/contract/:contractId/edit',
      name: 'contract-edit',
      component: EditContract
    },
    {
      path: '/contracts/:categoryId',
      name: 'contract-category',
      component: CategoryContracts
    },
    /**
     * Authentication routes
     */
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    /**
     * Partner routes
     */
    {
      path: '/partner',
      name: 'partner-overview',
      component: PartnerOverview
    },
    {
      path: '/partner/add',
      name: 'partner-create',
      component: CreatePartner
    },
    {
      path: '/partner/:partnerId',
      name: 'partner-view',
      component: ViewPartner
    },
    {
      path: '/partner/:partnerId/edit',
      name: 'partner-edit',
      component: EditPartner
    },
    /**
     * User administration routes
     */
    {
      path: '/user/admin/:userId',
      name: 'user-administration-edit',
      component: UserAdminEdit
    },
    {
      path: '/user/admin',
      name: 'user-administration',
      component: UserAdmin
    },
  ]
});

/**
 * Before a route change occurs
 * check if user is logged in
 * if yes check token
 */
router.beforeEach(async (to, from, next) => {
  if(store.state.isUserLoggedIn) {
    let token = store.state.token
    const checkToken = (await AuthenticationService.authenticate({
      user: store.state.user,
      token: token
    })).data
    if (checkToken == !true) {
      store.dispatch('setToken', null)
      store.dispatch('setUser', null)
    }
  }
  next()
})
