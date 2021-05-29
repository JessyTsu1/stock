var pageNum = 0;
var limit = 8;
var page = 1;
var com = JSON.parse(sessionStorage.getItem('com'));

$.ajax({
    url: "php/laypage_com_ps.php?cid="+com.cid+"",
    async: false,
    type: "post",
    data:{
        cid:com.cid
    },
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
        ,form = layui.form;
    table.render({
        elem: '#demo',
        method: 'post',
        url: "php/paging_com_ps.php?cid="+com.cid+"",
        limit: limit,
        page: page,
        cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
        toolbar: '#TableToolBar',
        cols: [[
            {checkbox: true, fixed:'left'},
            {field: 'code', width: 150, sort: true, title: '个股代码'},
            {field: 'name', width: 150, sort: true, title: '个股名称'},
            {field: 'open', width: 150, sort: true, title: '开盘价'},
            {field: 'close', width: 150, sort: true, title: '收盘价'},
            {field: 'high', width: 150, sort: true, title: '最高价格'},
            {field: 'low', width: 150, sort: true, title: '最低价格'},
            {field: 'cjl', width: 150, sort: true, title: '成交量'},
            {field: 'cje', width: 150, sort: true, title: '成交额'},
            {field: 'fluctuation', width: 150, sort: true, title: '振幅'},
            {field: 'dzf', width: 150, sort: true, title: '跌涨幅'},
            {field: 'dze', width: 150, sort: true, title: '跌涨额'},
            {field: 'hsl', width: 150, sort: true, title: '换手率'},
            {title: '操作', templet:'#RowToolBar',fixed:'right',align:'center', minWidth:380},
        ]]
    });
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id)
            ,data = checkStatus.data; //获取选中的数据
        switch(obj.event) {
            case 'del':
                if (data.length === 0) {
                    layer.msg('请选择一行');
                } else {
                    layer.confirm('确定删除这些行么', {btn: ['确定', '取消'], title: "提示"}, function () {
                        layer.close();
                        $.ajax({
                            url: "php/delete_com_ps.php",
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
            case 'move':
                if (data.length === 0) {
                    layer.msg('请选择一行');
                } else {
                    var table2 = layui.table;
                    table2.render({
                        elem: '#selectCom',
                        method: 'post',
                        url: "php/select_com.php?cid="+com.cid,
                        cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        cols: [[
                            {field: 'cid', width: 150, sort: true, title: '组合编号'},
                            {field: 'cname', width: 150, sort: true, title: '组合名'},
                            {title: '操作', templet: '#ComRowToolBar', align: 'center'},
                        ]]
                    });
                    table2.on('tool(selectCom)', function (obj) {
                        var data2 = obj.data, layEvent2 = obj.event;
                        if (layEvent2 == 'mov') {
                            $.ajax({
                                url: "php/move_ps.php",
                                type: "post",
                                data: {
                                    newcid: data2.cid,
                                    oldcid: com.cid,
                                    data: JSON.stringify(data)
                                },
                                success: function (res) {
                                    if (res > 0) {
                                        layer.msg('移动成功', {icon: 1});
                                    } else {
                                        layer.msg('移动失败', {icon: 2});
                                    }
                                    layer.closeAll();
                                    $(".layui-laypage-btn").click();//刷新本页表格
                                }
                            });
                        }
                    });
                    layer.open({
                        type: 1,
                        title: "移动到",
                        content: $('#com'),
                        cancel: function () {
                            layer.close(layer.index);
                        },
                    });
                    break;
                }
                ;
        }
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
                    url: "php/delete_com_ps.php",
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
        else if(layEvent === 'move'){
            var table2 = layui.table;
            table2.render({
                elem: '#selectCom',
                method: 'post',
                url: "php/select_com.php?cid="+com.cid,
                cellMinWidth: 80, //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                cols: [[
                    {field: 'cid', width: 150, sort: true, title: '组合编号'},
                    {field: 'cname', width: 150, sort: true, title: '组合名'},
                    {title: '操作', templet:'#ComRowToolBar',align:'center', minWidth:100},
                ]]
            });
            table2.on('tool(selectCom)', function(obj){
                var data2 = obj.data,layEvent2 = obj.event;
                if(layEvent2 == 'mov'){
                    var dataArray=new Array();
                    dataArray.push(data);
                    $.ajax({
                        url: "php/move_ps.php",
                        type: "post",
                        data:{
                            newcid: data2.cid,
                            oldcid:com.cid,
                            data:JSON.stringify(dataArray)
                        },
                        success: function (res) {
                            if(res>0) {
                                layer.msg('移动成功', {icon: 1});
                            } else {
                                layer.msg('移动失败', {icon: 2});
                            }
                            layer.closeAll();
                            $(".layui-laypage-btn").click();//刷新本页表格
                        }
                    });
                }
            });
            layer.open({
                type: 1,
                title: "移动到",
                content: $('#com'),
                cancel: function () {
                    layer.closeAll();
                },
            });
        }
    });
});