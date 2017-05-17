<template>
<div class="information">
	<el-row class='infor_firstline'>
		<el-col class='wholemoney' :span='12'>
			<h2 class='income_title'>全部收益:<span>￥{{wholeIncome}}</span></h2>
			<h2 class='income_title'>收益余额:<span>￥{{incomeLeft}}</span></h2>
		</el-col>
		<el-col :span='12' style='text-align:center;'>
			<el-button style='background: #f7ab00;border-color: #f7ab00;' type='primary'>我要提现</el-button>
		</el-col>
	</el-row>
	<el-row>
		<el-table style='width:100%;' :data='tableData'>
			<el-table-column min-width='150px' align='center' prop='live' label='直播间'>
				<template scope='scope'>
					<div class="livecontent">
						<el-row style='width:100%;'>
							<el-col :span='12' class='img_container'>
								<img class='liveimg' :src="scope.row.cover_img_url"/>
								<!--<div class='liveimg' :style='{"background-image":"url("+scope.row.cover_img_url+")"}'>-->
								<!--</div>-->
							</el-col>
							<el-col :span='12'>
								<div class="liver">
									<p>{{scope.row.title}}</p>
									<p>{{scope.row.created_at}}</p>
								</div>
							</el-col>
						</el-row>
					</div>
				</template>
			</el-table-column>
			<el-table-column align='center' prop='pay_income' label='付费'>
				<template scope='scope'>
					￥{{scope.row.pay_income}}
				</template>
			</el-table-column>
			<el-table-column align='center' prop='dashang_income' label='打赏'>
				<template scope='scope'>
					￥{{scope.row.dashang_income}}
				</template>
			</el-table-column>
			<el-table-column align='center' prop='hongbao_income' label='红包'>
				<template scope='scope'>
					￥{{scope.row.hongbao_income}}
				</template>
			</el-table-column>
			<el-table-column align='center' prop='total_income' label='总收益'>
				<template scope='scope'>
					￥{{scope.row.total_income}}
				</template>
			</el-table-column>
			<el-table-column align='center' label='操作'>
				<template scope='scope'>
					<el-button class='check_detail' @click='goItems(scope.row.room_id)' type='text'>点击查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-row>
</div>
</template>

<script>
export default {
	data: function() {

		return {
			// 全部收益
			wholeIncome:'',
			// 收益余额
			incomeLeft:'',
			fitvalue:true,
			tableData:[]
		}
	},
	methods: {
		getWholeIncome:function(){
			this.$http.get('/income/my-income').then((response)=>{
				console.log('success');
				console.log(response.body);
				this.wholeIncome=response.body.data.total_income
				this.incomeLeft=response.body.data.income_balance
				for(var a=0;a<response.body.data.list.length;a++){
					if(response.body.data.list[a].dashang_income==null){
						response.body.data.list[a].dashang_income=0
					}
					if(response.body.data.list[a].hongbao_income==null){
						response.body.data.list[a].hongbao_income=0
					}
					response.body.data.list[a].created_at=new Date(response.body.data.list[a].created_at*1000).toLocaleString()
				}
				this.tableData=response.body.data.list
			},(response)=>{
				console.log('error');
				console.log(response.body);
			})
		},
		goItems:function(id){
			this.$router.push('/items/'+id)
		},

	},
	components: {

	},
	mounted() {
		// 获取直播收益
		this.getWholeIncome()
	}
}
</script>

<style lang="less">
.infor_firstline{
	display: flex;
    align-items: center;
    background: white;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.income_title{
	font-size: 18px;
	span{
		color:#20a0ff;
	}
}
.livecontent{
	margin-top: 1rem;
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	}
.liveimg{
	width: 100px;
	background-size: 100% 100%;
}
.img_container{
	background: #dadada;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.check_detail:hover{
	text-decoration: underline;
}
.wholemoney {
    display: flex;
    justify-content: space-around;
}
</style>
