import { sync } from 'vuex-router-sync';
import store from './store';
import router from './router';
import app from './order.vue';
import App from 'app';

sync(store, router);

export default App.init({
    ...app,
    router,
    store
});
