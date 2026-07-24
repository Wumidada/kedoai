// 顺丰签名生成测试

// 生产校验码
const testCheckWord = 'gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0';

// 测试数据
const testTrackingNumber = 'SF5108692139876';
const testMsgData = `<RouteRequest><tracking_type>1</tracking_type><method_type>1</method_type><tracking_number>${testTrackingNumber}</tracking_number></RouteRequest>`;
const testTimestamp = Date.now().toString();

/**
 * 生成MD5哈希（浏览器环境）
 * @param str 输入字符串
 * @returns 32位大写MD5哈希
 */
async function md5(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('MD5', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex.toUpperCase();
}

/**
 * 生成签名
 * @param msgData 业务数据报文
 * @param timestamp 13位时间戳
 * @param checkWord 校验码
 * @returns 签名字符串
 */
async function generateSignature(msgData, timestamp, checkWord) {
  // 步骤1：拼接字符串：msgData + timestamp + checkWord
  const concatenatedString = msgData + timestamp + checkWord;
  
  // 步骤2-3：UTF-8编码 → 32位大写MD5哈希
  const md5Hash = await md5(concatenatedString);
  
  // 步骤4：对MD5结果做标准Base64编码
  const msgDigest = btoa(md5Hash);
  
  return msgDigest;
}

// 运行测试
(async () => {
  try {
    // 生成签名
    const msgDigest = await generateSignature(testMsgData, testTimestamp, testCheckWord);
    
    // 输出结果
    console.log('=== 测试参数 ===');
    console.log('testMsgData:', testMsgData);
    console.log('testTimestamp:', testTimestamp);
    console.log('testCheckWord:', testCheckWord);
    console.log('=== 签名结果 ===');
    console.log('msgDigest:', msgDigest);
    
    // 提示用户在顺丰官方工具中验证
    console.log('\n请在 https://md5.sfapi.fun/ 中验证结果:');
    console.log('1. 业务报文 (msgData):', testMsgData);
    console.log('2. 时间戳:', testTimestamp);
    console.log('3. 密钥 (rawKey):', testCheckWord);
    console.log('4. 对比工具生成的最终加密结果与上述 msgDigest 是否一致');
  } catch (error) {
    console.error('签名生成失败:', error);
  }
})();
