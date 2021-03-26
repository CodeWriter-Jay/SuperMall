<template>
	<div class="check-button" :class="{ check: isChecked }">
		<img src="~assets/img/cart/tick.svg" alt="" />
	</div>
</template>

<script>
export default {
	name: "CheckButton",
	props: {
		isChecked: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style scoped>
.check-button {
	box-sizing: border-box;
	border-radius: 50%;
	border: 2px solid #aaa;
	padding: 3px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.check {
	background-color: red;
	border-color: red;
}
</style>
