# 微信扫码登录模块

一个简洁的 Vue 3 + TypeScript 微信扫码登录功能模块。

## 文件结构

```
login-module/
├── api/
│   └── auth.ts              # API接口（获取二维码、获取用户信息、微信登录）
├── utils/
│   └── request.ts           # Axios请求封装
├── hooks/
│   └── useStorage.ts       # localStorage存储工具
├── store/
│   └── user.ts             # 用户状态管理
├── components/
│   └── LoginLayout.vue     # 登录页面布局
├── views/
│   ├── WechatLogin.vue     # 微信扫码登录页面
│   └── BindPhoneNum.vue    # 绑定手机号页面（扫码后新用户需要绑定）
├── router/
│   └── login.ts            # 路由配置
└── README.md
```

## 快速使用

### 1. 安装依赖

```bash
npm install axios ant-design-vue pinia vue-router
```

### 2. 复制文件

将 `login-module` 文件夹复制到目标项目的 `src` 目录下。

### 3. 配置路由

```typescript
import { LoginRoutesConfig, LOGIN_WHITE_LIST } from './login-module/router/login'

// 在路由配置中添加
// router.addRoute(LoginRoutesConfig)

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('TOKEN')
  if (!isLoggedIn && !LOGIN_WHITE_LIST.includes(to.path)) {
    next('/login')
  } else {
    next()
  }
})
```

### 4. 配置环境变量

```env
VITE_APP_BASE_URL=http://your-api-server.com
```

### 5. 配置 Pinia

```typescript
import { createPinia } from 'pinia'
app.use(createPinia())
```

## API 接口

| 接口 | 方法 | 描述 |
|------|------|------|
| `/WeChat/GetQRCodeInfo` | GET | 获取微信二维码 |
| `/WeChat/GetUserInfoByTick` | GET | 轮询获取扫码状态和用户信息 |
| `/User/UserLoginByWechat` | POST | 微信登录 |
| `/User/GetVerificationCode` | GET | 获取验证码（绑定手机号用） |

## 登录流程

1. 页面加载时调用 `/WeChat/GetQRCodeInfo` 获取二维码
2. 每秒轮询 `/WeChat/GetUserInfoByTick` 检查扫码状态
3. 用户扫码后，后端返回用户信息，前端调用 `/User/UserLoginByWechat` 完成登录
4. 如果是新用户（未绑定手机号），跳转到绑定手机号页面
5. 绑定成功后跳转首页

## 注意事项

1. 后端需要配置微信OAuth接口
2. 确保跨域配置正确
3. 需要 Ant Design Vue 组件库