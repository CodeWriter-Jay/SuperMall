<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button
				:isChecked="isSelectAll"
				class="check-box"
				@click.native="checkClick"
			/>
			<div>全选</div>
		</div>
		<div class="total-price">合计：{{ totalPrice }}</div>
		<div class="calculate">
			<div>去计算({{ checkLength }})</div>
		</div>
	</div>
</template>

<script>
import CheckButton from "../../../components/common/checkButton/CheckButton.vue";
export default {
	components: { CheckButton },
	name: "CartBottomBar",
	computed: {
		totalPrice() {
			return (
				"￥" +
				this.$store.getters.cartList
					.filter((item) => {
						return item.checked;
					})
					.reduce((preValue, item) => {
						return preValue + item.price.split("~")[0].substr(1) * item.count;
					}, 0)
					.toFixed(2)
			);
		},
		checkLength() {
			return this.$store.getters.cartList.filter((item) => {
				return item.checked;
			}).length;
		},
		isSelectAll() {
			return this.checkLength === 0
				? false
				: !this.$store.getters.cartList.some((item) => {
						return !item.checked;
				  });
		},
	},
	methods: {
		checkClick() {
            let oppositeState = !this.isSelectAll;
			this.$store.getters.cartList.forEach((element) => {
				element.checked = oppositeState;
			});
		},
	},
};
</script>

<style scoped>
.bottom-bar {
	height: 40px;
	background-color: #f2f2f2;
	display: flex;
	align-items: center;
}

.check-content {
	height: 100%;
	display: flex;
	align-items: center;
	margin-left: 10px;
}

.check-box {
	width: 22px;
	height: 22px;
	margin-right: 5px;
}

.total-price {
	flex: 1;
	margin-left: 20px;
	margin-right: 20px;
}

.calculate {
	padding: 0 20px;
	height: 100%;
	color: #fff;
	background-color: red;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>