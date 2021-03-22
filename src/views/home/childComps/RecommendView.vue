<template>
	<div class="recommend">
        <div v-for="item,index in recommends" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
	name: "RecommendView",
	props: {
		recommends: {
			type: Array,
			default() {
				return [];
			},
		},
	},
};
</script>

<style scoped>
.recommend{
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;

    border-bottom: 10px solid #eee;
}

.recommend-item{
    flex:1;
    margin: 0 10px;
}

.recommend-item img{
    max-width: 100%;
    max-height: 100%;
}
</style>