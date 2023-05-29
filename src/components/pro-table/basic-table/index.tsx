const BasicTable = defineComponent({
  name: 'BasicTable',
  setup() {
    const prefixCls = 'pro-table-basic-table'
    return () => {
      return (
        <div class={prefixCls}>
          <h1>BasicTable</h1>
        </div>
      )
    }
  }
})

export default BasicTable
