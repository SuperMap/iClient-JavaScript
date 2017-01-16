/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Cloud.js
 */

/**
 * Class: SuperMap.Cloud.Security
 * iportal或者isupermap的登录注册类
 */
SuperMap.Cloud.Security=SuperMap.Class({
    /**
     * Property: url
     * 登录地址
     * */
    url:null,

    /**
     * APIProperty: type
     * {Number} 登录注册的服务器类型，可为SuperMap.Cloud.Security.ISUPERMAP或者SuperMap.Cloud.Security.IPORTAL,
     * 默认为SuperMap.Cloud.Security.ISUPERMAP
     * */
    type:null,

    /**
     * Property: actived
     * {Boolean} 状态位，用判断此对象是否已失效，是的话就阻止回调函数进行回调
     * */
    actived:null,

    /**
     * Constructor: SuperMap.Cloud.Security
     * 登录注册服务类
     *
     * Examples:
     * isupermap登录：
     * (start code)
     *  var type=SuperMap.Cloud.Security.ISUPERMAP;
     *  var security=new SuperMap.Cloud.Security(type);
     * (end)
     *  iportal登录：
     * (start code)
     *   var type=SuperMap.Cloud.Security.IPORTAL;
     *   var url="http://localhost:8092/iportal";
     *   var security=new SuperMap.Cloud.Security(type,url);
     * (end)
     * */
    initialize:function(type,url){
        if(!type){
            this.type=SuperMap.Cloud.Security.ISUPERMAP;
        }else{
            this.setType(type);
        }
        var end = url.substr(url.length - 1, 1);
        this.url=url+(end==="/"?"web/":"/web/");
        this.actived=true;
    },

    /**
     * APIMethod: destroy
     * 销毁登录注册对象
     * */
    destroy:function(){
        this.url=null
        this.type=null;
        this.actived=null;
    },

    /**
     * APIMethod: setType
     * 设置登录类型，可为SuperMap.Cloud.Security.ISUPERMAP或者SuperMap.Cloud.Security.IPORTAL
     * */
    setType:function(type){
        this.type=type;
    },

    /**
     * APIMethod: login
     * 登录
     *
     * Parameters:
     * username - {String} （iportal登录用）用户名
     * password - {String} （iportal登录用）密码
     * success - {Function} （iportal登录用）成功回调函数
     * failed - {Function} （iportal登录用）失败回调函数
     * scope - {Object} iportal登录用）[可选]回调函数的作用域
     * */
    login:function(){
        var success,failed,scope;
        if(this.type===SuperMap.Cloud.Security.IPROTAL){
            if(arguments.length>=4){
                var username=arguments[0],
                    password=arguments[1];
                success=typeof arguments[2]==="function"?arguments[2]:function(){};
                failed=typeof arguments[2]==="function"?arguments[3]:function(){};
                scope=arguments[4]||null;
                var loginInfo={username:username,password:password};
                return this.iportalLogin(loginInfo,success,failed,scope);
            }
        }else if(this.type===SuperMap.Cloud.Security.ISUPERMAP){
            if(arguments.length<=1){
                var url=arguments[0];
                return this.isupermapLogin(url);
            }
        }
        return this;
    },

    /**
     * APIMethod: registerUser
     * 注册用户
     *
     * Parameters:
     * username - {String} （iportal注册用）用户名
     * nickname - {String} （iportal注册用）用户昵称
     * password - {String} （iportal注册用）密码
     * email - {String} iportal注册用）用户的email地址
     * success - {Function} （iportal注册用）成功回调函数
     * failed - {Function} （iportal注册用）失败回调函数
     * scope - {Object} iportal注册用）[可选]回调函数的作用域
     * */
    registerUser:function(){
        if(this.type===SuperMap.Cloud.Security.IPROTAL){
            if(arguments.length>=6){
                var name=arguments[0],
                    nickname=arguments[1],
                    password=arguments[2],
                    email=arguments[3],
                    success=typeof arguments[4]==="function"?arguments[4]:function(){},
                    failed=typeof arguments[5]==="function"?arguments[5]:function(){},
                    scope=arguments[6]||null;
                var registerInfo={name:name,nickname:nickname,password:password,email:email};
                return this.iportalRegisterUser(registerInfo,success,failed,scope);
            }
        }else if(this.type===SuperMap.Cloud.Security.ISUPERMAP){
            if(arguments.length<=1){
                var url=arguments[0];
                return this.isupermapRegisterUser(url);
            }
        }
        return this;
    },

    /**
     * APIMethod: getUserInfo
     * iportal获取用户信息的方法
     *
     * Parameters:
     * username - {String} 用户名
     * */
    getUserInfo:function(){
        if(this.type===SuperMap.Cloud.Security.IPROTAL){
            if(arguments.length>=3){
                var username=arguments[0],
                    success=typeof arguments[1]==="function"?arguments[1]:function(){},
                    failed=typeof arguments[2]==="function"?arguments[2]:function(){},
                    scope=arguments[3]||null;
                return this.iportalGetUserInfo(username,success,failed,scope);
            }
        }else if(this.type===SuperMap.Cloud.Security.ISUPERMAP){
            /*do nothing*/
        }
        return this;
    },

    iportalLogin:function(loginInfo,success,failed,scope){
        var url=this.url+"login.json";
        var that=this;
        loginInfo=SuperMap.Util.toJSON(loginInfo);
        SuperMap.Request.issue({
            url:url,
            data:loginInfo,
            headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},
            method:"POST",
            withCredentials:true,
            success:function(result){
                var result = new SuperMap.Format.JSON().read(result.responseText);
                if(!result||!that.actived){
                    return;
                }
                if(result.succeed){
                    if(typeof success==="function"){
                        success.call(scope||this,result);
                    }
                }else{
                    if(typeof failed==="function"){
                        failed.call(scope||this,result);
                    }
                }
            },
            failure:function(err){
                if(!that.actived){
                    return;
                }
                if(typeof failed==="function"){
                    failed.call(scope||this,err);
                }
            },
            scope:this
        });
        return this;
    },

    iportalRegisterUser:function(registerInfo,success,failed,scope){
        var url=this.url+"users.json";
        var that=this;
        registerInfo=SuperMap.Util.toJSON(registerInfo);
        SuperMap.Request.issue({
            url:url,
            data:registerInfo,
            headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},
            method:"POST",
            withCredentials:true,
            success:function(result){
                var result = new SuperMap.Format.JSON().read(result.responseText);
                if(!result||!that.actived){
                    return;
                }
                if(result.succeed){
                    if(typeof success==="function"){
                        success.call(scope||this,result);
                    }
                }else{
                    if(typeof failed==="function"){
                        failed.call(scope||this,result);
                    }
                }
            },
            failure:function(err){
                if(!that.actived){
                    return;
                }
                if(typeof failed==="function"){
                    failed.call(scope||this,err);
                }
            },
            scope:this
        });
        return this;
    },

    iportalGetUserInfo:function(username,success,failed,scope){
        var url=this.url+"users/{username}.json";
        url=url.replace(/\{username\}/,username);
        var that=this;
        SuperMap.Request.issue({
            url:url,
            method:"GET",
            success:function(result){
                var result = new SuperMap.Format.JSON().read(result.responseText);
                if(!result||!that.actived){
                    return;
                }
                if(typeof success==="function"){
                    success.call(scope||this,result);
                }
            },
            failure:function(err){
                if(!that.actived){
                    return;
                }
                if(typeof failed==="function"){
                    failed.call(scope||this,err);
                }
            },
            scope:this
        });
        return this;
    },

    isupermapLogin:function(casUrl){
        var url=SuperMap.Cloud.Security.ISUPERMAPSSO;
        url+="/login?service="+casUrl;
        window.open(url,"login");
        return this;
    },

    isupermapRegisterUser:function(redirectUrl){
        var url=SuperMap.Cloud.Security.ISUPERMAPSSO;
        url+="/register?service="+redirectUrl;
        window.open(url,"register");
        return this;
    },

    isupermapGetUserInfo:function(){},

    CLASS_NAME:"SuperMap.Cloud.Security"
});

SuperMap.Cloud.Security.ISUPERMAP="isupermap";
SuperMap.Cloud.Security.IPROTAL="iportal";
SuperMap.Cloud.Security.ISUPERMAPSSO="https://sso.supermap.com";