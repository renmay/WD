import { sync } from 'vuex-router-sync';
import store from './store/index';
import router from './router';
import app from './store.vue';
import App from 'app';

sync(store, router);

export default App.init({
    ...app,
    router,
    store
});
