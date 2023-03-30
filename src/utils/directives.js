/**
 * 指令
 * 使用示例
    <template>
        <input v-focus />
    </template>
 */

// 设我们有一个全局的指令 focus，用于让输入框自动获取焦点。我们可以在 directives.js 文件中定义这个指令
export  const focus = {
    mounted(el) {
      el.focus()
    }
  }

export default {
  focus
}