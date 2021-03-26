<template>
	<div class="toast" v-show="isShow">
		<div>{{ message }}</div>
	</div>
</template>

<script>
export default {
	name: "Toast",
	data() {
		return {
			message: "",
			isShow: false,
			timer: null,
		};
	},
	methods: {
		show(message = "默认提示", duration = 2000) {
			this.isShow = true;
			this.message = message;
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(() => {
                console.log(1);
				this.isShow = false;
				this.message = "";
			}, duration);
		},
	},
};
</script>

<style scoped>
.toast {
	position: fixed;
	top: 50%;
	left: 50%;
	padding: 8px 10px;
	transform: translate(-50%, -50%);
	z-index: 999;
	color: white;
	background-color: rgba(0, 0, 0, 0.75);
    transition: display 2s;
}
</style>