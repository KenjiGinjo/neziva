# AI Agent 工作流平台 - MVP 开发计划

## 📋 项目概述

**项目名称**：AI Workflow Builder（暂定）  
**开发阶段**：MVP（最小可行产品）  
**开发周期**：4-6 周  
**目标**：快速验证市场需求，获取第一批用户

---

## 🎯 MVP 核心目标

1. **验证核心价值**：用户能否通过拖拽方式创建 AI 工作流
2. **验证技术可行性**：工作流执行引擎是否稳定
3. **验证商业模式**：用户是否愿意付费使用
4. **获取早期反馈**：收集用户需求，指导后续迭代

---

---

## 📦 核心模块

### 1. 用户认证模块
- 用户注册/登录
- 邮箱验证
- 密码重置
- OAuth 登录（GitHub、Google，可选）

### 2. 工作流编辑器模块
- 可视化编辑器（拖拽式）
- 节点库（触发器、AI 节点、动作节点）
- 工作流保存/加载
- 工作流测试运行

### 3. 工作流执行引擎模块
- 工作流调度器
- 任务队列管理
- AI API 调用
- 错误处理和重试

### 4. 用户管理模块
- 用户信息管理
- 订阅管理
- 使用量统计
- 账单管理

### 5. 支付模块
- Paddle 集成
- 订阅管理
- 发票生成

### 6. 管理员模块
- 用户管理
- 工作流监控
- 系统统计
- 日志查看

---

## 👤 用户端功能

### 页面列表

#### 1. 首页 (Landing Page)
**路径**：`/`

**功能**：
- 产品介绍
- 核心功能展示
- 使用案例
- 定价信息
- CTA 按钮（注册/登录）

**组件**：
- Hero Section
- Features Section
- Use Cases Section
- Pricing Section
- Footer

---

#### 2. 注册/登录页面
**路径**：`/auth/signup`, `/auth/login`

**功能**：
- 邮箱注册
- 密码登录
- 邮箱验证
- 忘记密码
- OAuth 登录（可选）

**表单字段**：
- 邮箱
- 密码
- 确认密码（注册时）
- 同意服务条款

---

#### 3. 工作流列表页面（Dashboard）
**路径**：`/dashboard`

**功能**：
- 显示所有工作流
- 创建工作流
- 搜索/筛选工作流
- 工作流状态（运行中/已停止/错误）
- 快速操作（运行/停止/删除/复制）

**组件**：
- 工作流卡片列表
- 创建按钮
- 搜索框
- 筛选器（按状态、标签）
- 使用量统计卡片

---

#### 4. 工作流编辑器页面
**路径**：`/workflow/:id/edit`

**功能**：
- 可视化编辑器（拖拽式）
- 节点库（左侧面板）
- 画布（中间区域）
- 节点配置（右侧面板）
- 保存/运行/停止工作流
- 工作流测试

**核心组件**：
- **节点库面板**：
  - 触发器节点
    - 定时触发器（Cron）
    - Webhook 触发器
    - 手动触发
  - AI 节点
    - 文本生成
    - 文本分析
    - 代码生成
    - 数据分析
  - 动作节点
    - 发送邮件
    - 保存文件
    - HTTP 请求
    - 数据转换

- **画布区域**：
  - React Flow 画布
  - 节点拖拽
  - 节点连接
  - 节点删除
  - 缩放/平移

- **配置面板**：
  - 节点参数配置
  - AI 模型选择
  - Prompt 输入
  - 变量绑定

**交互流程**：
1. 从节点库拖拽节点到画布
2. 连接节点（形成工作流）
3. 点击节点，在右侧配置参数
4. 保存工作流
5. 点击"运行"测试工作流

---

#### 5. 工作流详情页面
**路径**：`/workflow/:id`

**功能**：
- 工作流基本信息
- 执行历史
- 执行日志
- 统计数据（执行次数、成功率、平均耗时）
- 编辑/删除/复制工作流

**组件**：
- 工作流信息卡片
- 执行历史表格
- 日志查看器
- 统计图表

---

#### 6. 执行日志页面
**路径**：`/workflow/:id/logs`

**功能**：
- 显示工作流执行日志
- 实时日志流（WebSocket）
- 日志筛选（按时间、状态）
- 错误详情查看

---

#### 7. 模板市场页面（可选，MVP 简化版）
**路径**：`/templates`

**功能**：
- 显示预置工作流模板
- 模板分类
- 一键使用模板
- 模板预览

**预置模板**（MVP 阶段 5 个）：
1. **内容生成工作流**：定时生成博客文章
2. **数据分析工作流**：分析 CSV 数据并生成报告
3. **代码文档生成**：根据代码生成文档
4. **邮件自动回复**：AI 分析邮件并自动回复
5. **社交媒体内容生成**：批量生成社交媒体内容

---

#### 8. 账户设置页面
**路径**：`/settings`

**功能**：
- 个人信息编辑
- 密码修改
- API 密钥管理
- 通知设置
- 账户删除

**子页面**：
- `/settings/profile` - 个人信息
- `/settings/security` - 安全设置
- `/settings/api-keys` - API 密钥
- `/settings/notifications` - 通知设置

---

#### 9. 订阅/账单页面
**路径**：`/billing`

**功能**：
- 当前订阅计划显示
- 升级/降级订阅
- 使用量统计
- 账单历史
- 发票下载

**组件**：
- 订阅计划卡片
- 使用量进度条
- 账单列表
- 支付按钮（Paddle 集成）

---

#### 10. 帮助/文档页面
**路径**：`/docs`, `/help`

**功能**：
- 使用教程
- API 文档
- 常见问题
- 联系支持

---

### 用户端功能清单

#### 核心功能（必须）
- [x] 用户注册/登录
- [x] 创建工作流
- [x] 编辑工作流（可视化编辑器）
- [x] 运行工作流
- [x] 停止工作流
- [x] 查看执行日志
- [x] 订阅管理
- [x] 使用量统计

#### 重要功能（应该包含）
- [ ] 工作流模板
- [ ] 工作流复制
- [ ] 工作流分享（可选）
- [ ] 执行历史
- [ ] 错误通知（邮件）

#### 可选功能（MVP 可暂缓）
- [ ] 团队协作
- [ ] 工作流版本控制
- [ ] 工作流导入/导出
- [ ] 自定义节点
- [ ] API 访问

---

## 🔧 管理员端功能

### 页面列表

#### 1. 管理员登录页面
**路径**：`/admin/login`

**功能**：
- 管理员专用登录
- 双因素认证（可选）

---

#### 2. 管理员 Dashboard
**路径**：`/admin`

**功能**：
- 系统概览统计
- 用户增长趋势
- 工作流执行统计
- 收入统计
- 系统健康状态

**统计指标**：
- 总用户数
- 活跃用户数
- 总工作流数
- 今日执行次数
- 今日收入
- API 调用量
- 错误率

---

#### 3. 用户管理页面
**路径**：`/admin/users`

**功能**：
- 用户列表（表格）
- 用户搜索/筛选
- 用户详情查看
- 用户状态管理（激活/禁用）
- 用户订阅管理
- 用户使用量查看

**操作**：
- 查看用户详情
- 编辑用户信息
- 禁用/启用用户
- 查看用户工作流
- 查看用户账单

---

#### 4. 工作流管理页面
**路径**：`/admin/workflows`

**功能**：
- 所有用户的工作流列表
- 工作流搜索/筛选
- 工作流详情查看
- 工作流状态监控
- 批量操作（停止/删除）

---

#### 5. 执行监控页面
**路径**：`/admin/executions`

**功能**：
- 实时执行监控
- 执行队列状态
- 失败执行查看
- 执行性能分析
- 错误日志查看

---

#### 6. 系统设置页面
**路径**：`/admin/settings`

**功能**：
- AI API 配置
- 系统参数设置
- 邮件模板管理
- 功能开关
- 维护模式

**设置项**：
- OpenAI API 密钥
- Claude API 密钥
- Gemini API 密钥
- 邮件服务配置
- 支付配置
- 功能开关（新功能灰度发布）

---

#### 7. 日志查看页面
**路径**：`/admin/logs`

**功能**：
- 系统日志查看
- 错误日志筛选
- 日志搜索
- 日志导出

---

#### 8. 财务统计页面
**路径**：`/admin/finance`

**功能**：
- 收入统计
- 订阅统计
- 用户付费分析
- 收入趋势图

---

### 管理员端功能清单

#### 核心功能（必须）
- [x] 用户管理
- [x] 工作流监控
- [x] 系统统计
- [x] 日志查看
- [x] 系统设置

#### 重要功能（应该包含）
- [ ] 执行监控
- [ ] 错误告警
- [ ] 数据导出
- [ ] 系统健康检查

#### 可选功能（MVP 可暂缓）
- [ ] 用户行为分析
- [ ] A/B 测试管理
- [ ] 自动化运维
- [ ] 多租户管理

---

## 🗄️ 数据库设计

### 核心表结构

#### 1. users（用户表）
```sql
- id (UUID, PK)
- email (String, Unique)
- password_hash (String)
- name (String)
- avatar_url (String, Optional)
- subscription_plan (Enum: free, starter, pro, business)
- subscription_status (Enum: active, canceled, expired)
- subscription_started_at (Timestamp)
- subscription_ends_at (Timestamp)
- api_calls_used (Integer)
- api_calls_limit (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)
```

#### 2. workflows（工作流表）
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users.id)
- name (String)
- description (String, Optional)
- workflow_data (JSON) -- 工作流节点和连接数据
- status (Enum: draft, active, paused, error)
- last_executed_at (Timestamp, Optional)
- execution_count (Integer)
- success_count (Integer)
- error_count (Integer)
- created_at (Timestamp)
- updated_at (Timestamp)
```

#### 3. workflow_executions（工作流执行记录表）
```sql
- id (UUID, PK)
- workflow_id (UUID, FK -> workflows.id)
- user_id (UUID, FK -> users.id)
- status (Enum: pending, running, completed, failed, canceled)
- started_at (Timestamp)
- completed_at (Timestamp, Optional)
- duration_ms (Integer, Optional)
- input_data (JSON, Optional)
- output_data (JSON, Optional)
- error_message (Text, Optional)
- logs (Text, Optional)
- created_at (Timestamp)
```

#### 4. subscriptions（订阅表）
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users.id)
- paddle_subscription_id (String, Unique)
- plan (Enum: starter, pro, business)
- status (Enum: active, canceled, past_due)
- current_period_start (Timestamp)
- current_period_end (Timestamp)
- cancel_at_period_end (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)
```

#### 5. api_calls（API 调用记录表）
```sql
- id (UUID, PK)
- user_id (UUID, FK -> users.id)
- workflow_id (UUID, FK -> workflows.id, Optional)
- execution_id (UUID, FK -> workflow_executions.id, Optional)
- provider (Enum: openai, anthropic, google)
- model (String)
- prompt_tokens (Integer)
- completion_tokens (Integer)
- cost_usd (Decimal)
- status (Enum: success, error)
- error_message (Text, Optional)
- created_at (Timestamp)
```

#### 6. system_logs（系统日志表）
```sql
- id (UUID, PK)
- level (Enum: info, warning, error)
- message (Text)
- context (JSON, Optional)
- user_id (UUID, FK -> users.id, Optional)
- workflow_id (UUID, FK -> workflows.id, Optional)
- created_at (Timestamp)
```

---

## 🔌 API 设计

### 用户端 API

#### 认证相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `POST /api/auth/verify-email` - 邮箱验证
- `POST /api/auth/forgot-password` - 忘记密码
- `POST /api/auth/reset-password` - 重置密码

#### 工作流相关
- `GET /api/workflows` - 获取工作流列表
- `POST /api/workflows` - 创建工作流
- `GET /api/workflows/:id` - 获取工作流详情
- `PUT /api/workflows/:id` - 更新工作流
- `DELETE /api/workflows/:id` - 删除工作流
- `POST /api/workflows/:id/run` - 运行工作流
- `POST /api/workflows/:id/stop` - 停止工作流
- `POST /api/workflows/:id/duplicate` - 复制工作流

#### 执行相关
- `GET /api/workflows/:id/executions` - 获取执行历史
- `GET /api/executions/:id` - 获取执行详情
- `GET /api/executions/:id/logs` - 获取执行日志

#### 用户相关
- `GET /api/user/profile` - 获取用户信息
- `PUT /api/user/profile` - 更新用户信息
- `PUT /api/user/password` - 修改密码

#### 订阅相关
- `GET /api/billing/subscription` - 获取订阅信息
- `POST /api/billing/subscribe` - 创建订阅
- `POST /api/billing/cancel` - 取消订阅
- `GET /api/billing/usage` - 获取使用量
- `GET /api/billing/invoices` - 获取账单历史

#### Webhook（Paddle）
- `POST /api/webhooks/paddle` - Paddle 支付回调

---

### 管理员端 API

#### 统计相关
- `GET /api/admin/stats` - 获取系统统计
- `GET /api/admin/users/stats` - 获取用户统计
- `GET /api/admin/workflows/stats` - 获取工作流统计

#### 用户管理
- `GET /api/admin/users` - 获取用户列表
- `GET /api/admin/users/:id` - 获取用户详情
- `PUT /api/admin/users/:id` - 更新用户信息
- `DELETE /api/admin/users/:id` - 删除用户

#### 工作流管理
- `GET /api/admin/workflows` - 获取所有工作流
- `GET /api/admin/workflows/:id` - 获取工作流详情

#### 系统管理
- `GET /api/admin/logs` - 获取系统日志
- `GET /api/admin/settings` - 获取系统设置
- `PUT /api/admin/settings` - 更新系统设置

---

## 🚀 开发里程碑

### 第 1 周：基础架构
- [ ] 项目初始化（前后端）
- [ ] 数据库设计和创建
- [ ] 用户认证系统
- [ ] 基础 UI 组件库
- [ ] 部署环境搭建

### 第 2 周：核心功能
- [ ] 工作流编辑器（基础版）
- [ ] 节点库实现
- [ ] 工作流保存/加载
- [ ] 用户 Dashboard

### 第 3 周：执行引擎
- [ ] 工作流执行引擎
- [ ] AI API 集成（OpenAI, Claude）
- [ ] 任务队列系统
- [ ] 执行日志记录

### 第 4 周：支付和优化
- [ ] Paddle 支付集成
- [ ] 订阅管理
- [ ] 使用量统计
- [ ] 错误处理和通知

### 第 5 周：管理员端
- [ ] 管理员 Dashboard
- [ ] 用户管理
- [ ] 系统监控
- [ ] 日志查看

### 第 6 周：测试和发布
- [ ] 功能测试
- [ ] 性能优化
- [ ] Bug 修复
- [ ] 文档完善
- [ ] 发布准备

---

## 📝 开发注意事项

### 1. MVP 原则
- **不要过度设计**：先实现核心功能，后续迭代
- **快速验证**：尽快发布，获取用户反馈
- **保持简单**：避免复杂功能，专注核心价值

### 2. 技术决策
- **使用熟悉的技术栈**：减少学习成本
- **优先使用成熟库**：React Flow、Bull 等
- **保持代码简洁**：便于后续维护

### 3. 用户体验
- **界面简洁**：清晰的导航和操作流程
- **错误提示**：友好的错误信息
- **加载状态**：明确的加载和进度提示

### 4. 安全性
- **API 认证**：所有 API 需要认证
- **输入验证**：严格验证用户输入
- **SQL 注入防护**：使用参数化查询
- **XSS 防护**：转义用户输入

### 5. 性能优化
- **数据库索引**：关键字段建立索引
- **缓存策略**：使用 Redis 缓存
- **API 限流**：防止滥用
- **代码分割**：前端代码按需加载

---

## 🎯 成功标准

### MVP 发布标准
- [ ] 用户可以注册和登录
- [ ] 用户可以创建和编辑工作流
- [ ] 工作流可以成功执行
- [ ] 用户可以查看执行结果
- [ ] 用户可以订阅和付费
- [ ] 系统基本稳定，错误率 < 5%

### 用户获取目标
- **第 1 个月**：10 个注册用户，1-2 个付费用户
- **第 2 个月**：50 个注册用户，5-10 个付费用户
- **第 3 个月**：100+ 注册用户，15-20 个付费用户

---

## 📚 参考资源

### 技术文档
- [Next.js 文档](https://nextjs.org/docs)
- [React Flow 文档](https://reactflow.dev/)
- [Paddle 文档](https://developer.paddle.com/)
- [OpenAI API 文档](https://platform.openai.com/docs)

### 设计参考
- Zapier 工作流编辑器
- Make.com 界面设计
- n8n 开源工作流工具

---

*最后更新：2025年12月*  
*版本：MVP v1.0*
