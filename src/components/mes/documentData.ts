export type DictionaryItem = {
  category: string;
  categoryCode: string;
  code: string;
  name: string;
  description: string;
};

export const dictionaryItems: DictionaryItem[] = [
  { category: "玻璃来源", categoryCode: "GLASS_TYPE", code: "F", name: "浮法玻璃", description: "Phoenix ID 第 3 位" },
  { category: "玻璃来源", categoryCode: "GLASS_TYPE", code: "T", name: "加工玻璃", description: "Phoenix ID 第 3 位" },
  { category: "玻璃来源", categoryCode: "GLASS_TYPE", code: "X", name: "外购玻璃", description: "Phoenix ID 第 3 位" },
  { category: "玻璃色调", categoryCode: "GLASS_TINT", code: "000", name: "白玻璃", description: "原片及成品色调代码" },
  { category: "玻璃色调", categoryCode: "GLASS_TINT", code: "157", name: "深蓝", description: "原片及成品色调代码" },
  { category: "玻璃色调", categoryCode: "GLASS_TINT", code: "152", name: "绿玻", description: "原片及成品色调代码" },
  { category: "质量等级", categoryCode: "QUALITY_GRADE", code: "03", name: "建筑镀膜", description: "质量等级代码" },
  { category: "产品系列", categoryCode: "PRODUCT_SERIES", code: "05", name: "THR INS", description: "静态标准产品系列" },
  { category: "镀膜型号", categoryCode: "COATING_MODEL", code: "034", name: "PLT UN II", description: "静态标准镀膜代码" },
  { category: "镀膜型号", categoryCode: "COATING_MODEL", code: "052", name: "ST136", description: "静态标准镀膜代码" },
  { category: "镀膜型号", categoryCode: "COATING_MODEL", code: "054", name: "ST408", description: "静态标准镀膜代码" },
  { category: "镀膜型号", categoryCode: "COATING_MODEL", code: "062", name: "ST167", description: "静态标准镀膜代码" },
  { category: "镀膜型号", categoryCode: "COATING_MODEL", code: "552", name: "SKN146II", description: "静态标准镀膜代码" },
  { category: "产品族", categoryCode: "PRODUCT_FAMILY", code: "401", name: "COOL-LITE K", description: "静态标准子系列" },
  { category: "产品族", categoryCode: "PRODUCT_FAMILY", code: "402", name: "COOL-LITE SK", description: "静态标准子系列" },
  { category: "产品族", categoryCode: "PRODUCT_FAMILY", code: "403", name: "COOL-LITE", description: "静态标准子系列" },
  { category: "产品族", categoryCode: "PRODUCT_FAMILY", code: "501", name: "PLANITHERM", description: "静态标准子系列" },
  { category: "产品类型", categoryCode: "PRODUCT_TYPE", code: "27", name: "Planitherm", description: "动态标准质量等级" },
  { category: "产品类型", categoryCode: "PRODUCT_TYPE", code: "28", name: "Cool-Lite", description: "动态标准质量等级" },
  { category: "夹层类型", categoryCode: "LAMINATION_TYPE", code: "U", name: "PLF", description: "静态标准夹层代码" },
  { category: "夹层类型", categoryCode: "LAMINATION_TYPE", code: "T", name: "DLF", description: "静态标准夹层代码" },
  { category: "夹层类型", categoryCode: "LAMINATION_TYPE", code: "D", name: "SSS", description: "静态标准夹层代码" },
  { category: "包装类型", categoryCode: "PACK_TYPE", code: "007", name: "散放于框架", description: "动态标准包装" },
  { category: "包装类型", categoryCode: "PACK_TYPE", code: "018", name: "集装架", description: "动态标准包装" },
  { category: "包装类型", categoryCode: "PACK_TYPE", code: "027", name: "裸装", description: "动态标准包装" },
  { category: "朝向", categoryCode: "ORIENTATION", code: "L", name: "纵向", description: "成品玻璃朝向" },
  { category: "朝向", categoryCode: "ORIENTATION", code: "T", name: "横向", description: "成品玻璃朝向" },
  { category: "表面保护", categoryCode: "SURFACE_PROTECTION", code: "0", name: "无", description: "动态标准表面保护" },
  { category: "表面保护", categoryCode: "SURFACE_PROTECTION", code: "1", name: "锌", description: "动态标准表面保护" },
  { category: "缺陷标识", categoryCode: "DEFECT_FLAG", code: "0", name: "无", description: "动态标准缺陷标识" },
];

export type DecodeField = {
  position: string;
  name: string;
  type: string;
  example: string;
  description: string;
};

export type DecodeRule = {
  id: number;
  name: string;
  location: string;
  source: string;
  length: string;
  example: string;
  fields: DecodeField[];
};

export const decodeRules: DecodeRule[] = [
  {
    id: 1,
    name: "原片玻璃 ID",
    location: "上片端",
    source: "Phoenix ID 标签",
    length: "10",
    example: "50F0432561",
    fields: [
      { position: "0-1", name: "工厂代码", type: "字符", example: "50", description: "生产工厂代码" },
      { position: "2", name: "玻璃来源", type: "字符", example: "F", description: "F 浮法 / T 加工 / X 外购" },
      { position: "3-9", name: "流水号", type: "字符", example: "0432561", description: "玻璃垛唯一流水号" },
    ],
  },
  {
    id: 2,
    name: "原片玻璃产品明细",
    location: "上片端",
    source: "Phoenix ID 标签",
    length: "39",
    example: "1570000590034500321001000111026661504",
    fields: [
      { position: "0-2", name: "色调", type: "字符", example: "157", description: "000 白玻 / 157 深蓝 / 152 绿玻" },
      { position: "3-5", name: "镀膜代码", type: "字符", example: "000", description: "无镀膜时为 000" },
      { position: "6-9", name: "厚度", type: "数字", example: "0590", description: "5.9 mm，单位为 1/100 mm" },
      { position: "10-11", name: "质量等级", type: "字符", example: "03", description: "03 建筑镀膜" },
      { position: "12-16", name: "长度", type: "数字", example: "04500", description: "玻璃长度" },
      { position: "17-21", name: "宽度", type: "数字", example: "03210", description: "玻璃宽度" },
      { position: "22-23", name: "板垛数量", type: "数字", example: "01", description: "板垛数量" },
      { position: "24-28", name: "每垛片数", type: "数字", example: "00011", description: "每垛总片数" },
      { position: "29-38", name: "物料代码", type: "数字", example: "1026661504", description: "10 位物料代码" },
    ],
  },
  {
    id: 3,
    name: "下片堆垛机 ID",
    location: "下片端",
    source: "堆垛机位置二维码",
    length: "2",
    example: "S1",
    fields: [
      { position: "0-1", name: "堆垛机 ID", type: "字符", example: "S1", description: "下片堆垛机位置编码" },
    ],
  },
  {
    id: 4,
    name: "Phoenix 计划单号",
    location: "下片端",
    source: "Phoenix 计划单",
    length: "15",
    example: "000400035955010",
    fields: [
      { position: "0-11", name: "计划单号", type: "字符", example: "000400035955", description: "Phoenix 生成的计划单号" },
      { position: "12-14", name: "计划行项目", type: "字符", example: "010", description: "计划行项目编号" },
    ],
  },
  {
    id: 5,
    name: "成品玻璃产品明细",
    location: "下片端",
    source: "Phoenix 计划单",
    length: "62",
    example: "104947054000501000059000027U10110021027L06000032101049474002",
    fields: [
      { position: "0-5", name: "产品代码", type: "字符", example: "104947", description: "6 位成品产品代码" },
      { position: "6-7", name: "产品系列", type: "字符", example: "05", description: "05 - THR INS" },
      { position: "8-10", name: "镀膜型号", type: "字符", example: "409", description: "静态标准镀膜代码" },
      { position: "14-16", name: "产品族", type: "字符", example: "501", description: "501 - PLANITHERM" },
      { position: "20-23", name: "厚度", type: "数字", example: "0590", description: "5.9 mm" },
      { position: "27-28", name: "产品类型", type: "字符", example: "27", description: "27 Planitherm / 28 Cool-Lite" },
      { position: "29", name: "夹层类型", type: "字符", example: "U", description: "U PLF / T DLF / D SSS" },
      { position: "38-40", name: "包装", type: "字符", example: "027", description: "007 框架 / 018 集装架 / 027 裸装" },
      { position: "41", name: "朝向", type: "字符", example: "L", description: "L 纵向 / T 横向" },
      { position: "42-46", name: "长度", type: "数字", example: "06000", description: "成品长度" },
      { position: "47-51", name: "宽度", type: "数字", example: "03210", description: "成品宽度" },
      { position: "52-61", name: "物料代码", type: "数字", example: "1049474002", description: "10 位物料代码" },
    ],
  },
  {
    id: 6,
    name: "盖板玻璃 ID",
    location: "下片端",
    source: "Phoenix ID 标签",
    length: "10",
    example: "50F7330294",
    fields: [
      { position: "0-1", name: "工厂代码", type: "字符", example: "50", description: "生产工厂代码" },
      { position: "2", name: "玻璃来源", type: "字符", example: "F", description: "F 浮法 / T 加工 / X 外购" },
      { position: "3-9", name: "流水号", type: "字符", example: "7330294", description: "盖板玻璃唯一流水号" },
    ],
  },
  {
    id: 7,
    name: "盖板玻璃产品明细",
    location: "下片端",
    source: "Phoenix ID 标签",
    length: "39",
    example: "0000000590034500321001000011000080083",
    fields: [
      { position: "0-2", name: "色调", type: "字符", example: "000", description: "玻璃色调代码" },
      { position: "3-5", name: "镀膜代码", type: "字符", example: "000", description: "无镀膜时为 000" },
      { position: "6-9", name: "厚度", type: "数字", example: "0590", description: "5.9 mm" },
      { position: "10-11", name: "质量等级", type: "字符", example: "03", description: "03 建筑镀膜" },
      { position: "12-16", name: "长度", type: "数字", example: "04500", description: "盖板长度" },
      { position: "17-21", name: "宽度", type: "数字", example: "03210", description: "盖板宽度" },
      { position: "22-23", name: "板垛数量", type: "数字", example: "01", description: "板垛数量" },
      { position: "24-28", name: "每垛片数", type: "数字", example: "00001", description: "每垛总片数" },
      { position: "29-38", name: "物料代码", type: "数字", example: "1000080083", description: "10 位物料代码" },
    ],
  },
];
