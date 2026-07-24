// 测试顺丰签名生成
import CryptoJS from 'crypto-js';

// 100% 对齐顺丰官方验证工具的签名生成函数
const generateSFSignature = (fullKey) => {

  // 1. 完整密钥转 UTF-8 字节数组
  const wordArray = CryptoJS.enc.Utf8.parse(fullKey);
  console.log('UTF-8字节数组:', wordArray);
  
  // 2. MD5 加密
  const md5Hash = CryptoJS.MD5(wordArray);
  console.log('MD5哈希对象:', md5Hash);
  
  // 3. 直接对MD5二进制结果进行Base64编码
  const base64Result = md5Hash.toString(CryptoJS.enc.Base64);
  console.log('Base64结果:', base64Result);
  
  return base64Result;
};

// 完整密钥串（直接复制调用）
const fullKey = 'YLQFEHKU00019D003B16AB3FD704BB24551B163F1773826560024<RouteRequest><tracking_type>1</tracking_type><method_type>1</method_type><tracking_number>SF5108692139876</tracking_number></RouteRequest>gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0';

// 调用示例（生成和工具一致的签名）
const correctMsgDigest = generateSFSignature(fullKey);
console.log('\n=== 验证结果 ===');
console.log('正确签名（需等于L1fZwAgpRR3+MyykQ5JzWA==）：', correctMsgDigest);
console.log('签名是否一致:', correctMsgDigest === 'L1fZwAgpRR3+MyykQ5JzWA==');
