/*
 * @des 权限菜单
 * permission结构 模块-页面-按钮
 * https://shimo.im/sheets/dggwtCJPyGdG3GtJ/uUqHo
 * */
const MENU = [
    {
        permission: '10-01',
        name: '退役军人',
        btn: [
            {
                permission: '10-01-01',
                name: '创建用户',
            },
            {
                permission: '10-01-02',
                name: '批量导入学员',
            },
            {
                permission: '10-01-03',
                name: '批量导出登记表',
            },
            {
                permission: '10-01-04',
                name: '批量颁发证书',
            },
            {
                permission: '10-01-05',
                name: '编辑',
            },
            {
                permission: '10-01-06',
                name: '禁用',
            },
            {
                permission: '10-01-07',
                name: '启用',
            },
            {
                permission: '10-01-08',
                name: '导出登记表',
            },
            {
                permission: '10-01-09',
                name: '颁发证书',
            },
            {
                permission: '10-01-10',
                name: '查看证书',
            },
        ],
    },
    {
        permission: '11-01',
        name: '资源列表',
        btn: [
            {
                permission: '11-01-01',
                name: '上传资源',
            },
            {
                permission: '11-01-02',
                name: '修改分类',
            },
            {
                permission: '11-01-03',
                name: '禁用资源',
            },
        ],
    },
    {
        permission: '12-01',
        name: '课程列表',
        btn: [
            {
                permission: '12-01-01',
                name: '创建课程',
            },
            {
                permission: '12-01-02',
                name: '查看编辑',
            },
            {
                permission: '12-01-03',
                name: '禁用资源',
            },
            {
                permission: '12-01-04',
                name: '删除',
            },
            {
                permission: '12-01-05',
                name: '发布',
            },
            {
                permission: '12-01-06',
                name: '取消发布',
            },
        ],
    },
    {
        permission: '13-01',
        name: '题库列表',
        btn: [
            {
                permission: '13-01-01',
                name: '新建试题',
            },
            {
                permission: '13-01-02',
                name: '修改',
            },
            {
                permission: '13-01-03',
                name: '详情',
            },
            {
                permission: '13-01-04',
                name: '删除',
            },
            {
                permission: '13-01-05',
                name: '发布',
            },
            {
                permission: '13-01-06',
                name: '取消发布',
            },
        ],
    },
    {
        permission: '13-02',
        name: '考试管理',
        btn: [
            {
                permission: '13-02-01',
                name: '新建',
            },
            {
                permission: '13-02-02',
                name: '修改',
            },
            {
                permission: '13-02-03',
                name: '删除',
            },
            {
                permission: '13-02-04',
                name: '查看数据',
            },
            {
                permission: '13-02-05',
                name: '发布',
            },
            {
                permission: '13-02-06',
                name: '取消发布',
            },
            {
                permission: '13-02-07',
                name: '预览',
            },
        ],
    },
    {
        permission: '14-01',
        name: '职位管理',
        btn: [
            {
                permission: '14-01-01',
                name: '新建',
            },
            {
                permission: '14-01-02',
                name: '发布',
            },

            {
                permission: '14-01-03',
                name: '编辑',
            },
            {
                permission: '14-01-04',
                name: '关闭',
            },
            {
                permission: '14-01-05',
                name: '取消发布',
            },
            {
                permission: '14-01-06',
                name: '开放职位',
            },
            {
                permission: '14-01-07',
                name: '预览',
            },
        ],
    },
    {
        permission: '15-01',
        name: '订单管理',
        btn: [
            {
                permission: '15-01-01',
                name: '导出',
            },
        ],
    },
    {
        permission: '16-01',
        name: 'BI看板',
        btn: [
            // {
            //     permission: '16-01-01',
            //     name: '导出课程统计',
            // },
            // {
            //     permission: '16-01-02',
            //     name: '导出学员学情',
            // },
        ],
    },
    {
        permission: '17-01',
        name: '用户管理',
        btn: [
            {
                permission: '17-01-01',
                name: '添加用户',
            },
            {
                permission: '17-01-02',
                name: '开通权限',
            },
            {
                permission: '17-01-03',
                name: '启用',
            },
            {
                permission: '17-01-04',
                name: '禁用',
            },
            {
                permission: '17-01-05',
                name: '编辑',
            },
        ],
    },
    {
        permission: '17-02',
        name: '角色管理',
        btn: [
            {
                permission: '17-02-01',
                name: '添加角色',
            },
            {
                permission: '17-02-02',
                name: '编辑',
            },
            {
                permission: '17-02-03',
                name: '保存',
            },
        ],
    },
    {
        permission: '18-01',
        name: '调查问卷管理',
        btn: [
            {
                permission: '18-01-01',
                name: '创建',
            },
            {
                permission: '18-01-02',
                name: '修改',
            },
            {
                permission: '18-01-03',
                name: '发布',
            },
            {
                permission: '18-01-04',
                name: '取消发布',
            },
            {
                permission: '18-01-05',
                name: '查看数据',
            },
        ],
    },
    {
        permission: '18-02',
        name: '公告',
        btn: [
            {
                permission: '18-02-01',
                name: '创建',
            },
            {
                permission: '18-02-02',
                name: '修改',
            },
            {
                permission: '18-02-03',
                name: '发布',
            },
            {
                permission: '18-02-04',
                name: '取消发布',
            },
            {
                permission: '18-02-05',
                name: '查看详情',
            },
            {
                permission: '18-02-06',
                name: '删除',
            },
        ],
    },
    {
        permission: '18-03',
        name: '政策',
        btn: [
            {
                permission: '18-03-01',
                name: '创建',
            },
            {
                permission: '18-03-02',
                name: '修改',
            },
            {
                permission: '18-03-03',
                name: '发布',
            },
            {
                permission: '18-03-04',
                name: '取消发布',
            },
            {
                permission: '18-03-05',
                name: '查看详情',
            },
            {
                permission: '18-03-06',
                name: '删除',
            },
        ],
    },
    {
        permission: '18-04',
        name: '政策问答',
        btn: [
            {
                permission: '18-04-01',
                name: '创建',
            },
            {
                permission: '18-04-02',
                name: '修改',
            },
            {
                permission: '18-04-03',
                name: '发布',
            },
            {
                permission: '18-04-04',
                name: '取消发布',
            },
            {
                permission: '18-04-05',
                name: '查看详情',
            },
            {
                permission: '18-04-06',
                name: '删除',
            },
        ],
    },
    {
        permission: '18-05',
        name: '网站',
        btn: [
            {
                permission: '18-05-01',
                name: '编辑',
            },
        ],
    },
    {
        permission: '19-01',
        name: '课程类别列表',
    },
    {
        permission: '20-01',
        name: '课程类别',
        btn: [
            {
                permission: '20-01-01',
                name: '添加',
            },
            {
                permission: '20-01-02',
                name: '修改',
            },
            {
                permission: '20-01-03',
                name: '编辑',
            },
        ],
    },
];
// const ADMIN = [10, 1001, 1002, 11, 1101, 12, 1201, 13, 1301, 14, 1401, 1402];
export default {
    // ADMIN,
    MENU,
};
