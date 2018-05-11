<template lang='pug'>
  SmartFormPage(
    :title='title'
    :submitResource='submitResource'
    :formList='formList'
    :columns='columns'
    :formValues='formValues')
</template>

<script>
import SmartFormPage from './SmartFormPage'

export default {
  name: 'SmartFormExt',
  components: {
    SmartFormPage
  },
  data () {
    return {
      title: 'SmartForm：表单组件集合',
      submitResource: '',
      formList: ['demoDaterange', 'demoDate', 'demoInput', 'demoSelect', 'demoUpload', 'demoNumber', 'demoNumberrange', 'demoTree'],
      columns: {
        demoDaterange: {
          label: '时间范围',
          form: {
            type: 'daterange'
          }
        },
        demoDate: {
          label: '审核时间',
          form: {
            type: 'time'
          }
        },
        demoInput: {
          label: '审核内容',
          form: {
            type: 'input'
          }
        },
        demoSelect: {
          label: '选择审核类型',
          form: {
            type: 'select'
          },
          options: [{
            label: '通过',
            value: 'pass'
          }, {
            label: '不通过',
            value: 'nopass'
          }]
        },
        demoButton: {
          label: '按钮',
          form: {
            label: '测试',
            type: 'button',
            func () {
              this.$message({
                type: 'success',
                message: '点击了'
              })
            }
          }
        },
        demoUpload: {
          label: '上传控件',
          form: {
            type: 'upload',
            limit: 2
          }
        },
        demoNumber: {
          label: '数字选择器',
          form: {
            width: 150,
            type: 'number',
            min: 0,
            max: 1,
            step: 0.1,
            controls: true,
            position: 'right'
          }
        },
        demoNumberrange: {
          label: '数字范围选择器',
          form: {
            type: 'numrange'
          }
        },
        demoTree: {
          label: '树',
          form: {
            type: 'tree'
          },
          options: [
            {value: 'M1', label: '系统基础模块', level: 1},
            {value: 'M2', label: '消息中心模块', level: 1},
            {value: 'C2', label: '用户模块', parentId: 'M1', level: 2},
            {value: 'C3', label: '角色模块', parentId: 'M1', level: 2},
            {value: 'C4', label: '菜单模块', parentId: 'M1', level: 2},
            {value: 'C5', label: '组织架构模块', parentId: 'M1', level: 2},
            {value: 'C6', label: '系统配置模块', parentId: 'M1', level: 2},
            {value: 'C7', label: '操作日志模块', parentId: 'M1', level: 2},
            {value: 'C9', label: '公告模块', parentId: 'M2', level: 2},
            {value: 'C10', label: '个人中心模块', parentId: 'M2', level: 2},
            {value: 'C11', label: '推送模块', parentId: 'M2', level: 2},
            {value: 55216554, label: '用户列表', parentId: 'C2', level: 3},
            {value: 55417481, label: '保存用户', parentId: 'C2', level: 3},
            {value: 55002902, label: '编辑用户', parentId: 'C2', level: 3},
            {value: 1522247297, label: '删除用户', parentId: 'C2', level: 3},
            {value: 967381374, label: '重置密码', parentId: 'C2', level: 3},
            {value: 721053946, label: '重置用户登录连续失败次数', parentId: 'C2', level: 3},
            {value: 1212197279, label: '角色列表', parentId: 'C3', level: 3},
            {value: 1212398206, label: '保存角色', parentId: 'C3', level: 3},
            {value: 1211983627, label: '编辑角色', parentId: 'C3', level: 3},
            {value: 1346378006, label: '删除角色', parentId: 'C3', level: 3},
            {value: 1353418134, label: '菜单列表', parentId: 'C4', level: 3},
            {value: 1353619061, label: '保存菜单', parentId: 'C4', level: 3},
            {value: 1353204482, label: '编辑菜单', parentId: 'C4', level: 3},
            {value: 320745491, label: '删除菜单', parentId: 'C4', level: 3},
            {value: 341947833, label: '组织架构列表', parentId: 'C5', level: 3},
            {value: 341746906, label: '保存组织架构', parentId: 'C5', level: 3},
            {value: 342161485, label: '编辑组织架构', parentId: 'C5', level: 3},
            {value: 11038398, label: '删除组织架构', parentId: 'C5', level: 3},
            {value: 315815955, label: '系统配置列表', parentId: 'C6', level: 3},
            {value: 315602303, label: '编辑系统配置', parentId: 'C6', level: 3},
            {value: 1067263246, label: '操作日志列表', parentId: 'C7', level: 3},
            {value: 1477414162, label: '删除公告', parentId: 'C9', level: 3},
            {value: 1477411271, label: '查询公告', parentId: 'C9', level: 3},
            {value: 1445244666, label: '新增公告', parentId: 'C9', level: 3},
            {value: 1676262150, label: '更新公告', parentId: 'C9', level: 3},
            {value: 1445043739, label: '公告列表', parentId: 'C9', level: 3},
            {value: 1142627425, label: '阅读公告', parentId: 'C10', level: 3},
            {value: 152996651, label: '推送公告', parentId: 'C11', level: 3}
          ]
        }
      },
      formValues: {}
    }
  }
}
</script>
