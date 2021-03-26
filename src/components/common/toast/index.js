import Toast from './Toast'

const obj = {}

obj.install = function(Vue) {
    // 创建组件构造器
    const toastConstrustor = Vue.extend(Toast);

    // new一个组件对象
    const toast = new toastConstrustor();

    // 将组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));

    document.body.appendChild(toast.$el);

    Vue.prototype.$toast = toast;
}

export default obj