import Vue from 'vue';
import Router from 'vue-router';
import Contracts from '../components/Contracts'
import Register from '../components/authentication/Register'
import Login from '../components/authentication/Login'
import CreateContract from '../components/CreateContracts'
import ViewContract from '../components/ViewContracts'
import EditContract from '../components/EditContracts'
import CategoryContracts from '../components/CategoryContracts'
import UserAdmin from '../components/UserAdmin'
import UserAdminEdit from '../components/UserAdminEdit'
import PartnerOverview from '../components/partner/ShowPartner'
import ViewPartner from '../components/partner/ViewPartner'
import EditPartner from '../components/partner/EditPartner'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
    {
      path: '/partner',
      name: 'partner-overview',
      component: PartnerOverview
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
    }
  ]
});
