<template>
	<view>
		<block v-if="car_list.length>0">
			<view class="car_home_box" v-for="(car,idx) in car_list" :key="idx">
				<view class="car_home_name" v-if="car.goods.length>0">
					<view class="select_box" @click="clickHomeSelect(idx)">
						<view class="select_icon" :class="car.checked?'active':''">
							<image v-if="car.checked" src="/static/yes.svg" mode="widthFix"></image>
						</view>
					</view>
					<view>{{car.name}}</view>
				</view>
				<view class="car_home_foods">
					<view class="car_food_item" v-for="(item,index) in car.goods" :key="index">
						<view class="select_box" @click="clickSingleGood(idx,index)">
							<view class="select_icon" :class="item.checked?'active':''">
								<image v-if="item.checked" src="/static/yes.svg" mode="widthFix"></image>
							</view>
						</view>
						<view class="car_food_info">
							<view class="car_food_img">
								<image class="food_img" src="/static/goods.jpg" mode="aspectFill"></image>
							</view>
							<view class="car_food_right">
								<view class="car_food_top">
									<view class="car_food_left">
										<view class="car_food_name">{{item.title}}</view>
										<view class="car_food_remark">Selected: {{item.remark}}</view>
									</view>
									<image class="car_del_icon" @click="delGood(idx,index)" src="/static/delete-icon.svg" mode="widthFix"></image>
								</view>
								<view class="car_food_bottom">
									<view class="car_food_price">S${{item.price}}</view>
									<view class="info_num">
										<view class="minus" :class="item.number>0?'active':''" @click.stop="minus(item.number,idx,index)"><view class="txt">-</view></view>
										<input type="number" :value="item.number" disabled>  <!-- @input="blurInput($event,item.number,idx,index)" -->
										<view class="plus active" @click.stop="plus(item.number,idx,index)"><view class="txt">+</view></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<view class="no_car_data" v-else @click="tobuyPage">Shopping cart is empty <text>Please go to buy</text></view>
		
		<!-- 底部fixed Next部分 -->
		<view class="height100"></view>
		<view class="fixed_footer_next" v-if="car_list.length>0">
			<view class="select_box" @click="clickAllSelect">
				<view class="select_icon" :class="is_all_checked?'active':''">
					<image v-if="is_all_checked" src="/static/yes.svg" mode="widthFix"></image>
				</view>
				<text>Selected（{{total_number}}）</text>
				<!-- #ifndef H5 -->
				<image src="/static/delete-icon.svg" class="del_all_icon" @click.stop="clearCar" mode="widthFix"></image>
				<!-- #endif -->
			</view>
			<view class="next_box">
				<view class="next_price">S${{total_price}}</view>
				<view class="next_btn">
					<button type="default" @click="toNext">Next</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			car_list: [],
			total_number: 0,//购物车商品总数量
			total_price: '0.00',//购物车商品总价格
			is_all_checked: 1,//是否全选  0：不是  1：是
		}
	},
	props:{
		list:{
			props: Array,
			default: []
		}
	},
	created() {
		this.car_list = this.list;
		this.sumTotalPrice();
	},
	methods:{
		tobuyPage(){
			// 购物车没有商品的时候 跳转到去购买商品的页面
			this.$emit('toBuy')
		},
		toNext(){
			// 跳转到下一步去支付的页面
			this.$emit('next')
		},
		sumTotalPrice(){
			// 计算添加到购物车的数量和价格
			let total_number = 0;
			let total_price = 0;
			for(let i in this.car_list){
				for(let j in this.car_list[i].goods){
					if(this.car_list[i].goods[j].checked == 1){
						this.is_all_checked = 1;
						total_number += parseInt(this.car_list[i].goods[j].number);
						total_price += parseFloat(this.car_list[i].goods[j].price*this.car_list[i].goods[j].number).toFixed(2) * 100;
					}
				}
			}
			
			this.clickHasSelect();
			this.total_number = total_number;
			this.total_price = parseFloat(total_price/100).toFixed(2);
		},
		minus(number,idx,index){
			// 点击减少商品数量触发
			// console.log(this.car_list[idx].goods[index].number)
			this.car_list[idx].goods[index].number--;
			if(this.car_list[idx].goods[index].number<=0){
				this.car_list[idx].goods[index].number = 0;
			}
			
			// 选中某个商品才能计算该商品总价
			if(this.car_list[idx].goods[index].checked == 1){
				this.sumTotalPrice();
			}
		},
		plus(number,idx,index){
			// 点击增加商品数量触发
			// console.log(this.car_list[idx].goods[index].number)
			this.car_list[idx].goods[index].number++;
			// if(this.car_list[idx].goods[index].number>=99){
			// 	this.car_list[idx].goods[index].number = 99;
			// }
			
			// 选中某个商品才能计算该商品总价
			if(this.car_list[idx].goods[index].checked == 1){
				this.sumTotalPrice();
			}
		},
		clickHasSelect(){
			// 是否有选中商品
			let result1 = '';
			result1 = this.car_list.find(item=>{
				return item.checked
			})
			if(result1 == undefined || result1 == 'undefined'){
				this.is_all_checked = 0;
			}
		},
		clickHomeSelect(idx){
			// 点击选中/取消某个商家的所有商品
			this.car_list[idx].checked = !this.car_list[idx].checked;
			
			for(let i in this.car_list[idx].goods){
				if(this.car_list[idx].checked == 0){
					// 非选中
					this.car_list[idx].goods[i].checked = 0;
				}else{
					// 选中
					this.car_list[idx].goods[i].checked = 1;
				}
			}
			this.sumTotalPrice();
		},
		clickSingleGood(idx,index){
			// 点击选中/取消某个商品
			this.car_list[idx].goods[index].checked = !this.car_list[idx].goods[index].checked;
			if(this.car_list[idx].goods[index].checked == 0){
				// 非选中某个商品
				// 判断某家商品全部取消选中
				let result = this.car_list[idx].goods.find(item=>{
					return item.checked
				})
				if(result == undefined || result == 'undefined'){
					this.car_list[idx].checked = 0;
				}
			}else{
				// 选中某个商品
				this.car_list[idx].checked = 1;
			}
			this.sumTotalPrice();
		},
		delGood(idx,index){
			// 从购物车删除单个商品
			console.log(idx,index);
			uni.showModal({
				title: "prompt",
				content: "Delete this product?",
				success: (res) => {
					if(res.confirm){
						// 如果删除某个商品,商铺没有勾选的商品,则取消商铺勾选
						this.car_list[idx].goods[index].checked = 0;
						let result = this.car_list[idx].goods.find(item=>{
							return item.checked > 0
						})
						if(result == undefined){
							this.car_list[idx].checked = 0;
						}
						// 删除某个商品
						this.car_list[idx].goods.splice(index,1);
						if(this.car_list[idx].goods.length == 0){
							this.car_list.splice(idx,1);
						}
						this.clickHasSelect();
						this.sumTotalPrice();
					}
				}
			})
		},
		clickAllSelect(){
			// 点击全选按钮触发
			this.is_all_checked = !this.is_all_checked;
			for(let i in this.car_list){
				if(this.is_all_checked == 0){
					this.car_list[i].checked = 0;
				}else{
					this.car_list[i].checked = 1;
				}
				for(let j in this.car_list[i].goods){
					if(this.is_all_checked == 0){
						this.car_list[i].goods[j].checked = 0;
					}else{
						this.car_list[i].goods[j].checked = 1;
					}
				}
			}
			if(this.is_all_checked == 0){
				// 取消全选
				this.total_number = 0;
				this.total_price = '0.00';
			}else{
				// 全选
				this.sumTotalPrice();
			}
		},
		clearCar(){
			// 清空购物车触发
			uni.showModal({
				title: "prompt",
				content: "Empty shopping cart?",
				success: (res) => {
					if(res.confirm){
						this.total_number = 0;
						this.total_price = '0.00';
						this.car_list = [];
					}
				}
			})
		},
	}
}
</script>

<style scoped lang="scss">
	.height100{
		height: 150rpx;
	}
	.select_box{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.select_icon{
			display: block;
			width: 34rpx;
			height: 34rpx !important;
			border: 2rpx solid #cccccc;
			border-radius: 50%;
			margin-right: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 34rpx;
				height: 38rpx !important;
			}
		}
		.del_all_icon{
			width: 24rpx;
			height: 30rpx;
			margin-left: 20rpx;
		}
	}
	
	.no_car_data{
		text-align: center;
		padding-top: 250rpx;
		color: #333333;
		font-size: 24rpx;
		text{
			color: #cc1f26;
			margin-left: 5rpx;
		}
	}
	
	.car_home_box{
		font-size: 24rpx;
		.car_home_name{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 20rpx;
			box-sizing: border-box;
			view{
				font-weight: bold;
				font-size: 28rpx;
			}
		}
		.car_home_foods{
			background-color: #ffffff;
			.car_food_item{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 20rpx;
				box-sizing: border-box;
				border-bottom: 2rpx solid #eaeaea;
				&:first-of-type{
					border-top: 2rpx solid #eaeaea;
				}
				.car_food_info{
					display: flex;
					justify-content: space-between;
					align-items: stretch;
					width: 100%;
					.car_food_img{
						width: 160rpx;
						height: 160rpx;
						border: 2rpx solid #dfe2e7;
						box-sizing: border-box;
						margin-right: 20rpx;
						border-radius: 10rpx;
						overflow: hidden;
						.food_img{
							width: 100%;
							height: 100%;
							border-radius: 10rpx;
						}
					}
					.car_food_right{
						width: 72%;
						.car_food_top{
							display: flex;
							justify-content: space-between;
							align-items: flex-start;
							.car_food_left{
								width: 90%;
								.car_food_name{
									font-size: 24rpx;
									margin-bottom: 5rpx;
								}
								.car_food_remark{
									color: #868ea4;
									font-style: italic;
									font-size: 24rpx;
								}
							}
							.car_del_icon{
								width: 24rpx;
								height: 30rpx;
							}
						}
						.car_food_bottom{
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin-top: 40rpx;
							.car_food_price{
								color: #cc1f26;
								font-size: 28rpx;
							}
						}
					}
				}
			}
		}
	}
	
	.fixed_footer_next{
		background-color: #ffffff;
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 10;
		/* #ifdef H5 */
		bottom: calc(var(--window-bottom));
		/* #endif */
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		border-top: 2rpx solid #eaeaea;
		.next_box{
			width: 50%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.next_price{
				color: #000000;
			}
			.next_btn{
				button{
					width: 188rpx;
					// min-width: 188rpx;
					// padding: 0 30rpx;
					box-sizing: border-box;
					height: 60rpx;
					line-height: 60rpx;
					color: #ffffff;
					background-color: #cc1f26;
					font-size: 28rpx;
					border: none;
					border-radius: 10rpx;
					margin-left: 15rpx;
					padding: 0;
				}
			}
		}
	}
</style>
