// 测试顺丰官方文档示例（使用ES模块）
import CryptoJS from 'crypto-js';
import crypto from 'node:crypto';

// 官方文档示例数据
const msgData = '{"language":"zh-CN","orderId":"QIAO-20200618-004"}';
const timestamp = '12312334453453';
const checkWord = 'fjcg5PGKaNpPSHFAZ4QsCOkV71R3zVci';
const expectedSignature = 'IIKJtuLVzoFTu4kHI8M8vA==';

// 方法1：使用CryptoJS
console.log('=== 方法1：使用CryptoJS ===');
const fullKey1 = msgData + timestamp + checkWord;
console.log('完整密钥串:', fullKey1);
const wordArray1 = CryptoJS.enc.Utf8.parse(fullKey1);
const md5Result1 = CryptoJS.MD5(wordArray1);
const base64Result1 = CryptoJS.enc.Base64.stringify(md5Result1);
console.log('签名结果:', base64Result1);
console.log('是否一致:', base64Result1 === expectedSignature);

// 方法2：使用Node.js内置crypto模块
console.log('\n=== 方法2：使用Node.js内置crypto模块 ===');
const fullKey2 = msgData + timestamp + checkWord;
const md5Hash = crypto.createHash('md5');
md5Hash.update(fullKey2, 'utf8');
const md5Buffer = md5Hash.digest();
const base64Result2 = md5Buffer.toString('base64');
console.log('签名结果:', base64Result2);
console.log('是否一致:', base64Result2 === expectedSignature);

// 验证官方文档中的示例
console.log('\n=== 验证官方文档示例 ===');
console.log('官方示例签名:', expectedSignature);
console.log('我们的实现1:', base64Result1);
console.log('我们的实现2:', base64Result2);