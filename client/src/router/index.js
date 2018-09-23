import Vue from 'vue';
import Router from 'vue-router';
import Contracts from '../components/Contracts'
import Register from '../components/authentication/Register';
import Login from '../components/authentication/Login';
import CreateContract from '../components/CreateContracts';
import ViewContract from '../components/ViewContracts';
import EditContract from '../components/EditContracts';
import CategoryContracts from '../components/CategoryContracts'

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
  ]
});
