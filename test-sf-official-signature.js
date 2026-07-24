// 完整代码（一字不改复制）
import CryptoJS from 'crypto-js'; // 确保已安装 npm install crypto-js@4.2.0

function generateSFSignature(fullKey) {
  // 自动清洗所有空白字符（解决长度超标问题）
  const cleanKey = fullKey.replace(/\s+/g, '').replace(/[\u200B-\u200D\uFEFF]/g, '');
  console.log('=== 清洗后密钥串 ===');
  console.log('清洗后内容：', cleanKey);
  console.log('清洗后长度：', cleanKey.length); // 正确值：194

  // 按顺丰工具逻辑生成签名
  const wordArray = CryptoJS.enc.Utf8.parse(cleanKey);
  const md5Binary = CryptoJS.MD5(wordArray);
  const base64Result = CryptoJS.enc.Base64.stringify(md5Binary);

  return base64Result;
}

// 原始密钥串（无需手动修改）
const testFullKey = 'YLQFEHKU00019D003B16AB3FD704BB24551B163F1773826560024<RouteRequest><tracking_type>1</tracking_type><method_type>1</method_type><tracking_number>SF5108692139876</tracking_number></RouteRequest>gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0';

// 执行并输出结果
const correctMsgDigest = generateSFSignature(testFullKey);
console.log('\n=== 最终结果 ===');
console.log('生成的签名：', correctMsgDigest);
console.log('期望签名：L1fZwAgpRR3+MyykQ5JzWA==');
console.log('是否一致：', correctMsgDigest === 'L1fZwAgpRR3+MyykQ5JzWA==');
