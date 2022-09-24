<script lang="tsx">
import { defineComponent, reactive } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'

export default defineComponent({
  setup() {
    const state = reactive({
      data: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    })
    return () => {
      return (
        <ElTable data={state.data}>
          <ElTableColumn prop="date" label="Date" width="180" />
          <ElTableColumn prop="name" label="Name" width="180" />
          <ElTableColumn prop="address" label="Address" />
        </ElTable>
      )
    }
  },
})
</script>
