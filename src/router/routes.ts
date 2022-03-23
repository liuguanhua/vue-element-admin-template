import { BasicLayout as Layout, MainView } from '@/layouts'
import { TRouteRow, TRouteRowArray } from '@/types'

const componentsRouter: TRouteRow = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: 'Components',
    elIcon: 'Compass',
  },
  children: [
    {
      path: 'tinymce',
      // name: 'TinymceDemo',
      redirect: 'tinymce-2',
      meta: { title: 'Tinymce' },
      component: MainView,
      alwaysShow: true,
      children: [
        {
          path: 'tinymce-2',
          name: 'TinymceDemo-2',
          meta: { title: 'Tinymce-2' },
          component: () => import('@/pages/dashboard/index.vue'),
        },
        // {
        //   path: 'tinymce-3',
        //   name: 'TinymceDemo-3',
        //   meta: { title: 'Tinymce-3', elIcon: 'Edit' },
        //   component: () => import('@/pages/dashboard/index.vue'),
        // },
      ],
    },
    {
      path: 'markdown',
      name: 'MarkdownDemo',
      meta: { title: 'Markdown', elIcon: 'Edit' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'json-editor',
      name: 'JsonEditorDemo',
      meta: { title: 'JSON Editor' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'split-pane',
      name: 'SplitpaneDemo',
      meta: { title: 'SplitPane' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'avatar-upload',
      name: 'AvatarUploadDemo',
      meta: { title: 'Upload' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'dropzone',
      name: 'DropzoneDemo',
      meta: { title: 'Dropzone' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'sticky',
      name: 'StickyDemo',
      meta: { title: 'Sticky' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'count-to',
      name: 'CountToDemo',
      meta: { title: 'Count To' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'mixin',
      name: 'ComponentMixinDemo',
      meta: { title: 'Component Mixin' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'back-to-top',
      name: 'BackToTopDemo',
      meta: { title: 'Back To Top' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'drag-dialog',
      name: 'DragDialogDemo',
      meta: { title: 'Drag Dialog' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'drag-select',
      name: 'DragSelectDemo',
      meta: { title: 'Drag Select' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'dnd-list',
      name: 'DndListDemo',
      meta: { title: 'Dnd List' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'drag-kanban',
      name: 'DragKanbanDemo',
      meta: { title: 'Drag Kanban' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
  ],
}
const componentsRouter1 = {
  path: '/components1',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo1',
  meta: {
    title: 'Components1',
    elIcon: 'Compass',
  },
  children: [
    {
      path: 'tinymce1',
      name: 'TinymceDemo1',
      meta: { title: 'Tinymce1', elIcon: 'AlarmClock' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
  ],
}
const routes: TRouteRowArray = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        name: 'Dashboard',
        meta: { title: '首页', elIcon: 'Edit', affix: true },
      },
    ],
  },
  componentsRouter,
  componentsRouter1,
  // {
  //   name: '404',
  //   path: '/:w+',
  //   hidden: true,
  //   component: () => import('@/pages/notFound/index.vue'),
  // },
]
export default routes
