$(function(){
    var form=layui.form
    var layer=layui.layer
    form.verify({
        nickname: function(value){
            if(value.length>6){
                return '昵称的长度必须在1~6之间'
            }
        }
    })
    initUserInfo()
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                // 调用form.val()快速为表单赋值
                form.val('formUserinfo',res.data)
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click',function(e){
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })

    // 发起ajax数据请求
    $('.layui-form').on('submit',function(e){
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
        method:'POST',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg('更新用户信息失败！')
            }
            layer.msg('更新用户信息成功！')
            // 调用父页面中的方法 重新渲染用户的头像和基本信息
            // window代表ifram所代表的窗口 
            window.parent.getUserInfo()
        }
    })})
})