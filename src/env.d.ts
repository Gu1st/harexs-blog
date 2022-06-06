/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 引入naive对应的定义类型
import type { MessageApiInjection } from 'naive-ui/lib/message/src/MessageProvider'

declare global {
  interface Window {
    $message: MessageApiInjection
  }
}
