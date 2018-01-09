<template>
  <empty-layout>
    <div class="bg">
        <div class="money-input">
            <div class="money">
                <keyboard-input
                        placeholder="询问服务员后输入"
                        label="消费金额"
                        :show="keyboard"
                        inter="5"
                        decimal="2"
                        @status="setStatus"
                        v-model="val"/>
            </div>
        </div>

        <div class="page-warp">
            <div class="page-button-group">
                <mt-button size="large" type="primary" @click="loginClick">
                    <mt-spinner v-show="isShowBtnLoading" class="loading" color="#fff" type="fading-circle" :size="20"></mt-spinner>
                    <span class="pay-text">立即支付</span>
                </mt-button>
            </div>
        </div>

    </div>

  </empty-layout>
</template>
<style>
#app {
}
body {
  background: #f5f4fa;
}
.bg {
  background: #f5f4f9;
  width: 100%;
  height: 100%;
}
.loading {
  display: inline-block;
  height: 20px;
  line-height: 20px;
}
.loading div {
  margin-top: 2px;
}
.pay-text {
  height: 20px;
  line-height: 20px;
}
.money-input {
  margin: 0px 15px 20px 15px;
  padding-top: 20px;
}
.money {
  background: #fff;
  padding: 0 15px;
  border-radius: 5px;
}
@import "index.css";
</style>
<script type="text/babel">
import Vue from "vue";
import { Toast, Button, Spinner } from "mint-ui";
Vue.component(Spinner.name, Spinner);
Vue.component(Toast.name, Toast);
Vue.component(Button.name, Button);

import KeyboardInput from "../../component/keyboard/input/input.vue";
//    import KeyboardButton from 'component/keyboard/button/button.vue';

export default {
  data() {
    return {
      isShowBtnLoading: false,
      keyboard: true,
      val: ""
    };
  },
  components: {
    KeyboardInput
  },
  computed: {},
  watch: {},
  methods: {
    setStatus: function(val) {
      this.keyboard = val;
    },
    loginClick: function() {
      this.isShowBtnLoading = true;
      Toast("提示信息");
    }
  },
  mounted() {}
};
</script>

