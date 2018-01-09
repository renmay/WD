<template>
    <transition name="slide">
    <div class="keyboard-wrapper" v-show="show" @touchstart.stop.prevent="fn">
        <!-- 键盘区域 -->
        <table class="table">
            <tr>
                <td class="keyboard-item" @touchstart="typing('1')">1</td>
                <td class="keyboard-item" @touchstart="typing('2')">2</td>
                <td class="keyboard-item" @touchstart="typing('3')">3</td>
                <td class="keyboard-item" @touchstart="typing('delete')" rowspan="2"><i class="iconfont icon-keyboarddelete del"></i></td>
            </tr>
            <tr>
                <td class="keyboard-item" @touchstart="typing('4')">4</td>
                <td class="keyboard-item" @touchstart="typing('5')">5</td>
                <td class="keyboard-item" @touchstart="typing('6')">6</td>
            </tr>
            <tr>
                <td class="keyboard-item" @touchstart="typing('7')">7</td>
                <td class="keyboard-item" @touchstart="typing('8')">8</td>
                <td class="keyboard-item" @touchstart="typing('9')">9</td>
                <td class="keyboard-item confirm" @touchstart="complete" rowspan="2">{{confirm}}</td>
            </tr>
            <tr>
                <td class="keyboard-item" @touchstart="typing('.')">.</td>
                <td class="keyboard-item" @touchstart="typing('0')">0</td>
                <td class="keyboard-item" @touchstart="typing('hide')"><i class="iconfont icon-jianpan keyboard"></i></td>
            </tr>
        </table>
    </div>
    </transition>
</template>
<style lang="less">
    @import "fonts/iconfont.css";
    @import "button.less";
</style>
<script type="text/babel">
    export default {
        props: {
            show: {
                default: false
            },
            confirm: {
                default: '确认'
            }
        },
        methods: {
            /*防止点击完成按钮左边的空白区域收起键盘*/
            fn () {},
            /*输入*/
            typing (val) {
                this.$emit('typing', val);
            },
            /*点击完成*/
            complete () {
                this.$emit('complete');
            }
        }
    }
</script>
