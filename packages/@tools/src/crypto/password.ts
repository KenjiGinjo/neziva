/**
 * 密码哈希函数
 *
 * 安全性说明：
 * 1. Bun.password.hash 自动处理 salt
 *    - Bun 的 password.hash() 函数会自动生成随机 salt
 *    - 这个 salt 会被嵌入到最终的哈希字符串中
 *    - 不需要手动管理 salt
 *
 * 2. Argon2id 算法
 *    - Argon2id 是目前最安全的密码哈希算法之一
 *    - 它结合了 Argon2d 和 Argon2i 的优点
 *    - 对侧信道攻击有很强的抵抗力
 *
 * 3. 参数配置合理
 *    - memoryCost: 8192 - 内存成本，增加计算复杂度
 *    - timeCost: 3 - 时间成本，控制哈希计算时间
 */
export async function hashPassword(plainPassword: string) {
  return await Bun.password.hash(plainPassword, {
    algorithm: 'argon2id',
    memoryCost: 8192,
    timeCost: 3,
  })
}

/**
 * 密码验证函数
 *
 * 使用 Bun.password.verify 验证密码是否正确
 * 该函数会自动从哈希字符串中提取 salt 进行验证
 */
export async function verifyPassword(password: string, hashedPassword: string) {
  return await Bun.password.verify(password, hashedPassword)
}
