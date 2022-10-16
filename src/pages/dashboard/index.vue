<script lang="tsx">
import { defineComponent, reactive, onMounted, Fragment } from 'vue'
import { ElPagination, ElTable, ElTableColumn, ElTag } from 'element-plus'

import { dashboard } from '@/scripts/apis'

const limitNum = 3

export default defineComponent({
  setup() {
    const state = reactive<{
      data: Dictionary[]
      pagination: Dictionary
    }>({
      data: [],
      pagination: {
        totalCount: 0,
      },
    })
    onMounted(() => {
      dashboard.getData().then((res) => {
        const { data, ...rest } = res
        state.data = data
        state.pagination = rest
      })
    })
    return () => {
      return (
        <div class="bg-color-white">
          <ElTable emptyText="暂无数据" data={state.data}>
            <ElTableColumn
              v-slots={{
                default: (scope) => {
                  const text = scope.row.ranking
                  const index = scope.$index
                  return index <= limitNum - 1 &&
                    Object.is(state.pagination.pageIndex, 1) ? (
                    <ElTag>{text}</ElTag>
                  ) : (
                    text
                  )
                },
              }}
              prop="ranking"
              label="排名"
              width="180"
            ></ElTableColumn>
            <ElTableColumn prop="goodsName" label="商品名称" width="180" />
            <ElTableColumn prop="price" label="单价" />
            <ElTableColumn prop="quantity" label="数量" />
            <ElTableColumn prop="sales" label="销售额" />
            <ElTableColumn prop="operate" label="操作" />
          </ElTable>
          <div class="tar p-tblr-20">
            <ElPagination
              background
              layout="prev, pager, next"
              total={state.pagination.totalCount}
            />
          </div>
        </div>
      )
    }
  },
})
</script>
