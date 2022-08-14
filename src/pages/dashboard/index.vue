<script lang="tsx">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
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
