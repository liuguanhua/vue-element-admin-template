<script lang="tsx">
import { defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

import { useConfig } from '@/components/hooks'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  setup() {
    const { clsPrefix, logo, title } = useConfig('login')
    const userStore = useUserStore()
    const router = useRouter()
    const route = useRoute()
    const ruleFormRef = ref<FormInstance>()
    const ruleForm = reactive({
      userName: 'admin',
      password: '888888',
    })

    const rules = reactive({
      userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    })

    const submitForm = (formEl) => {
      if (!formEl.value) return
      formEl.value.validate((valid) => {
        if (valid) {
          userStore.login(ruleForm).then(() => {
            ElMessage({
              type: 'success',
              message: '登录成功',
            })
            if (route.query.redirect) {
              window.location.href = route.query.redirect as string
            } else {
              router.push('/')
            }
          })
        } else {
          return false
        }
      })
    }

    return () => {
      return (
        <div class={`${clsPrefix}-wrapper`}>
          <div
            class={`${clsPrefix}-header m-b-20`}
            layout-align="center center"
          >
            <img class={`${clsPrefix}-logo`} src={logo} alt={title} />
            <h3 class="text-uppercase m-l-12 ellipsis r-m-p">{title}</h3>
          </div>
          <ElForm
            ref={ruleFormRef}
            model={ruleForm}
            status-icon
            rules={rules}
            label-width="49px"
          >
            <ElFormItem label="账号" prop="userName">
              <ElInput v-model={ruleForm.userName} autocomplete="off" />
            </ElFormItem>
            <ElFormItem label="密码" prop="password">
              <ElInput
                v-model={ruleForm.password}
                type="password"
                autocomplete="off"
              />
            </ElFormItem>
            <ElFormItem class="m-b-0">
              <div class="w-100">
                <ElButton
                  type="primary"
                  onClick={() => {
                    submitForm(ruleFormRef)
                  }}
                  class="w-100"
                >
                  登录
                </ElButton>
                <p
                  class="color-default-gray"
                  layout-align="space-between center"
                  style="margin: 10px 0px 0px;"
                >
                  <span>账号：随意</span>
                  <span>密码：随意</span>
                </p>
              </div>
            </ElFormItem>
          </ElForm>
        </div>
      )
    }
  },
})
</script>
<style lang="scss" scoped>
$prefix: generateClsPrefix('login');

.#{$prefix} {
  &-wrapper {
    position: absolute;
    padding: 30px 20px 20px;
    top: 50%;
    left: 0;
    right: 0;
    width: 90%;
    max-width: 400px;
    margin: auto;
    transform: translateY(-50%);
    background-color: #fff;
    box-shadow: 0 0 50px rgba(#000, 0.05);
    border-radius: $_5px;
  }
  &-logo {
    width: 40px;
    height: 35px;
  }
}
</style>
