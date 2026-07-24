import CryptoJS from 'crypto-js';

// 按顺丰官方工具界面的参数
const msgData = '<RouteRequest><tracking_type>1</tracking_type><method_type>1</method_type><tracking_number>SF5108692139876</tracking_number></RouteRequest>';
const timestamp = '1773826560024'; // 完整时间戳
const checkWord = 'gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0'; // 密钥就是 checkWord

// 顺丰工具的拼接逻辑：msgData + timestamp + checkWord
const fullSignStr = msgData + timestamp + checkWord;

// 标准算法
const wordArray = CryptoJS.enc.Utf8.parse(fullSignStr);
const md5Binary = CryptoJS.MD5(wordArray);
const signature = CryptoJS.enc.Base64.stringify(md5Binary);

console.log('生成签名：', signature);
console.log('期望签名：AmdRoeESa18FBn8DnUmOCQ==');
console.log('是否一致：', signature === 'AmdRoeESa18FBn8DnUmOCQ==');
