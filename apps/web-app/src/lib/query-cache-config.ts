/**
 * React Query 缓存配置常量
 * 根据数据特性设置合理的 staleTime 和 cacheTime
 *
 * 原则：
 * - staleTime: 数据在多久后被认为是过期的
 * - cacheTime: 当没有组件使用时，数据在缓存中保留的时间
 * - cacheTime 应该 >= staleTime
 */

// 实时数据（需要频繁更新，但可以短时间缓存）
export const REALTIME_CACHE = {
  staleTime: 1 * 60 * 1000, // 1分钟内数据是新鲜的
  cacheTime: 2 * 60 * 1000, // 2分钟后清除缓存
} as const

// 半实时数据（列表页、详情页等）
export const SEMI_REALTIME_CACHE = {
  staleTime: 3 * 60 * 1000, // 3分钟内数据是新鲜的
  cacheTime: 5 * 60 * 1000, // 5分钟后清除缓存
} as const

// 列表数据（首页列表、探索页等）
export const LIST_CACHE = {
  staleTime: 5 * 60 * 1000, // 5分钟内数据是新鲜的
  cacheTime: 10 * 60 * 1000, // 10分钟后清除缓存
} as const

// 详情页数据
export const DETAIL_CACHE = {
  staleTime: 5 * 60 * 1000, // 5分钟内数据是新鲜的
  cacheTime: 10 * 60 * 1000, // 10分钟后清除缓存
} as const

// 用户相关数据（资料、设置等）
export const USER_DATA_CACHE = {
  staleTime: 5 * 60 * 1000, // 5分钟内数据是新鲜的
  cacheTime: 10 * 60 * 1000, // 10分钟后清除缓存
} as const

// 静态数据（FAQ、系统配置等）
export const STATIC_CACHE = {
  staleTime: 30 * 60 * 1000, // 30分钟内数据是新鲜的
  cacheTime: 60 * 60 * 1000, // 1小时后清除缓存
} as const

// 搜索建议
export const SEARCH_SUGGESTION_CACHE = {
  staleTime: 5 * 60 * 1000, // 5分钟内数据是新鲜的
  cacheTime: 10 * 60 * 1000, // 10分钟后清除缓存
} as const
