$(function(){
    // 点击去注册账号的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录账号的链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 从layui中获取form对象
    var form=layui.form
    // 从layui中获取layer对象 导入layer.msg的方法
    var layer=layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            // 通过形参拿到的是确认密码框中的内容
            // 还要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败 则return一个提示消息即可
            var pwd=$('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一样'
            }
        }
    })
    // 监听表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2.发起ajax的post请求
        var data={username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status!==0){
                return layer.msg(res.message);
            }else{
                layer.msg('注册成功,请登录！');
                // 模拟人的点击行为
                $('#link_login').click()
            }
            
        })
    })
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功')
                // 将登陆成功得到的token存储到本地仓库中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='/index.html'
            }
        })
    })
})