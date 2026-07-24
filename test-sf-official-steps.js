import CryptoJS from 'crypto-js';

// 顺丰官方工具的参数
const msgData = '{"language":"zh-CN","trackingType":"1","trackingNumber":["SF5108692139876"],"methodType":"1"}';
const timestamp = '1773826560024';
const rawKey = 'gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0';

// 步骤1：字段拼接（固定顺序）
const step1Result = msgData + timestamp + rawKey;
console.log('=== 步骤1：字段拼接 ===');
console.log('拼接规则：msgData + timestamp + rawKey');
console.log('拼接结果：', step1Result);

// 步骤2：URL编码（特殊规则）
// 特殊规则：保留 !*'() 等特殊字符不编码
const step2Result = encodeURIComponent(step1Result).replace(/%21/g, '!').replace(/%2A/g, '*').replace(/%27/g, "'").replace(/%28/g, '(').replace(/%29/g, ')');
console.log('\n=== 步骤2：URL编码 ===');
console.log('编码结果：', step2Result);

// 步骤3：执行MD5加密
const step3Result = CryptoJS.MD5(step2Result);
console.log('\n=== 步骤3：执行MD5加密 ===');
console.log('MD5结果（十六进制）：', step3Result.toString(CryptoJS.enc.Hex));

// 步骤4：Base64编码
const step4Result = step3Result.toString(CryptoJS.enc.Base64);
console.log('\n=== 步骤4：Base64编码 ===');
console.log('最终结果：', step4Result);

// 验证结果
console.log('\n=== 验证结果 ===');
console.log('生成的签名：', step4Result);
console.log('官方工具签名：B1He3yuEAHwtfdWYFDP+PA==');
console.log('签名是否一致：', step4Result === 'B1He3yuEAHwtfdWYFDP+PA==');
