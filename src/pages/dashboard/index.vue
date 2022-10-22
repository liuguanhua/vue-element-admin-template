<script lang="tsx">
import { defineComponent, reactive, onMounted } from 'vue'
import { ElPagination, ElTable, ElTableColumn, ElTag } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

import { dashboard } from '@/scripts/apis'
import { useConfig } from '@/components/hooks'

const limitNum = 3

export default defineComponent({
  setup() {
    const state = reactive<{
      data: Dictionary[]
      pagination: Dictionary
      loading: boolean
    }>({
      data: [],
      pagination: {
        totalCount: 0,
        pageIndex: 1,
      },
      loading: true,
    })
    const router = useRouter()
    const route = useRoute()
    const { getPaginationProps } = useConfig()
    const fetchData = (params: IPaginationOptions = {}) => {
      state.loading = true
      dashboard
        .getData({
          pageSize: state.pagination.pageSize,
          ...params,
        })
        .then((res) => {
          const { data, ...rest } = res
          state.data = data
          state.pagination = rest
        })
        .finally(() => {
          state.loading = false
        })
    }
    onMounted(() => {
      fetchData(route.query)
    })

    const goJump = (params: IPaginationOptions = {}) => {
      router.push({
        path: route.path,
        query: {
          ...route.query,
          pageSize: state.pagination.pageSize,
          ...params,
        },
      })
    }
    const onCurrentChange = (pageIndex) => {
      goJump({
        pageIndex,
      })
    }
    const onSizeChange = (pageSize) => {
      goJump({
        pageSize,
      })
    }

    return () => {
      return (
        <div v-loading={state.loading} class="bg-color-white">
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
            <ElTableColumn prop="goodsName" label="商品名称" />
            <ElTableColumn prop="price" label="单价" />
            <ElTableColumn prop="quantity" label="数量" />
            <ElTableColumn prop="sales" label="销售额" />
          </ElTable>
          {state.pagination.totalCount && (
            <div class="tar p-tblr-20">
              <ElPagination
                background
                {...getPaginationProps()}
                onCurrent-change={onCurrentChange}
                onSize-change={onSizeChange}
                total={state.pagination.totalCount}
                v-model:currentPage={state.pagination.pageIndex}
                v-model:pageSize={state.pagination.pageSize}
              />
            </div>
          )}
        </div>
      )
    }
  },
})
</script>
