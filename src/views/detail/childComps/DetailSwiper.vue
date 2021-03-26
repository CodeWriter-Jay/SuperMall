<template>
	<swiper class="detail-swiper">
		<swiper-item class="item" v-for="(item, index) in topImages" :key="index">
			<img :src="item" alt="" />
		</swiper-item>
	</swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
	components: { Swiper, SwiperItem },
	name: "DetailSwiper",
	props: {
		topImages: {
			type: Array,
			default() {
				return [];
			},
		},
	},
};
</script>

<style scoped>
.item {
	height: 300px;
	text-align: center;
}

.detail-swiper img {
	height: 100%;
	width: 100%;
}
</style>