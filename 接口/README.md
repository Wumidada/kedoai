# 接口文档

## 接口实现情况

### 已实现的接口

1. **Auth 模块**
   - `/Auth/Logout` - 用户登出
   - `/Auth/RefreshToken` - 刷新Token

2. **User 模块**
   - `/User/UpdateUserInfo` - 更新用户信息
   - `/User/ChangePassword` - 修改密码
   - `/User/UploadAvatar` - 上传头像

3. **Skill 模块**
   - `/Skill/BrowseSkills` - 浏览技能
   - `/Skill/MySkills` - 我的技能
   - `/Skill/InstallSkill` - 安装技能
   - `/Skill/UninstallSkill` - 卸载技能
   - `/Skill/PurchaseSkill` - 购买技能
   - `/Skill/PurchaseHistory` - 购买历史
   - `/Skill/CreateSkill` - 创建技能
   - `/Skill/EditSkill` - 编辑技能
   - `/Skill/RemoveSkill` - 删除技能
   - `/Skill/VerifySkill` - 验证技能

4. **Product 模块**
   - `/Product/ProductDetail` - 产品详情
   - `/Product/ProductConfiguration` - 产品配置

5. **Merchant 模块**
   - `/Merchant/Login` - 商家登录
   - `/Merchant/Logout` - 商家登出
   - `/Merchant/GetOrders` - 获取订单列表
   - `/Merchant/UpdateOrderStatus` - 更新订单状态
   - `/Merchant/SalesStatistics` - 销售统计

6. **Logistics 模块**
   - `/Logistics/UpdateShipping` - 更新物流信息
   - `/Logistics/Tracking` - 物流跟踪

7. **System 模块**
   - `/System/SystemInfo` - 系统信息
   - `/System/VersionInfo` - 版本信息

8. **Notification 模块**
   - `/Notification/GetNotifications` - 获取通知
   - `/Notification/MarkAsRead` - 标记已读

9. **Feedback 模块**
   - `/Feedback/SubmitFeedback` - 提交反馈

10. **FlowCenter 模块**
    - `/FlowCenter/ExportFlow` - 导出流程
    - `/FlowCenter/ImportFlow` - 导入流程
    - `/FlowCenter/AddMemberToTeam` - 添加成员到团队
    - `/FlowCenter/CreateFileGroup` - 创建文件组
    - `/FlowCenter/CreateTeam` - 创建团队
    - `/FlowCenter/ModifyTeam` - 修改团队
    - `/FlowCenter/RemoveFileGroup` - 删除文件组
    - `/FlowCenter/RemoveMemberFromTeam` - 从团队中移除成员
    - `/FlowCenter/RemoveTeam` - 删除团队
    - `/FlowCenter/RenameFileGroup` - 重命名文件组
    - `/FlowCenter/SetTeamAvatar` - 设置团队头像
    - `/FlowCenter/SubmitFlow` - 提交流程
    - `/FlowCenter/UpdateMemberRole` - 更新成员角色

11. **Payment 模块**
    - `/Payment/Refund` - 申请退款
    - `/Payment/PaymentCallback` - 支付回调
    - `/Payment/QueryPaymentStatus` - 支付状态查询

12. **Order 模块**
    - `/Order/QueryOrderList` - 查询订单列表
    - `/Order/QueryOrderDetail` - 查询订单详情
    - `/Order/CreateOrder` - 创建订单
    - `/Order/GetOrders` - 获取所有订单
    - `/Order/GetOrderById` - 获取单个订单
    - `/Order/UpdateOrderStatus` - 更新订单状态
    - `/Order/CancelOrder` - 取消订单

13. **Scenario 模块**
    - `/Scenario/QueryAgentList` - 查询智能体列表
    - `/Scenario/GetAgentDetail` - 获取智能体详情
    - `/Scenario/CreateAgent` - 创建智能体
    - `/Scenario/UpdateAgent` - 更新智能体
    - `/Scenario/DeleteAgent` - 删除智能体
    - `/Scenario/ExecuteAgent` - 执行智能体
    - `/Scenario/QueryAgentExecutionStatus` - 查询智能体执行状态
    - `/Scenario/QueryAgentExecutionHistory` - 查询智能体执行历史
    - `/Scenario/StopAgentExecution` - 停止智能体执行
    - `/Scenario/GetAgentExecutionResult` - 获取智能体执行结果

## 接口详细信息

### Auth 模块

#### `/Auth/Logout` - 用户登出
- **方法**: POST
- **参数**: 无
- **返回**: 登出结果

#### `/Auth/RefreshToken` - 刷新Token
- **方法**: POST
- **参数**: 
  - `refreshToken` (string): 刷新令牌
- **返回**: 新的访问令牌和刷新令牌

### User 模块

#### `/User/UpdateUserInfo` - 更新用户信息
- **方法**: POST
- **参数**: 
  - `f_UserName` (string): 用户名
  - `f_UserEmail` (string): 邮箱
  - `f_UserPhone` (string): 手机号
- **返回**: 更新结果

#### `/User/ChangePassword` - 修改密码
- **方法**: POST
- **参数**: 
  - `oldPassword` (string): 旧密码
  - `newPassword` (string): 新密码
- **返回**: 修改结果

#### `/User/UploadAvatar` - 上传头像
- **方法**: POST
- **参数**: 
  - `avatar` (file): 头像文件
- **返回**: 上传结果和头像URL

### Skill 模块

#### `/Skill/BrowseSkills` - 浏览技能
- **方法**: GET
- **参数**: 
  - `pageIndex` (int): 页码
  - `pageSize` (int): 每页数量
  - `category` (string): 分类
  - `keyword` (string): 关键词
- **返回**: 技能列表

#### `/Skill/MySkills` - 我的技能
- **方法**: GET
- **参数**: 
  - `userId` (string): 用户ID
  - `pageIndex` (int): 页码
  - `pageSize` (int): 每页数量
- **返回**: 用户的技能列表

#### `/Skill/InstallSkill` - 安装技能
- **方法**: POST
- **参数**: 
  - `skillId` (string): 技能ID
  - `userId` (string): 用户ID
- **返回**: 安装结果

#### `/Skill/UninstallSkill` - 卸载技能
- **方法**: POST
- **参数**: 
  - `skillId` (string): 技能ID
  - `userId` (string): 用户ID
- **返回**: 卸载结果

#### `/Skill/PurchaseSkill` - 购买技能
- **方法**: POST
- **参数**: 
  - `skillId` (string): 技能ID
  - `userId` (string): 用户ID
  - `paymentMethod` (string): 支付方式
- **返回**: 购买结果

#### `/Skill/PurchaseHistory` - 购买历史
- **方法**: GET
- **参数**: 
  - `userId` (string): 用户ID
  - `pageIndex` (int): 页码
  - `pageSize` (int): 每页数量
- **返回**: 购买历史列表

#### `/Skill/CreateSkill` - 创建技能
- **方法**: POST
- **参数**: 
  - `name` (string): 技能名称
  - `description` (string): 技能描述
  - `category` (string): 技能分类
  - `price` (decimal): 技能价格
  - `creatorId` (string): 创建者ID
- **返回**: 创建结果

#### `/Skill/EditSkill` - 编辑技能
- **方法**: POST
- **参数**: 
  - `skillId` (string): 技能ID
  - `name` (string): 技能名称
  - `description` (string): 技能描述
  - `category` (string): 技能分类
  - `price` (decimal): 技能价格
- **返回**: 编辑结果

#### `/Skill/RemoveSkill` - 删除技能
- **方法**: POST
- **参数**: 
  - `skillId` (string): 技能ID
  - `userId` (string): 用户ID
- **返回**: 删除结果

#### `/Skill/VerifySkill` - 验证技能
- **方法**: POST
- **参数**: 
  - `skillId` (string): 技能ID
  - `verificationCode` (string): 验证码
- **返回**: 验证结果

### Product 模块

#### `/Product/ProductDetail` - 产品详情
- **方法**: GET
- **参数**: 
  - `productId` (string): 产品ID
- **返回**: 产品详情

#### `/Product/ProductConfiguration` - 产品配置
- **方法**: GET
- **参数**: 
  - `productId` (string): 产品ID
- **返回**: 产品配置

### Merchant 模块

#### `/Merchant/Login` - 商家登录
- **方法**: POST
- **参数**: 
  - `username` (string): 用户名
  - `password` (string): 密码
- **返回**: 登录结果和令牌

#### `/Merchant/Logout` - 商家登出
- **方法**: POST
- **参数**: 无
- **返回**: 登出结果

#### `/Merchant/GetOrders` - 获取订单列表
- **方法**: GET
- **参数**: 
  - `pageIndex` (int): 页码
  - `pageSize` (int): 每页数量
  - `status` (string): 订单状态
- **返回**: 订单列表

#### `/Merchant/UpdateOrderStatus` - 更新订单状态
- **方法**: POST
- **参数**: 
  - `orderId` (string): 订单ID
  - `status` (string): 订单状态
- **返回**: 更新结果

#### `/Merchant/SalesStatistics` - 销售统计
- **方法**: GET
- **参数**: 
  - `startDate` (string): 开始日期
  - `endDate` (string): 结束日期
- **返回**: 销售统计数据

### Logistics 模块

#### `/Logistics/UpdateShipping` - 更新物流信息
- **方法**: POST
- **参数**: 
  - `orderId` (string): 订单ID
  - `shippingCompany` (string): 快递公司
  - `trackingNumber` (string): 物流单号
- **返回**: 更新结果

#### `/Logistics/Tracking` - 物流跟踪
- **方法**: GET
- **参数**: 
  - `trackingNumber` (string): 物流单号
- **返回**: 物流跟踪信息

### System 模块

#### `/System/SystemInfo` - 系统信息
- **方法**: GET
- **参数**: 无
- **返回**: 系统信息

#### `/System/VersionInfo` - 版本信息
- **方法**: GET
- **参数**: 无
- **返回**: 版本信息

### Notification 模块

#### `/Notification/GetNotifications` - 获取通知
- **方法**: GET
- **参数**: 
  - `userId` (string): 用户ID
  - `pageIndex` (int): 页码
  - `pageSize` (int): 每页数量
- **返回**: 通知列表

#### `/Notification/MarkAsRead` - 标记已读
- **方法**: POST
- **参数**: 
  - `notificationId` (string): 通知ID
- **返回**: 标记结果

### Feedback 模块

#### `/Feedback/SubmitFeedback` - 提交反馈
- **方法**: POST
- **参数**: 
  - `userId` (string): 用户ID
  - `content` (string): 反馈内容
  - `type` (string): 反馈类型
  - `contact` (string): 联系方式
- **返回**: 提交结果

### FlowCenter 模块

#### `/FlowCenter/ExportFlow` - 导出流程
- **方法**: GET
- **参数**: 
  - `flowId` (string): 流程ID
- **返回**: 导出的流程文件

#### `/FlowCenter/ImportFlow` - 导入流程
- **方法**: POST
- **参数**: 
  - `flowFile` (file): 流程文件
  - `userId` (string): 用户ID
- **返回**: 导入结果

#### `/FlowCenter/AddMemberToTeam` - 添加成员到团队
- **方法**: POST
- **参数**: 
  - `f_TeamId` (string): 团队ID
  - `f_MemberId` (string): 成员ID
  - `f_RoleId` (string): 角色ID
- **返回**: 添加结果

#### `/FlowCenter/CreateFileGroup` - 创建文件组
- **方法**: POST
- **参数**: 
  - `f_TeamId` (string): 团队ID
  - `f_GroupName` (string): 文件组名称
  - `f_CreatorId` (string): 创建者ID
- **返回**: 创建结果

#### `/FlowCenter/CreateTeam` - 创建团队
- **方法**: POST
- **参数**: 
  - `f_TeamName` (string): 团队名称
  - `f_CreatorId` (string): 创建者ID
  - `f_Description` (string): 团队描述
- **返回**: 创建结果

#### `/FlowCenter/ModifyTeam` - 修改团队
- **方法**: POST
- **参数**: 
  - `f_TeamId` (string): 团队ID
  - `f_TeamName` (string): 团队名称
  - `f_Description` (string): 团队描述
- **返回**: 修改结果

#### `/FlowCenter/RemoveFileGroup` - 删除文件组
- **方法**: POST
- **参数**: 
  - `f_FileGroupId` (string): 文件组ID
  - `f_TeamId` (string): 团队ID
- **返回**: 删除结果

#### `/FlowCenter/RemoveMemberFromTeam` - 从团队中移除成员
- **方法**: POST
- **参数**: 
  - `f_TeamId` (string): 团队ID
  - `f_MemberId` (string): 成员ID
- **返回**: 移除结果

#### `/FlowCenter/RemoveTeam` - 删除团队
- **方法**: POST
- **参数**: 
  - `f_TeamId` (string): 团队ID
  - `f_UserId` (string): 用户ID
- **返回**: 删除结果

#### `/FlowCenter/RenameFileGroup` - 重命名文件组
- **方法**: POST
- **参数**: 
  - `f_FileGroupId` (string): 文件组ID
  - `f_NewName` (string): 新名称
  - `f_TeamId` (string): 团队ID
- **返回**: 重命名结果

#### `/FlowCenter/SetTeamAvatar` - 设置团队头像
- **方法**: POST
- **参数**: 
  - `f_TeamId` (string): 团队ID
  - `f_Avatar` (file): 头像文件
- **返回**: 设置结果

#### `/FlowCenter/SubmitFlow` - 提交流程
- **方法**: POST
- **参数**: 
  - `f_FlowName` (string): 流程名称
  - `f_Description` (string): 流程描述
  - `f_CreatorId` (string): 创建者ID
  - `f_TeamId` (string): 团队ID
  - `f_FileGroupId` (string): 文件组ID
- **返回**: 提交结果

#### `/FlowCenter/UpdateMemberRole` - 更新成员角色
- **方法**: POST
- **参数**: 
  - `f_TeamId` (string): 团队ID
  - `f_MemberId` (string): 成员ID
  - `f_RoleId` (string): 角色ID
- **返回**: 更新结果

### Payment 模块

#### `/Payment/Refund` - 申请退款
- **方法**: POST
- **参数**: 
  - `orderId` (string): 订单ID
  - `amount` (decimal): 退款金额
  - `reason` (string): 退款原因
- **返回**: 退款结果

#### `/Payment/PaymentCallback` - 支付回调
- **方法**: POST
- **参数**: 支付平台回调数据
- **返回**: 回调处理结果

#### `/Payment/QueryPaymentStatus` - 支付状态查询
- **方法**: GET
- **参数**: 
  - `orderId` (string): 订单ID
- **返回**: 支付状态

### Order 模块

#### `/Order/QueryOrderList` - 查询订单列表
- **方法**: GET
- **参数**: 
  - `userId` (string): 用户ID
  - `pageIndex` (int): 页码
  - `pageSize` (int): 每页数量
  - `status` (string): 订单状态
- **返回**: 订单列表

#### `/Order/QueryOrderDetail` - 查询订单详情
- **方法**: GET
- **参数**: 
  - `orderId` (string): 订单ID
- **返回**: 订单详情

#### `/Order/CreateOrder` - 创建订单
- **方法**: POST
- **参数**: 
  - `items` (array): 订单商品
  - `subtotal` (decimal): 商品总价
  - `shippingFee` (decimal): 运费
  - `total` (decimal): 订单总价
  - `customerInfo` (object): 客户信息
- **返回**: 创建结果

#### `/Order/GetOrders` - 获取所有订单
- **方法**: GET
- **参数**: 无
- **返回**: 订单列表

#### `/Order/GetOrderById` - 获取单个订单
- **方法**: GET
- **参数**: 
  - `orderId` (string): 订单ID
- **返回**: 订单详情

#### `/Order/UpdateOrderStatus` - 更新订单状态
- **方法**: PATCH
- **参数**: 
  - `status` (string): 订单状态
- **返回**: 更新结果

#### `/Order/CancelOrder` - 取消订单
- **方法**: PATCH
- **参数**: 无
- **返回**: 取消结果

### Scenario 模块

#### `/Scenario/QueryAgentList` - 查询智能体列表
- **方法**: GET
- **参数**: 
  - `userId` (string): 用户ID
  - `pageIndex` (int): 页码
  - `pageSize` (int): 每页数量
- **返回**: 智能体列表

#### `/Scenario/GetAgentDetail` - 获取智能体详情
- **方法**: GET
- **参数**: 
  - `agentId` (string): 智能体ID
- **返回**: 智能体详情

#### `/Scenario/CreateAgent` - 创建智能体
- **方法**: POST
- **参数**: 
  - `name` (string): 智能体名称
  - `description` (string): 智能体描述
  - `type` (string): 智能体类型
  - `config` (object): 智能体配置
  - `userId` (string): 用户ID
- **返回**: 创建结果

#### `/Scenario/UpdateAgent` - 更新智能体
- **方法**: POST
- **参数**: 
  - `agentId` (string): 智能体ID
  - `name` (string): 智能体名称
  - `description` (string): 智能体描述
  - `config` (object): 智能体配置
- **返回**: 更新结果

#### `/Scenario/DeleteAgent` - 删除智能体
- **方法**: POST
- **参数**: 
  - `agentId` (string): 智能体ID
  - `userId` (string): 用户ID
- **返回**: 删除结果

#### `/Scenario/ExecuteAgent` - 执行智能体
- **方法**: POST
- **参数**: 
  - `agentId` (string): 智能体ID
  - `input` (string): 输入数据
  - `userId` (string): 用户ID
- **返回**: 执行结果

#### `/Scenario/QueryAgentExecutionStatus` - 查询智能体执行状态
- **方法**: GET
- **参数**: 
  - `executionId` (string): 执行ID
- **返回**: 执行状态

#### `/Scenario/QueryAgentExecutionHistory` - 查询智能体执行历史
- **方法**: GET
- **参数**: 
  - `agentId` (string): 智能体ID
  - `userId` (string): 用户ID
  - `pageIndex` (int): 页码
  - `pageSize` (int): 每页数量
- **返回**: 执行历史

#### `/Scenario/StopAgentExecution` - 停止智能体执行
- **方法**: POST
- **参数**: 
  - `executionId` (string): 执行ID
- **返回**: 停止结果

#### `/Scenario/GetAgentExecutionResult` - 获取智能体执行结果
- **方法**: GET
- **参数**: 
  - `executionId` (string): 执行ID
- **返回**: 执行结果

## 接口使用说明

1. 所有接口均使用 Furion 框架的 DynamicApiController 特性，自动生成 API 路由
2. 接口参数通过 DTO 类定义，包含输入参数和返回参数
3. 接口实现使用了依赖注入模式，通过服务接口和服务实现分离
4. 接口返回格式统一，包含成功状态、数据和错误信息
5. 接口调用需要在请求头中携带 Token 进行身份验证

## 注意事项

1. 所有接口均已实现，后端开发人员可以直接使用
2. 接口实现严格参考了 Order 文件夹的格式
3. 接口文档会根据项目需求进行更新