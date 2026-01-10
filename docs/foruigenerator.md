# UI 设计 Prompt - AI Workflow Builder

## 设计风格要求

**整体风格**：
- 现代、简洁、专业
- 深色模式支持（可选）
- 使用渐变和阴影营造层次感
- 蓝色/紫色主题色（科技感）
- 响应式设计（支持桌面、平板、手机）

**设计参考**：
- Zapier 的简洁风格
- Vercel 的现代感
- Linear 的精致细节

---

## 👤 用户端页面

### 1. 首页 (Landing Page)
**路径**: `/`

**Title**: AI Workflow Builder - Landing Page

**Description**: 
设计一个现代化的 SaaS 产品首页，包含以下部分：
- **Hero Section（顶部大横幅）**：
  - 左侧：大标题 "Automate Your Work with AI"，副标题 "Build powerful AI workflows without coding"，CTA 按钮 "Get Started Free" 和 "Watch Demo"
  - 右侧：产品界面预览图或动画（展示工作流编辑器）
  - 背景：渐变背景（蓝色到紫色）
  
- **Features Section（功能展示区）**：
  - 3-4 个功能卡片，每个包含图标、标题、描述
  - 功能：Visual Workflow Builder, AI Model Selection, Cost Optimization, Real-time Execution
  
- **Use Cases Section（使用案例）**：
  - 3 个案例卡片，展示不同场景
  - 案例：Content Creation, Data Analysis, Code Documentation
  
- **Pricing Section（定价）**：
  - 3 个定价卡片：Starter ($19/月), Pro ($49/月), Business ($149/月)
  - 每个卡片显示功能列表、CTA 按钮
  
- **Footer（页脚）**：
  - 链接：Product, Resources, Company, Legal
  - 社交媒体图标
  - 版权信息

**颜色方案**: 主色 #3B82F6 (蓝色), 渐变色 #6366F1 到 #8B5CF6

---

### 2. 注册/登录页面
**路径**: `/auth/signup`, `/auth/login`

**Title**: Authentication Pages - Sign Up & Login

**Description**:
设计一个简洁的认证页面，左右分栏布局：
- **左侧（60%）**：
  - 品牌 Logo
  - 大标题 "Welcome to AI Workflow Builder"
  - 副标题 "Start automating your work with AI"
  - 产品特性列表（3-4 个要点）
  - 背景：渐变或产品截图
  
- **右侧（40%）**：
  - 表单区域（白色卡片，带阴影）
  - 标题：Sign Up / Sign In
  - 表单字段：
    - Email 输入框（带图标）
    - Password 输入框（带显示/隐藏按钮）
    - Confirm Password（注册时显示）
    - "I agree to Terms" 复选框（注册时显示）
  - 提交按钮（主色，全宽）
  - "Forgot Password?" 链接（登录页）
  - 分隔线 "Or continue with"
  - OAuth 按钮（GitHub, Google，可选）
  - 底部链接："Already have an account? Sign in" / "Don't have an account? Sign up"

**颜色方案**: 白色卡片，主色按钮，灰色文字

---

### 3. 工作流列表页面 (Dashboard)
**路径**: `/dashboard`

**Title**: Dashboard - Workflow List Page

**Description**:
设计一个功能丰富的 Dashboard 页面：
- **顶部导航栏**：
  - Logo（左侧）
  - 导航菜单：Dashboard, Templates, Docs
  - 用户头像下拉菜单（右侧）
  - 使用量显示（API Calls: 1,234 / 10,000）
  
- **主要内容区**：
  - **顶部操作栏**：
    - 标题 "My Workflows"
    - "Create Workflow" 按钮（主色，带 + 图标）
    - 搜索框（带搜索图标）
    - 筛选按钮（Status: All, Active, Paused, Error）
    - 视图切换（Grid / List）
  
  - **统计卡片区**（3-4 个卡片）：
    - Total Workflows: 12
    - Active: 8
    - Executions Today: 156
    - Success Rate: 98%
    - 每个卡片有图标、数字、趋势箭头
  
  - **工作流列表**（卡片网格布局）：
    - 每个工作流卡片包含：
      - 工作流名称（可点击）
      - 描述（可选）
      - 状态徽章（Active/Paused/Error，不同颜色）
      - 最后执行时间
      - 执行次数
      - 快速操作按钮（运行、停止、编辑、删除、复制）
      - 悬停效果
  
  - **空状态**（无工作流时）：
    - 图标
    - 提示文字 "No workflows yet"
    - "Create Your First Workflow" 按钮

**颜色方案**: 白色背景，卡片带阴影，状态颜色：绿色(Active), 黄色(Paused), 红色(Error)

---

### 4. 工作流编辑器页面
**路径**: `/workflow/:id/edit`

**Title**: Workflow Editor - Visual Builder

**Description**:
设计一个三栏布局的工作流编辑器（类似 Zapier/Make.com）：
- **左侧面板（节点库，宽度 280px）**：
  - 搜索框（搜索节点）
  - 节点分类（可折叠）：
    - Triggers（触发器）
      - Schedule (Cron)
      - Webhook
      - Manual
    - AI Nodes（AI 节点）
      - Text Generation
      - Text Analysis
      - Code Generation
      - Data Analysis
    - Actions（动作）
      - Send Email
      - Save File
      - HTTP Request
      - Data Transform
  - 每个节点显示图标、名称，可拖拽
  
- **中间画布区域（主区域）**：
  - React Flow 画布（白色背景，带网格）
  - 顶部工具栏：
    - 工作流名称（可编辑）
    - 保存按钮
    - 运行按钮（绿色）
    - 停止按钮（红色）
    - 撤销/重做按钮
    - 缩放控制（+ / - / Fit）
  - 画布支持：
    - 节点拖拽
    - 节点连接（拖拽连接线）
    - 节点选择（点击高亮）
    - 节点删除（Delete 键）
    - 画布平移（拖拽空白区域）
    - 画布缩放（鼠标滚轮）
  - 节点样式：
    - 触发器：蓝色边框
    - AI 节点：紫色边框
    - 动作：绿色边框
    - 节点显示图标、名称、状态
  
- **右侧面板（配置面板，宽度 320px）**：
  - 当选中节点时显示：
    - 节点名称（可编辑）
    - 节点类型
    - 配置表单：
      - AI Model 选择（下拉框）
      - Prompt 输入（多行文本框）
      - 参数设置（根据节点类型不同）
      - 变量绑定
    - "Test Node" 按钮
    - "Delete Node" 按钮
  - 当未选中节点时显示：
    - 工作流信息
    - 工作流描述
    - 工作流设置

**颜色方案**: 深色侧边栏，白色画布，彩色节点边框

---

### 5. 工作流详情页面
**路径**: `/workflow/:id`

**Title**: Workflow Details Page

**Description**:
设计一个工作流详情页面，包含多个标签页：
- **顶部信息栏**：
  - 工作流名称（可编辑）
  - 状态徽章（Active/Paused/Error）
  - 操作按钮：Edit, Run, Stop, Duplicate, Delete
  - 面包屑导航
  
- **标签页导航**：
  - Overview（概览）
  - Executions（执行历史）
  - Logs（日志）
  - Settings（设置）
  
- **Overview 标签页**：
  - 工作流信息卡片：
    - 描述
    - 创建时间
    - 最后执行时间
    - 执行次数
    - 成功率
  - 统计图表（折线图）：
    - 执行次数趋势（7天/30天）
    - 成功率趋势
    - 平均执行时间
  
- **Executions 标签页**：
  - 筛选栏：时间范围、状态筛选
  - 执行历史表格：
    - 列：执行时间、状态、耗时、操作
    - 状态颜色：成功(绿色)、失败(红色)、运行中(蓝色)
    - 每行可点击查看详情
  
- **Logs 标签页**：
  - 日志查看器（代码编辑器风格）
  - 时间筛选
  - 日志级别筛选（Info, Warning, Error）
  - 实时刷新开关
  
- **Settings 标签页**：
  - 工作流设置表单
  - 通知设置
  - 危险操作区（删除工作流）

**颜色方案**: 白色背景，卡片布局，彩色状态徽章

---

### 6. 执行日志页面
**路径**: `/workflow/:id/logs`

**Title**: Execution Logs Page

**Description**:
设计一个日志查看页面：
- **顶部工具栏**：
  - 工作流名称（面包屑）
  - 执行 ID
  - 状态徽章
  - 时间信息
  - 操作按钮：Refresh, Download, Clear
  
- **筛选栏**：
  - 时间范围选择器
  - 日志级别筛选（All, Info, Warning, Error）
  - 搜索框
  
- **日志显示区**：
  - 终端风格（深色背景，等宽字体）
  - 每行日志包含：
    - 时间戳（灰色）
    - 日志级别（彩色标签）
    - 日志内容
  - 支持滚动
  - 自动滚动到底部（开关）
  - 行号显示（可选）
  
- **右侧面板（可选）**：
  - 日志统计
  - 错误摘要
  - 快速操作

**颜色方案**: 深色终端风格，彩色日志级别标签

---

### 7. 模板市场页面
**路径**: `/templates`

**Title**: Template Marketplace

**Description**:
设计一个模板市场页面：
- **顶部**：
  - 标题 "Workflow Templates"
  - 副标题 "Get started quickly with pre-built workflows"
  - 搜索框
  
- **分类导航**：
  - 标签：All, Content, Data, Code, Marketing, Other
  
- **模板网格**（3 列布局）：
  - 每个模板卡片包含：
    - 模板预览图（或图标）
    - 模板名称
    - 简短描述
    - 使用场景标签
    - "Use Template" 按钮
    - 悬停显示更多信息
  
- **模板详情模态框**（点击模板时）：
  - 模板大图
  - 详细描述
  - 使用步骤
  - "Use This Template" 按钮

**预置模板**：
1. Content Generation Workflow
2. Data Analysis Workflow
3. Code Documentation Generator
4. Email Auto-Reply
5. Social Media Content Generator

**颜色方案**: 白色背景，彩色模板卡片，悬停效果

---

### 8. 账户设置页面
**路径**: `/settings`

**Title**: Account Settings Page

**Description**:
设计一个设置页面，左侧导航 + 右侧内容：
- **左侧导航栏（宽度 240px）**：
  - Profile（个人信息）
  - Security（安全）
  - API Keys（API 密钥）
  - Notifications（通知）
  - Danger Zone（危险操作）
  - 每个菜单项有图标
  
- **右侧内容区**：
  
  **Profile 标签页**：
  - 头像上传（圆形，带编辑图标）
  - 表单字段：
    - Name
    - Email
    - Bio（可选）
  - "Save Changes" 按钮
  
  **Security 标签页**：
  - Change Password 表单
  - Two-Factor Authentication 开关
  - Active Sessions 列表
  - "Logout All Devices" 按钮
  
  **API Keys 标签页**：
  - API Key 列表（表格）
  - "Create New API Key" 按钮
  - 每个 Key 显示：名称、创建时间、最后使用、操作（复制、删除）
  
  **Notifications 标签页**：
  - 通知设置开关：
    - Email notifications
    - Workflow execution alerts
    - Error notifications
    - Weekly summary
  
  **Danger Zone 标签页**：
  - 红色警告区域
  - "Delete Account" 按钮（红色，带确认）

**颜色方案**: 白色背景，左侧深色导航，表单卡片

---

### 9. 订阅/账单页面
**路径**: `/billing`

**Title**: Billing & Subscription Page

**Description**:
设计一个订阅和账单管理页面：
- **顶部**：
  - 标题 "Billing & Subscription"
  - 当前计划显示（大卡片）
  
- **当前订阅卡片**：
  - 计划名称（Starter/Pro/Business）
  - 价格
  - 功能列表
  - "Upgrade" 或 "Downgrade" 按钮
  - 续费日期
  
- **使用量统计**：
  - API Calls 使用量（进度条）
    - 已使用：1,234 / 10,000
    - 进度条可视化
    - 重置日期
  - 其他使用量指标（根据计划不同）
  
- **定价计划对比**（3 个卡片）：
  - Starter: $19/月
  - Pro: $49/月（推荐，高亮）
  - Business: $149/月
  - 每个卡片显示：
    - 功能对比列表
    - 价格
    - "Select Plan" 按钮
  
- **账单历史**：
  - 表格显示：
    - 日期
    - 金额
    - 状态（Paid/Pending）
    - 发票下载按钮
  
- **支付方式**：
  - 当前支付方式显示
  - "Update Payment Method" 按钮

**颜色方案**: 白色卡片，主色按钮，进度条可视化

---

### 10. 帮助/文档页面
**路径**: `/docs`, `/help`

**Title**: Help & Documentation Page

**Description**:
设计一个文档和帮助页面：
- **左侧导航（文档目录）**：
  - Getting Started
  - Workflow Builder Guide
  - AI Nodes Reference
  - API Documentation
  - FAQ
  - Contact Support
  
- **右侧内容区**：
  - 文档内容（Markdown 渲染）
  - 代码示例（代码高亮）
  - 图片/视频嵌入
  - 目录导航（右侧固定）
  
- **搜索功能**：
  - 顶部搜索框
  - 搜索结果高亮
  
- **联系支持**：
  - 支持表单
  - 或聊天窗口（可选）

**颜色方案**: 白色背景，左侧导航，代码块深色背景

---

## 🔧 管理员端页面

### 1. 管理员登录页面
**路径**: `/admin/login`

**Title**: Admin Login Page

**Description**:
设计一个简洁的管理员登录页面：
- 居中卡片布局
- Logo
- 标题 "Admin Portal"
- 表单：
  - Email 输入
  - Password 输入
  - "Remember me" 复选框
  - "Sign In" 按钮
- 双因素认证输入框（可选）
- 深色背景，白色卡片

**颜色方案**: 深色背景，白色卡片，主色按钮

---

### 2. 管理员 Dashboard
**路径**: `/admin`

**Title**: Admin Dashboard

**Description**:
设计一个数据丰富的管理后台 Dashboard：
- **顶部导航**：
  - Logo
  - 导航菜单：Dashboard, Users, Workflows, Executions, Settings
  - 用户头像
  
- **统计卡片区**（6-8 个卡片）：
  - Total Users: 1,234
  - Active Users: 856
  - Total Workflows: 5,678
  - Executions Today: 12,345
  - Revenue Today: $456
  - API Calls Today: 89,012
  - Error Rate: 2.3%
  - 每个卡片有图标、数字、趋势箭头
  
- **图表区**：
  - 用户增长趋势（折线图，7天/30天）
  - 收入趋势（折线图）
  - 工作流执行统计（柱状图）
  - 错误率趋势（折线图）
  
- **快速操作**：
  - 最近活动列表
  - 系统健康状态
  - 告警通知

**颜色方案**: 深色主题，彩色统计卡片，图表可视化

---

### 3. 用户管理页面
**路径**: `/admin/users`

**Title**: Admin User Management

**Description**:
设计一个用户管理页面：
- **顶部操作栏**：
  - 标题 "Users"
  - 搜索框
  - 筛选器：Status, Plan, Date
  - "Export" 按钮
  
- **用户表格**：
  - 列：Avatar, Name, Email, Plan, Status, Created, Actions
  - 每行显示用户信息
  - 状态徽章（Active/Suspended）
  - 操作按钮：View, Edit, Suspend, Delete
  
- **用户详情侧边栏**（点击用户时）：
  - 用户信息
  - 订阅信息
  - 使用量统计
  - 工作流列表
  - 操作按钮

**颜色方案**: 白色背景，表格布局，状态颜色

---

### 4. 工作流管理页面
**路径**: `/admin/workflows`

**Title**: Admin Workflow Management

**Description**:
设计一个工作流管理页面：
- **顶部操作栏**：
  - 标题 "All Workflows"
  - 搜索框
  - 筛选器：Status, User, Date
  - 批量操作：Stop, Delete
  
- **工作流表格**：
  - 列：Name, Owner, Status, Executions, Last Run, Actions
  - 状态颜色标识
  - 操作按钮：View, Stop, Delete
  
- **工作流详情模态框**：
  - 工作流信息
  - 执行统计
  - 日志预览

**颜色方案**: 白色背景，表格布局

---

### 5. 执行监控页面
**路径**: `/admin/executions`

**Title**: Admin Execution Monitor

**Description**:
设计一个实时执行监控页面：
- **实时监控面板**：
  - 当前运行中的执行数
  - 队列长度
  - 平均执行时间
  - 错误率
  
- **执行列表**：
  - 实时更新的表格
  - 列：Workflow, User, Status, Started, Duration, Actions
  - 状态实时更新
  - 筛选：Status, Time Range
  
- **性能分析**：
  - 执行时间分布图
  - 错误类型统计
  - 慢执行列表

**颜色方案**: 深色主题，实时数据高亮

---

### 6. 系统设置页面
**路径**: `/admin/settings`

**Title**: Admin System Settings

**Description**:
设计一个系统设置页面：
- **标签页导航**：
  - General（常规）
  - AI APIs（AI API 配置）
  - Email（邮件设置）
  - Payment（支付设置）
  - Features（功能开关）
  
- **General 标签页**：
  - 系统名称
  - Logo 上传
  - 维护模式开关
  
- **AI APIs 标签页**：
  - OpenAI API Key（隐藏显示）
  - Claude API Key
  - Gemini API Key
  - 测试连接按钮
  
- **Email 标签页**：
  - SMTP 配置
  - 邮件模板管理
  
- **Payment 标签页**：
  - Paddle 配置
  - 定价设置
  
- **Features 标签页**：
  - 功能开关列表
  - 灰度发布设置

**颜色方案**: 白色背景，表单布局，危险操作红色

---

### 7. 日志查看页面
**路径**: `/admin/logs`

**Title**: Admin System Logs

**Description**:
设计一个系统日志查看页面：
- **筛选栏**：
  - 时间范围
  - 日志级别（All, Info, Warning, Error）
  - 搜索框
  - 自动刷新开关
  
- **日志表格**：
  - 列：Time, Level, Message, Context, User
  - 日志级别颜色标识
  - 可展开查看详细信息
  - 支持分页
  
- **日志详情侧边栏**：
  - 完整日志信息
  - JSON 格式化显示
  - 相关上下文

**颜色方案**: 深色背景，彩色日志级别

---

### 8. 财务统计页面
**路径**: `/admin/finance`

**Title**: Admin Finance Statistics

**Description**:
设计一个财务统计页面：
- **统计卡片**：
  - Total Revenue
  - Monthly Recurring Revenue (MRR)
  - New Subscriptions
  - Churn Rate
  - Average Revenue Per User (ARPU)
  
- **图表区**：
  - 收入趋势图（折线图）
  - 订阅计划分布（饼图）
  - 用户付费分析（柱状图）
  
- **订阅统计表格**：
  - 按计划统计
  - 按时间段统计
  - 导出功能

**颜色方案**: 白色背景，绿色收入，图表可视化

---

## 🎨 通用设计元素

### 颜色系统
- **主色**: #3B82F6 (Blue)
- **辅助色**: #6366F1 (Indigo), #8B5CF6 (Purple)
- **成功**: #10B981 (Green)
- **警告**: #F59E0B (Amber)
- **错误**: #EF4444 (Red)
- **背景**: #FFFFFF (White), #F9FAFB (Gray-50)
- **文字**: #111827 (Gray-900), #6B7280 (Gray-500)

### 组件库
- 按钮：Primary, Secondary, Danger, Ghost
- 输入框：带图标、验证状态
- 卡片：带阴影、悬停效果
- 表格：可排序、可筛选
- 模态框：居中、带遮罩
- 侧边栏：可折叠
- 导航：顶部、左侧

### 响应式断点
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

*所有页面都需要支持深色模式（可选）*
