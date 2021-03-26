<template>
	<div id="detail">
		<detail-nav-bar
			class="detail-nav"
			@titleClick="titleClick"
			ref="detailNavBar"
		/>
		<scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
			<detail-swiper :topImages="topImages" />
			<detail-base-info :goods="goods" />
			<detail-shop-info :shop="Shop" />
			<detail-goods-info
				:detailInfo="detailInfo"
				@detailImageLoad="imageLoad"
			/>
			<detail-param-info ref="params" :paramInfo="paramInfo" />
			<detail-comment-info ref="comment" :commentInfo="commentInfo" />
			<goods-list ref="recommend" :goods="recommends" />
		</scroll>
		<back-top @click.native="backTop" v-show="isShowBackTop" />
		<detail-bottom-bar @addToCart="addToCart" />
		<toast :message="'哈哈哈'" />
	</div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "../../components/common/scroll/Scroll.vue";
import { backToTopMixin } from "common/mixin.js";
import { mapActions } from "vuex";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import Toast from "../../components/common/toast/Toast.vue";

import {
	getDetail,
	getRecommend,
	GoodsInfo,
	Shop,
	GoodsParam,
} from "network/detail.js";

export default {
	name: "Detail",
	components: {
		DetailNavBar,
		DetailSwiper,
		DetailBaseInfo,
		DetailShopInfo,
		Scroll,
		DetailGoodsInfo,
		DetailParamInfo,
		DetailCommentInfo,
		GoodsList,
		DetailBottomBar,
		Toast,
	},
	mixins: [backToTopMixin],
	data() {
		return {
			iid: null,
			topImages: [],
			goods: {},
			Shop: {},
			detailInfo: {},
			paramInfo: {},
			commentInfo: {},
			recommends: [],
		};
	},
	created() {
		this.iid = this.$route.params.iid;

		// 根据iid请求数据
		getDetail(this.iid).then((res) => {
			const data = res.result;
			// 轮播图数据
			this.topImages = res.result.itemInfo.topImages;

			// 获取商品信息
			this.goods = new GoodsInfo(
				data.itemInfo,
				data.columns,
				data.shopInfo.services
			);

			// 创建店铺信息对象
			this.Shop = new Shop(data.shopInfo);

			// 保存商品详情数据
			this.detailInfo = data.detailInfo;

			// 获取参数的信息
			this.paramInfo = new GoodsParam(
				data.itemParams.info,
				data.itemParams.rule
			);

			//  获取评论的信息
			if (data.rate.cRate !== 0) {
				this.commentInfo = data.rate.list[0];
			}
		});

		// 请求推荐数据
		getRecommend().then((res) => {
			this.recommends = res.data.list;
		});
	},
	methods: {
		...mapActions({
			addCart: "addToCart",
		}),
		imageLoad() {
			this.$refs.scroll.refresh();
		},
		titleClick(index) {
			switch (index) {
				case 0:
					this.$refs.scroll.scrollTo(0, 0, 200);
					break;
				case 1:
					this.$refs.scroll.scrollTo(0, -this.$refs.params.$el.offsetTop, 200);
					break;
				case 2:
					this.$refs.scroll.scrollTo(0, -this.$refs.comment.$el.offsetTop, 200);
					break;
				case 3:
					this.$refs.scroll.scrollTo(
						0,
						-this.$refs.recommend.$el.offsetTop,
						200
					);
					break;
			}
		},
		contentScroll(position) {
			// 半段backTop是否显示
			this.isShowBackTop = -position.y > 1000;

			let y = -position.y;
			if (y < this.$refs.params.$el.offsetTop)
				this.$refs.detailNavBar.currentIndex = 0;
			else if (y < this.$refs.comment.$el.offsetTop)
				this.$refs.detailNavBar.currentIndex = 1;
			else if (y < this.$refs.recommend.$el.offsetTop)
				this.$refs.detailNavBar.currentIndex = 2;
			else this.$refs.detailNavBar.currentIndex = 3;
		},
		addToCart() {
			// 获取购物车所需信息
			const product = {};
			product.image = this.topImages[0];
			product.title = this.goods.title;
			product.desc = this.goods.desc;
			product.price = this.goods.newPrice;
			product.iid = this.iid;

			// 将商品添加到购物车里
			// this.$store.commit('addToCart',product);
			// this.$store.dispatch("addToCart", product).then((res) => {
			// 	console.log(res);
			// });
			this.addCart(product).then((res) => {
				console.log(res);
			});
		},
	},
};
</script>

<style scoped>
#detail {
	height: 100vh;
	position: relative;
	z-index: 9;
	background-color: #fff;
}

.content {
	height: calc(100% - 44px - 58px);
	overflow: hidden;
}

.detail-nav {
	z-index: 9;
	background-color: #fff;
}
</style>