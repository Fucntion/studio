<template>
	<div class="origin">
		 <button @click="changeShow('origin')">直播源</button>
		 <button @click="changeShow('total')">人数限制</button>
		<div class="hr"></div>
		<div v-if="origin">
			<div><label for="name">直播间名称</label><input type="text" name="room" id="name"></div>
			<div><label for="allowNum">最大观看人数</label><input type="text" name="allow" id="allowNum"></div>
			<button class="sub">保存</button>
			<div class="hr"></div>
			推流地址
			<a href="http://run.mockplus.cn/NxbG2gpXNfjX2aJh/index.html">http://run.mockplus.cn/NxbG2gpXNfjX2aJh/index.html</a><br/> 预览地址
			<a href="http://run.mockplus.cn/NxbG2gpXNfjX2aJh/index.html">http://run.mockplus.cn/NxbG2gpXNfjX2aJh/index.html</a><br/> 扫我预览
			<a href="http://cli.im/">二维码美化</a>
		</div>
		<div v-if="total">
			<div><label for="name">直播间名称</label><input type="text" name="room" id="name"></div>
			<div><label for="allowNum">最大观看人数</label><input type="text" name="allow" id="allowNum"></div>
			<button class="sub">保存</button>
			<div class="hr"></div>
			推流地址
			<a href="http://run.mockplus.cn/NxbG2gpXNfjX2aJh/index.html">http://run.mockplus.cn/NxbG2gpXNfjX2aJh/index.html</a><br/> 预览地址
			<a href="http://run.mockplus.cn/NxbG2gpXNfjX2aJh/index.html">http://run.mockplus.cn/NxbG2gpXNfjX2aJh/index.html</a><br/> 扫我预览
			<a href="http://cli.im/">二维码美化</a>
		</div>

		
	</div>
</template>

<script>
	export default {
		data: function() {

			return {
				showStatus:{origin:true,total:false}

			}
		},
		methods: {
			changeShow:function(name){

				for(var k in this.showStatus){

					if(k ==name){
						this.showStatus[k] =ture;
						continue;
					}
					this.showStatus[k] =false;
				}
			}
		},
		components: {

		}
	}
</script>

<style lang="less">

</style>