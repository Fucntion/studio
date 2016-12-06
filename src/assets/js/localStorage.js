

// 对外提供全局变量LS
//
// 存储：LS.set('userName',"js明哥哥");
//
// 读取：LS.get('userName');
//
// 删除：LS.remove('userName');
(function(window){
	var LS;
	(function(){

		var o = document.getElementsByTagName("head")[0],
			n = window.location.hostname || "localStorage",
			d = new Date(),doc,agent;
		//typeof o.addBehavior 在IE6下是object，在IE10下是function，因此这里直接用!判断
		if(!o.addBehavior)return;//防止有些浏览器默认禁用localStorage，这里优先考虑userData本地存储
		try{ //尝试创建iframe代理
			agent = new ActiveXObject('htmlfile');
			agent.open();
			agent.write('<s' + 'cript>document.w=window;</s' + 'cript><iframe src="/favicon.ico"></frame>');
			agent.close();
			doc = agent.w.frames[0].document;
		}catch(e){doc = document;}
		o = doc.createElement('head');//这里通过代理document创建head，可以使存储数据垮目录访问
		doc.appendChild(o);
		d.setDate(d.getDate() + 36500);
		o.addBehavior("#default#userData");
		o.expires = d.toUTCString();
		o.load(n);

		var root = o.XMLDocument.documentElement,
			attrs = root.attributes,
			prefix = "prefix_____hack__",
			reg1 = /^[-\d]/,
			reg2 = new RegExp("^"+prefix),
			encode = function(key){
				return reg1.test(key) ? prefix + key : key;
			},
			decode = function(key){
				return key.replace(reg2,"");
			};

		LS= {
			length: attrs.length,
			notNativeCode: true,
			getItem: function(key){
				return (attrs.getNamedItem( encode(key) ) || {nodeValue: null}).nodeValue||root.getAttribute(encode(key)); //IE9中 通过o.getAttribute(name);取不到值，所以才用了下面比较复杂的方法。（也许你会诧异IE9不是有原生的localStorage吗，是的，但是用户可以关闭DOM存储，所以为了保险一些还是考虑IE9可能会使用到#userData吧。）
			},
			setItem: function(key, value){
				root.setAttribute( encode(key), value); //IE9中无法通过 o.setAttribute(name, value); 设置#userData值，而用下面的方法却可以。
				o.save(n);
				this.length = attrs.length;
			},
			removeItem: function(key){
				root.removeAttribute( encode(key) ); //IE9中无法通过 o.removeAttribute(name); 删除#userData值，而用下面的方法却可以。
				o.save(n);
				this.length = attrs.length;
			},
			clear: function(){
				while(attrs.length){
					this.removeItem( attrs[0].nodeName );
				}
				this.length = 0;
			},
			key: function(i){
				return attrs[i] ? decode(attrs[i].nodeName) : undefined;
			}
		};
	})();

	(function(w,localStorage){//封装LS，对外提供接口
		var f = function(){return null;};
		w.LS = localStorage?{
			set : function(key, value){
				//fixed iPhone/iPad 'QUOTA_EXCEEDED_ERR' bug
				if( this.get(key) !== undefined )
					this.remove(key);
				localStorage.setItem(key, value);
			},
			//查询不存在的key时，有的浏览器返回null，这里统一返回undefined
			get : function(key){
				var v = localStorage.getItem(key);
				return v === null ? undefined : v;
			},
			remove : function(key){ localStorage.removeItem(key); },
			clear : function(){ localStorage.clear(); },
			each : function(callback){
				var list = this.obj(), fn = callback || function(){}, key;
				for(key in list)
					if( fn.call(this, key, this.get(key)) === false )
						break;
			},
			obj : function(){
				var list={}, i=0, n, key;
				if( localStorage.isVirtualObject ){
					list = localStorage.key(-1);
				}else{
					n = localStorage.length;
					for(; i<n; i++){
						key = localStorage.key(i);
						list[key] = this.get(key);
					}
				}
				return list;
			}
		}:{set:f,get:f,remove:f,clear:f,each:f,obj:f};//如果都不支持则所有方法返回null
	})(window,LS||window.localStorage);//这里优先使用自定义的LS
})(window);



// 对外提供全局变量LS
//
// 存储：LS.set('userName',"js明哥哥");
//
// 读取：LS.get('userName');
//
// 删除：LS.remove('userName');
(function(window){
	var LS;
	(function(){

		var o = document.getElementsByTagName("head")[0],
			n = window.location.hostname || "localStorage",
			d = new Date(),doc,agent;
		//typeof o.addBehavior 在IE6下是object，在IE10下是function，因此这里直接用!判断
		if(!o.addBehavior)return;//防止有些浏览器默认禁用localStorage，这里优先考虑userData本地存储
		try{ //尝试创建iframe代理
			agent = new ActiveXObject('htmlfile');
			agent.open();
			agent.write('<s' + 'cript>document.w=window;</s' + 'cript><iframe src="/favicon.ico"></frame>');
			agent.close();
			doc = agent.w.frames[0].document;
		}catch(e){doc = document;}
		o = doc.createElement('head');//这里通过代理document创建head，可以使存储数据垮目录访问
		doc.appendChild(o);
		d.setDate(d.getDate() + 36500);
		o.addBehavior("#default#userData");
		o.expires = d.toUTCString();
		o.load(n);

		var root = o.XMLDocument.documentElement,
			attrs = root.attributes,
			prefix = "prefix_____hack__",
			reg1 = /^[-\d]/,
			reg2 = new RegExp("^"+prefix),
			encode = function(key){
				return reg1.test(key) ? prefix + key : key;
			},
			decode = function(key){
				return key.replace(reg2,"");
			};

		LS= {
			length: attrs.length,
			notNativeCode: true,
			getItem: function(key){
				return (attrs.getNamedItem( encode(key) ) || {nodeValue: null}).nodeValue||root.getAttribute(encode(key)); //IE9中 通过o.getAttribute(name);取不到值，所以才用了下面比较复杂的方法。（也许你会诧异IE9不是有原生的localStorage吗，是的，但是用户可以关闭DOM存储，所以为了保险一些还是考虑IE9可能会使用到#userData吧。）
			},
			setItem: function(key, value){
				root.setAttribute( encode(key), value); //IE9中无法通过 o.setAttribute(name, value); 设置#userData值，而用下面的方法却可以。
				o.save(n);
				this.length = attrs.length;
			},
			removeItem: function(key){
				root.removeAttribute( encode(key) ); //IE9中无法通过 o.removeAttribute(name); 删除#userData值，而用下面的方法却可以。
				o.save(n);
				this.length = attrs.length;
			},
			clear: function(){
				while(attrs.length){
					this.removeItem( attrs[0].nodeName );
				}
				this.length = 0;
			},
			key: function(i){
				return attrs[i] ? decode(attrs[i].nodeName) : undefined;
			}
		};
	})();

	(function(w,localStorage){//封装LS，对外提供接口
		var f = function(){return null;};
		w.LS = localStorage?{
			set : function(key, value){
				//fixed iPhone/iPad 'QUOTA_EXCEEDED_ERR' bug
				if( this.get(key) !== undefined )
					this.remove(key);
				localStorage.setItem(key, value);
			},
			//查询不存在的key时，有的浏览器返回null，这里统一返回undefined
			get : function(key){
				var v = localStorage.getItem(key);
				return v === null ? undefined : v;
			},
			remove : function(key){ localStorage.removeItem(key); },
			clear : function(){ localStorage.clear(); },
			each : function(callback){
				var list = this.obj(), fn = callback || function(){}, key;
				for(key in list)
					if( fn.call(this, key, this.get(key)) === false )
						break;
			},
			obj : function(){
				var list={}, i=0, n, key;
				if( localStorage.isVirtualObject ){
					list = localStorage.key(-1);
				}else{
					n = localStorage.length;
					for(; i<n; i++){
						key = localStorage.key(i);
						list[key] = this.get(key);
					}
				}
				return list;
			}
		}:{set:f,get:f,remove:f,clear:f,each:f,obj:f};//如果都不支持则所有方法返回null
	})(window,LS||window.localStorage);//这里优先使用自定义的LS
})(window);

