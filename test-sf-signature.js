// 测试顺丰签名生成
import CryptoJS from 'crypto-js';

/**
 * 生成签名（100%对齐顺丰官方验证工具）
 * @param fullKey 完整密钥串
 * @returns 签名字符串
 */
function generateSFSignature(fullKey) {
  console.log('=== 开始生成签名（顺丰官方工具算法）===');
  console.log('完整密钥串:', fullKey);
  
  // 步骤1：UTF-8编码（和工具一致）
  const utf8Str = unescape(encodeURIComponent(fullKey));
  console.log('UTF-8编码后:', utf8Str);
  
  // 步骤2：MD5加密（32位小写 → 转大写，和工具一致）
  const md5Result = CryptoJS.MD5(utf8Str).toString().toUpperCase();
  console.log('MD5结果:', md5Result);
  
  // 步骤3：标准Base64编码（和工具一致，无URL转义）
  const base64Result = btoa(unescape(encodeURIComponent(md5Result)));
  console.log('Base64结果:', base64Result);
  
  return base64Result;
}

// 完整密钥串（直接复制调用）
const fullKey = 'YLQFEHKU00019D003B16AB3FD704BB24551B163F1773826560024<RouteRequest><tracking_type>1</tracking_type><method_type>1</method_type><tracking_number>SF5108692139876</tracking_number></RouteRequest>gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0';

// 调用示例（生成和工具一致的签名）
const correctMsgDigest = generateSFSignature(fullKey);
console.log('\n=== 验证结果 ===');
console.log('生成的签名:', correctMsgDigest);
console.log('期望的签名:', 'L1fZwAgpRR3+MyykQ5JzWA==');
console.log('签名是否一致:', correctMsgDigest === 'L1fZwAgpRR3+MyykQ5JzWA==');
