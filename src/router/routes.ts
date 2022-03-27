import { BasicLayout as Layout, MainView } from '@/layouts'

import { DEFAULT_ROUTE } from '@/scripts/constant'
import { TRouteRow, TRouteRowArray } from '@/types'

const componentsRouter: TRouteRow = {
  path: '/components',
  component: Layout,
  redirect: '/components/tinymce',
  name: 'ComponentDemo',
  meta: {
    title: 'Components',
    elIcon: 'Compass',
  },
  children: [
    {
      path: 'tinymce',
      // name: 'TinymceDemo',
      redirect: '/components/tinymce/tinymce-2',
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
      meta: { title: 'Markdown' },
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
  redirect: '/components1/tinymce1',
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
    {
      path: 'tinymce2',
      name: 'TinymceDemo2',
      meta: { title: 'Tinymce2', elIcon: 'AlarmClock' },
      component: () => import('@/pages/dashboard/index.vue'),
    },
    {
      path: 'tinymce3/:id',
      component: () => import('@/pages/dashboard/index.vue'),
      name: 'TinymceDemo3',
      meta: {
        title: 'TinymceDemo3',
        elIcon: 'Edit',
        affix: true,
        activeMenu: '/components1/tinymce2',
      },
      hidden: true,
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
        component: () => import('@/pages/dashboard/index.vue'),
        ...DEFAULT_ROUTE,
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
