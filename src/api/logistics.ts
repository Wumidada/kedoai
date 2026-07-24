import axios from 'axios';
import CryptoJS from 'crypto-js';

// 提供btoa和unescape的兼容实现
const btoa = typeof window !== 'undefined' ? window.btoa : (str) => {
  // 纯JavaScript实现的btoa函数
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let result = '';
  let i = 0;
  
  while (i < str.length) {
    const a = str.charCodeAt(i++) || 0;
    const b = str.charCodeAt(i++) || 0;
    const c = str.charCodeAt(i++) || 0;
    
    result += chars[a >> 2];
    result += chars[((a & 3) << 4) | (b >> 4)];
    result += chars[((b & 15) << 2) | (c >> 6)];
    result += chars[c & 63];
  }
  
  // 处理填充
  const padding = str.length % 3;
  if (padding > 0) {
    result = result.slice(0, - (3 - padding));
    result += '='.repeat(3 - padding);
  }
  
  return result;
};

const unescape = typeof window !== 'undefined' ? window.unescape : (str) => {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (e) {
    return str;
  }
};

// 顺丰物流查询API配置
const SF_CONFIG = {
  // 顾客编码
  clientCode: 'YLQFEHKU',
  // 生产校验码
  checkWord: 'gl4VPZ6KMB3fyRMW9KA9mjBwCTWHDLL0',
  // 接口地址（生产环境）
  apiUrl: 'https://sfapi.sf-express.com/std/service',
  // 服务名
  serviceCode: 'EXP_RECE_SEARCH_ROUTES'
};

/**
 * 生成UUID
 * @returns 随机UUID字符串
 */
const generateUUID = (): string => {
  return crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * 生成13位毫秒级时间戳
 * @returns 13位时间戳字符串
 */
const getTimestamp = (): string => {
  // 确保是直接生成的13位纯数字字符串，无任何转换/空格
  const timestamp = Date.now().toString();
  console.log('生成的时间戳:', timestamp, '长度:', timestamp.length);
  return timestamp;
};

/**
 * 生成标准JSON报文
 * @param trackingNumber 运单号
 * @param phoneTail 手机号后四位（可选，用于无月结账户时的校验）
 * @returns 标准JSON报文字符串
 */
const generateJSON = (trackingNumber: string, phoneTail?: string): string => {
  // 生成JSON报文
  const jsonObj = {
    language: "zh-CN",
    trackingType: "1",
    trackingNumber: [trackingNumber],
    methodType: "1"
  };
  
  // 如果提供了手机号后四位，则添加到报文中
  if (phoneTail && phoneTail.length === 4) {
    jsonObj["checkPhoneNo"] = phoneTail;
  }
  
  const json = JSON.stringify(jsonObj);
  console.log('生成的JSON报文:', json);
  return json;
};

/**
 * 生成签名（顺丰官方文档标准）
 * @param msgData 业务数据报文
 * @param timestamp 13位时间戳
 * @param checkWord 校验码
 * @returns 签名字符串
 */
export function generateSFSignature(msgData: string, timestamp: string, checkWord: string): string {
  console.log('=== 开始生成签名（顺丰官方文档算法）===');
  
  // 构建完整密钥串：msgData + timestamp + checkWord（严格按照官方文档顺序）
  const fullKey = msgData + timestamp + checkWord;
  console.log('完整密钥串:', fullKey);
  
  // 步骤1：UTF-8编码
  const wordArray = CryptoJS.enc.Utf8.parse(fullKey);
  
  // 步骤2：MD5加密
  const md5Binary = CryptoJS.MD5(wordArray);
  
  // 步骤3：标准Base64编码
  const base64Result = CryptoJS.enc.Base64.stringify(md5Binary);
  console.log('Base64结果:', base64Result);
  
  return base64Result;
}

/**
 * 生成签名（顺丰官方标准）
 * @param msgData 业务数据报文
 * @param timestamp 13位时间戳
 * @param checkWord 校验码
 * @returns 签名字符串
 */
export function generateSignature(msgData: string, timestamp: string, checkWord: string): string {
  // 使用顺丰官方文档算法生成签名
  return generateSFSignature(msgData, timestamp, checkWord);
}

/**
 * 测试签名生成（使用顺丰官方文档示例）
 */
export const testSFSignature = () => {
  console.log('=== 测试顺丰签名生成（官方文档示例）===');
  
  // 官方文档示例数据
  const msgData = '{"language":"zh-CN","orderId":"QIAO-20200618-004"}';
  const timestamp = '12312334453453';
  const checkWord = 'fjcg5PGKaNpPSHFAZ4QsCOkV71R3zVci';
  
  // 生成签名
  const generatedSignature = generateSFSignature(msgData, timestamp, checkWord);
  console.log('生成的签名:', generatedSignature);
  console.log('期望的签名:', 'IIKJtuLVzoFTu4kHI8M8vA==');
  console.log('签名是否一致:', generatedSignature === 'IIKJtuLVzoFTu4kHI8M8vA==');
  
  return generatedSignature;
};

/**
 * 顺丰物流查询API
 * @param trackingNumber 运单号
 * @param phoneTail 手机号后四位（可选，用于无月结账户时的校验）
 * @returns 物流查询结果
 */
export const getSFExpressTracking = async (trackingNumber: string, phoneTail?: string) => {
  console.log('=== 开始查询物流 ===');
  console.log('运单号:', trackingNumber);
  try {
    const { apiUrl, clientCode, checkWord, serviceCode } = SF_CONFIG;
    console.log('配置信息:', { apiUrl, clientCode, serviceCode, checkWord });
    
    // 生成标准JSON报文
    const msgData = generateJSON(trackingNumber, phoneTail);
    console.log('生成的JSON报文:', msgData);
    
    // 生成13位时间戳
    const timestamp = getTimestamp();
    console.log('生成的时间戳:', timestamp, '类型:', typeof timestamp);
    console.log('=== 重要信息 ===');
    console.log('请求时间戳:', timestamp);
    
    // 生成随机UUID
    const requestID = generateUUID();
    console.log('生成的UUID:', requestID);
    
    // 生成签名
    console.log('=== 开始生成签名 ===');
    console.log('签名拼接顺序: msgData + timestamp + checkWord（顺丰官方文档标准）');
    console.log('拼接前各部分:');
    console.log('  msgData:', msgData);
    console.log('  timestamp:', timestamp);
    console.log('  checkWord:', checkWord);
    
    // 使用顺丰官方文档算法生成签名
    const msgDigest = generateSFSignature(msgData, timestamp, checkWord);
    console.log('生成的签名:', msgDigest);
    console.log('=== 重要信息 ===');
    console.log('数字签名:', msgDigest);
    
    // 构建请求参数
    console.log('=== 构建请求参数 ===');
    const params = new URLSearchParams();
    params.append('partnerID', clientCode);
    params.append('requestID', requestID);
    params.append('serviceCode', serviceCode);
    params.append('timestamp', timestamp);
    params.append('msgDigest', msgDigest);
    params.append('msgData', msgData);
    
    console.log('构建的请求参数:');
    console.log('  partnerID:', clientCode);
    console.log('  requestID:', requestID);
    console.log('  serviceCode:', serviceCode);
    console.log('  timestamp:', timestamp);
    console.log('  msgDigest:', msgDigest);
    console.log('  msgData:', msgData);
    
    console.log('请求体:', params.toString());
    
    // 发送请求
    console.log('=== 发送请求 ===');
    console.log('请求地址:', apiUrl);
    console.log('请求方法: POST');
    console.log('Content-Type: application/x-www-form-urlencoded');
    
    const response = await axios.post(apiUrl, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      timeout: 30000
    });
    
    console.log('=== 请求成功 ===');
    console.log('响应状态:', response.status);
    console.log('响应数据:', response.data);
    return response.data;
  } catch (error) {
    console.error('=== 物流查询失败 ===');
    console.error('错误信息:', error);
    throw error;
  }
};

/**
 * 格式化物流信息
 * @param data 物流查询结果
 * @returns 格式化后的物流信息
 */
export const formatLogisticsInfo = (data: any) => {
  console.log('=== 开始格式化物流信息 ===');
  console.log('原始数据:', data);
  
  // 解析apiResultData（如果是字符串）
  let apiResultData = data.apiResultData;
  if (typeof apiResultData === 'string') {
    try {
      apiResultData = JSON.parse(apiResultData);
    } catch (e) {
      console.error('解析apiResultData失败:', e);
      apiResultData = {};
    }
  }
  
  console.log('解析后的apiResultData:', apiResultData);
  console.log('apiResultData类型:', typeof apiResultData);
  console.log('apiResultData的所有键:', Object.keys(apiResultData));
  
  // 尝试从不同位置获取状态信息
  let status = '未知';
  
  // 尝试从原始data对象中直接获取（针对字符串格式的apiResultData）
  if (data.apiResultData && typeof data.apiResultData === 'string') {
    // 直接从字符串中提取firstStatusName
    const statusNameMatch = data.apiResultData.match(/"firstStatusName":"([^"]+)"/);
    if (statusNameMatch && statusNameMatch[1]) {
      status = statusNameMatch[1];
      console.log('从data.apiResultData字符串中提取firstStatusName:', status);
    }
    // 直接从字符串中提取firstStatusCode
    else {
      const statusCodeMatch = data.apiResultData.match(/"firstStatusCode":"([^"]+)"/);
      if (statusCodeMatch && statusCodeMatch[1]) {
        const statusCode = statusCodeMatch[1];
        // 根据状态码映射状态
        const statusMap: Record<string, string> = {
          '1': '已下单',
          '2': '已揽收',
          '3': '运输中',
          '4': '派送中',
          '5': '已签收',
          '6': '派送失败',
          '7': '退回中',
          '8': '已退回',
          '9': '异常',
          '10': '待处理',
          '401': '已签收' // 特殊状态码
        };
        status = statusMap[statusCode] || '未知';
        console.log('从data.apiResultData字符串中提取firstStatusCode:', status);
      }
    }
  }
  
  // 如果上面没有获取到状态，尝试从解析后的apiResultData中获取
  if (status === '未知') {
    // 直接从data对象中获取状态信息（因为apiResultData可能解析不完全）
    if (data.firstStatusName) {
      status = data.firstStatusName;
      console.log('从data.firstStatusName获取状态:', status);
    } 
    // 从解析后的apiResultData中获取状态信息
    else if (apiResultData.firstStatusName) {
      status = apiResultData.firstStatusName;
      console.log('从apiResultData.firstStatusName获取状态:', status);
    } 
    // 从data对象中获取状态码
    else if (data.firstStatusCode) {
      // 根据状态码映射状态
      const statusMap: Record<string, string> = {
        '1': '已下单',
        '2': '已揽收',
        '3': '运输中',
        '4': '派送中',
        '5': '已签收',
        '6': '派送失败',
        '7': '退回中',
        '8': '已退回',
        '9': '异常',
        '10': '待处理',
        '401': '已签收' // 特殊状态码
      };
      status = statusMap[data.firstStatusCode] || '未知';
      console.log('从data.firstStatusCode获取状态:', status);
    } 
    // 从解析后的apiResultData中获取状态码
    else if (apiResultData.firstStatusCode) {
      // 根据状态码映射状态
      const statusMap: Record<string, string> = {
        '1': '已下单',
        '2': '已揽收',
        '3': '运输中',
        '4': '派送中',
        '5': '已签收',
        '6': '派送失败',
        '7': '退回中',
        '8': '已退回',
        '9': '异常',
        '10': '待处理',
        '401': '已签收' // 特殊状态码
      };
      status = statusMap[apiResultData.firstStatusCode] || '未知';
      console.log('从apiResultData.firstStatusCode获取状态:', status);
    }
  }
  
  console.log('最终状态:', status);
  
  // 获取路由响应数据
  const routeResps = apiResultData.msgData?.routeResps || [];
  const firstRouteResp = routeResps[0] || {};
  
  console.log('路由响应数据:', firstRouteResp);
  console.log('firstRouteResp.routes:', firstRouteResp.routes);
  
  // 尝试获取预计送达时间
  let estimatedDelivery = '';
  if (firstRouteResp.estimatedDelivery) {
    estimatedDelivery = firstRouteResp.estimatedDelivery;
    console.log('从firstRouteResp.estimatedDelivery获取预计送达时间:', estimatedDelivery);
  } else if (apiResultData.msgData?.estimatedDelivery) {
    estimatedDelivery = apiResultData.msgData.estimatedDelivery;
    console.log('从apiResultData.msgData.estimatedDelivery获取预计送达时间:', estimatedDelivery);
  } else {
    // 如果没有预计送达时间，根据物流状态计算一个默认值
    if (status === '已签收') {
      estimatedDelivery = '已送达';
    } else {
      // 默认为当前日期加3天
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 3);
      estimatedDelivery = defaultDate.toLocaleDateString('zh-CN');
    }
    console.log('使用默认预计送达时间:', estimatedDelivery);
  }
  
  // 定义进度项类型
  interface ProgressItem {
    time: string;
    description: string;
    status: "completed" | "pending";
  }
  
  // 构建物流信息
  const logisticsInfo = {
    carrier: '顺丰速运',
    trackingNumber: firstRouteResp.mailNo || '',
    status: status,
    estimatedDelivery: estimatedDelivery,
    progress: [] as ProgressItem[]
  };
  
  // 处理路由信息
  if (firstRouteResp.routes && firstRouteResp.routes.length > 0) {
    console.log('有路由信息，长度:', firstRouteResp.routes.length);
    // 确保每个路由对象都有必要的字段
    logisticsInfo.progress = firstRouteResp.routes.map((route: any) => ({
      time: route.timestamp || route.acceptTime || new Date().toLocaleString('zh-CN'),
      description: route.description || route.remark || '物流信息更新',
      status: 'completed'
    }));
    console.log('处理后的进度信息:', logisticsInfo.progress);
  } else {
    // 如果没有路由信息，根据reasonRemark添加一条状态
    if (firstRouteResp.reasonRemark) {
      console.log('添加reasonRemark作为进度:', firstRouteResp.reasonRemark);
      logisticsInfo.progress.push({
        time: new Date().toLocaleString('zh-CN'),
        description: firstRouteResp.reasonRemark,
        status: 'completed'
      });
    } else {
      // 添加一条默认状态
      console.log('添加默认进度');
      logisticsInfo.progress.push({
        time: new Date().toLocaleString('zh-CN'),
        description: `物流状态: ${status}`,
        status: 'completed'
      });
    }
  }
  
  console.log('格式化后的物流信息:', logisticsInfo);
  return logisticsInfo;
};