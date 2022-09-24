<script lang="tsx">
import { defineComponent,onMounted } from "vue";
import { RouterLink } from "vue-router";

import { dashboard } from '@/scripts/apis';

export default defineComponent({
  name: "App",
  setup() {
    onMounted(()=>{
     dashboard.getData()
    })
    return () => {
      return (
        <div style="height:1000px">
          <RouterLink to="/">home</RouterLink>
          <br />
          <RouterLink to="/components/markdown">markdown</RouterLink>
          <br />
          <RouterLink to="/components1/tinymce3/2">tinymce2</RouterLink>
          <br />
          <RouterLink to="/components1/tinymce3/4">tinymce4</RouterLink>
        </div>
      );
    };
  },
});
</script>
