function
 
base
	id
	title
	logo
	hls_address
	rtmp_address

plugin
	player
	menu
		data1
			item
			type('link','article','goods')
			title
			//根据type的值通过选择对应的数据 data1[type],并且选择对应的模板渲染数据
			link(string)	//type=='link'  http://baidu.com
			article(int)	//type=='article'  67
			goods(array)	//type=='goods'  [32,24,65,14,65,84] 
		data2
		data3
		data3
	advert
		slider1
			item
			title
			picture
			link
		slider2
		slider3
	goods

style
	origin
		[hls_address,rtmp_address]
	feature
		cover
		countDown
		[logo]
	allow
		limit
		type //1.telphone 2.pay
			monye//起始点，需要支付不少于这个钱才可以进入直播
