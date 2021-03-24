<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" />
		<scroll class="content" ref="scroll">
			<detail-swiper :topImages="topImages" @swiperImageLoad="imageLoad" />
			<detail-base-info :goods="goods" />
			<detail-shop-info :shop="Shop" />
			<detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
			<detail-param-info :paramInfo="paramInfo" />
			<detail-comment-info :commentInfo="commentInfo" />
			<goods-list :goods="recommends" />
		</scroll>
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

import Scroll from "../../components/common/scroll/Scroll.vue";
import { debounce } from "common/utils.js";

import {
	getDetail,
	getRecommend,
	GoodsInfo,
	Shop,
	GoodsParam,
} from "network/detail.js";
import GoodsList from "../../components/content/goods/GoodsList.vue";

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
	},
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
		imageLoad() {
			this.$refs.scroll.refresh();
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
	height: calc(100% - 44px);
}

.detail-nav {
	position: relative;
	z-index: 9;
	background-color: #fff;
}
</style>