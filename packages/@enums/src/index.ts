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

export enum EnumGender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
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

export enum EnumSubscriptionStatus {
  Active = 'active',
  Canceled = 'canceled',
  Expired = 'expired',
  PastDue = 'past_due',
}
