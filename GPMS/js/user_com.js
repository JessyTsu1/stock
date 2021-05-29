var pageNum = 0;
var limit = 8;
var page = 1;
// var user = JSON.parse(sessionStorage.getItem('user'));

$.ajax({
    url: "php/laypage_com.php",
    async: false,
    type: "post",
    success: function (res) {
        pageNum = res; //取到数据总条数
    }
});
layui.use(function () {
    var layer = layui.layer //弹层
        ,laypage = layui.laypage //分页
        ,laydate = layui.laydate //日期
        ,table = layui.table //表格
        ,upload = layui.upload //上传
        ,element = layui.element //元素操作
        ,dropdown = layui.dropdown //下拉菜单
        ,form=layui.form;
    table.render({
        elem: '#demo',
        method: 'post',
        url: 'php/paging_com.php',
        limit: limit,
        page: page,
        cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        toolbar: '#TableToolBar',
        cols: [[
            {checkbox: true, fixed:'left'},
            {field: 'cid', width: 150, sort: true, title: '组合编号'},
            {field: 'cname', width: 150, sort: true, title: '组合名'},
            {title: '操作', templet:'#RowToolBar',fixed:'right',align:'center', minWidth:280},
        ]]
    });
    form.render();
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id)
            ,data = checkStatus.data; //获取选中的数据
        switch(obj.event){
            case 'del':
                if(data.length === 0){
                    layer.msg('请选择一行');
                } else {
                    layer.confirm('确定删除这些行么',{btn: ['确定', '取消'],title:"提示"}, function() {
                        layer.close();
                        $.ajax({
                            url: "php/delete_com.php",
                            async: false,
                            type: "post",
                            data: {
                                data: JSON.stringify(data)
                            },
                            success: function (res) {
                                if (res > 0) {
                                    layer.msg('删除成功', {icon: 1});
                                } else {
                                    layer.msg('删除失败', {icon: 2});
                                }
                                $(".layui-laypage-btn").click();//刷新本页表格
                            }
                        });
                    });
                }
                break;
        };
    });
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 table加上lay-filter="对应的值"
        var data = obj.data,layEvent = obj.event;
        if(layEvent == 'del'){
            layer.confirm('确定删除行么',{btn: ['确定', '取消'],title:"提示"}, function(index) {
                obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                layer.close(index);
                var dataArray=new Array();
                dataArray.push(data);
                $.ajax({
                    url: "php/delete_com.php",
                    async: false,
                    type: "post",
                    data:{
                        data: JSON.stringify(dataArray)
                    },
                    success: function (res) {
                        if(res>0) {
                            layer.msg('删除成功', {icon: 1});
                        } else {
                            layer.msg('删除失败', {icon: 2});
                        }
                    }
                });
            });
        }
        else if(layEvent === 'detail') {
            sessionStorage.setItem("com",JSON.stringify(data));
            location.href='user_ps.html';
        }
        else if(layEvent === 'edit'){
            layer.open({
                type: 1,
                title: "修改组合",
                btn: ['确定', '取消'],
                content: $("#test"),
                yes:function(index,layero){

                    var input=document.getElementById("cname");
                    var value=input.value;
                    $.ajax({
                        url: "php/update_com.php?cname="+value+"&cid="+data.cid,
                        async: false,
                        type: "post",
                        success: function (res) {
                            if (res > 0) {
                                layer.msg('修改成功', {icon: 1});
                            } else {
                                layer.msg('修改失败', {icon: 2});
                            }
                            $(".layui-laypage-btn").click();//刷新本页表格
                        }
                    });
                    layer.close(index);
                }
            });
        }
    });
});