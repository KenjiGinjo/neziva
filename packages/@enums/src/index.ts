export enum EnumErrorLogType {
  ApplicationError = 1,
  DatabaseError = 2,
  ThirdPartyPay = 3,
}

export enum EnumUserStatus {
  Active = 1,
  Blocked = 2,
  DeletePending = 3,
}

export enum EnumAdminStatus {
  Active = 0,
  Blocked = 1,
}

export enum EnumWorkflowStatus {
  Draft = 'draft',
  Active = 'active',
  Paused = 'paused',
  Error = 'error',
}

export enum EnumExecutionStatus {
  Pending = 'pending',
  Running = 'running',
  Completed = 'completed',
  Failed = 'failed',
  Canceled = 'canceled',
}

export enum EnumSubscriptionPlan {
  Free = 'free',
  Starter = 'starter',
  Pro = 'pro',
  Business = 'business',
}

export enum EnumBlogPostStatus {
  Draft = 0,
  Published = 1,
  Archived = 2,
}

export enum EnumContactFormStatus {
  Pending = 0, // 未处理
  Processed = 1, // 已处理
  Replied = 2, // 已回复
}

export enum EnumNewsletterStatus {
  Pending = 0, // 待验证
  Subscribed = 1, // 已订阅
  Unsubscribed = 2, // 已退订
}
