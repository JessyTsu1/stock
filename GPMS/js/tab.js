var pageNum = 0;
var limit = 8;
var page = 1;
$.ajax({
    url: "php/laypage_ps.php",
    async: false,
    type: "post",
    success: function (res) {
        pageNum = res; //取到数据总条数
    }
});
layui.use('table', function () {
    var layer = layui.layer //弹层
        ,laypage = layui.laypage //分页
        ,laydate = layui.laydate //日期
        ,table = layui.table //表格
        ,upload = layui.upload //上传
        ,element = layui.element //元素操作
        ,dropdown = layui.dropdown //下拉菜单

    table.render({
        elem: '#demo',
        method: 'post',
        url: 'php/paging_ps.php',
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
            {title: '操作', templet:'#RowToolBar',fixed:'right',align:'center', minWidth:280},
        ]]
    });
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id)
            ,data = checkStatus.data; //获取选中的数据
        switch(obj.event){
            case 'insert':
                if(data.length === 0){
                    layer.msg('请选择一行');
                } else {
                        $.ajax({
                            url: "php/insert_com_ps.php",
                            async: false,
                            type: "post",
                            data: {
                                data: JSON.stringify(data)
                            },
                            success: function (res) {
                                if (res > 0) {
                                    layer.msg('加入成功', {icon: 1});
                                } else {
                                    layer.msg('存在已在组合的股票，其余加入成功', {icon: 0});
                                }
                            }
                        });
                }
                break;
        };
    });
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 table加上lay-filter="对应的值"
        var data = obj.data,layEvent = obj.event;
        if(layEvent == 'insert'){
                var dataArray=new Array();
                dataArray.push(data);
                $.ajax({
                    url: "php/insert_com_ps.php",
                    async: false,
                    type: "post",
                    data:{
                        data: JSON.stringify(dataArray)
                    },
                    success: function (res) {
                        if(res>0) {
                            layer.msg('加入成功', {icon: 1});
                        } else {
                            layer.msg('已在组合，无法重复加入', {icon: 2});
                        }
                    }
                });
        }
        else if(layEvent === 'detail') {

        }
        else if(layEvent === 'edit'){

        }
    });
});