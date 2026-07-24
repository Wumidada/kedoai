export function awaitWrapper(promise) {
  return promise.then((res) => [null, res])
      .catch((err) => [err, null])
}

// 从各个模块显式导出，避免冲突
export * from './flowcenter'
export * from './user'
export * from './auth'
export * from './board'
export * from './download'

// 从pay模块导出，避免与order模块的createOrder冲突
export { queryProductServices, getTokenPrice, doPayment, getWeChatPayQRCode, checkOrderPaymentStatus, getUserTokenBalance } from './pay'

// 从order模块导出，避免与pay模块的createOrder冲突
export { getOrders, getOrder, updateOrderStatus, cancelOrder } from './order'

// 为order模块的createOrder添加别名
export { createOrder as createOrderFromOrder } from './order'

// 为pay模块的createOrder添加别名
export { createOrder as createOrderFromPay } from './pay'

