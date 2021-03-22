<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<scroll
			class="content"
			ref="scroll"
			:probe-type="3"
			@scroll="contentScroll"
			:pull-up-load="true"
			@pullingUp="loadMore"
		>
			<home-swiper :banners="banners" />
			<recommend-view :recommends="recommends" />
			<feature-view />
			<tab-control
				:titles="['流行', '新款', '精选']"
				@tabClick="tabClick"
			/>
			<goods-list :goods="showGoods" />
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop" />
	</div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "../../components/content/tabControl/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";
import BackTop from "../../components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js";

export default {
	name: "Home",
	components: {
		NavBar,
		HomeSwiper,
		RecommendView,
		FeatureView,
		TabControl,
		GoodsList,
		Scroll,
		BackTop,
	},
	data() {
		return {
			banners: [],
			recommends: [],
			goods: {
				pop: { page: 0, list: [] },
				new: { page: 0, list: [] },
				sell: { page: 0, list: [] },
			},
			currentType: "pop",
			isShowBackTop: false,
		};
	},
	computed: {
		showGoods() {
			return this.goods[this.currentType].list;
		},
	},
	created() {
		this.getHomeMultidata();

		// 请求商品数据
		for (let key in this.goods) {
			this.getHomeGoods(key, true);
		}
	},
	mounted() {
		// 监听图片加载完成  用于刷新BScroll高度

		const refresh = debounce(this.$refs.scroll.refresh, 500);

		this.$bus.$on("itemImageLoad", () => {
			refresh();
		});
	},
	methods: {
		/**
		 * 事件监听相关方法
		 */
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = "pop";
					break;
				case 1:
					this.currentType = "new";
					break;
				case 2:
					this.currentType = "sell";
					break;
			}
		},
		backClick() {
			this.$refs.scroll.scrollToTop(0, 0, 500);
		},
		contentScroll(position) {
			this.isShowBackTop = -position.y > 1000;
		},
		loadMore() {
			this.getHomeGoods(this.currentType);
		},

		/**
		 * 网络请求相关方法
		 */
		getHomeMultidata() {
			getHomeMultidata().then((res) => {
				this.banners = res.data.banner.list;
				this.recommends = res.data.recommend.list;
			});
		},
		getHomeGoods(type, init = false) {
			let page = ++this.goods[type].page;
			getHomeGoods(type, page).then((res) => {
				this.goods[type].list.push(...res.data.list);
				if (!init) {
					this.$refs.scroll.finishPullUp();
				}
			});
		},
	},
};
</script>

<style scoped>
#home {
	height: calc(100vh - 49px);
}

.home-nav {
	background-color: var(--color-tint);
	color: #fff;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 999;
}

.content {
	box-sizing: border-box;
	height: calc(100% - 49px);
	overflow: hidden;
	margin-top: 44px;
}
</style>
