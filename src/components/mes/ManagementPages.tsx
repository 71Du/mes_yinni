import { useMemo, useState } from "react";
import { decodeRules, dictionaryItems } from "./documentData";

const SearchIcon = () => (
  <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="m16.5 16.5 4 4" />
  </svg>
);

export function PlanningPage() {
  const [isPulling, setIsPulling] = useState(false);
  const [hasLatestPlan, setHasLatestPlan] = useState(false);
  const [syncMessage, setSyncMessage] = useState("");
  const [selectedPlanNo, setSelectedPlanNo] = useState("800000026");
  const plans = [
    {
      planNo: "800000026",
      line: "CO01",
      item: "10",
      tint: "CLEAR",
      thickness: "5.90 mm",
      dimensions: "3210 × 2250 mm",
      packPerCrate: 23,
      crates: 10,
      sqm: 300,
      tons: "2.10",
      sapCode: "1016419004",
      material: "PLT T 6, 5.90MM",
      productDetail: "PL8023END3210*2250L0L",
      fileName: "800000026.pdf",
      generatedAt: "2026-03-25 05:48:34",
    },
    {
      planNo: "800000027",
      line: "CO01",
      item: "10",
      tint: "CLEAR",
      thickness: "5.90 mm",
      dimensions: "6000 × 3210 mm",
      packPerCrate: 8,
      crates: 10,
      sqm: 300,
      tons: "2.10",
      sapCode: "1016419066",
      material: "PLT T1,3 5.90MM",
      productDetail: "PL8008VEL6000*3210L0L",
      fileName: "800000027.pdf",
      generatedAt: "2026-03-25 05:49:21",
    },
    {
      planNo: "800000029",
      line: "CO01",
      item: "10",
      tint: "CLEAR",
      thickness: "5.90 mm",
      dimensions: "6000 × 3210 mm",
      packPerCrate: 8,
      crates: 14,
      sqm: 421,
      tons: "2.94",
      sapCode: "1072229021",
      material: "SKN176II 5.90MM",
      productDetail: "CL8008VEL6000*3210L0L",
      fileName: "800000029.pdf",
      generatedAt: "2026-03-25 05:49:54",
    },
    {
      planNo: "800000030",
      line: "CO01",
      item: "10",
      tint: "CLEAR",
      thickness: "5.90 mm",
      dimensions: "3210 × 2250 mm",
      packPerCrate: 23,
      crates: 12,
      sqm: 361,
      tons: "2.52",
      sapCode: "1072229008",
      material: "SKN176IIH 5.90MM",
      productDetail: "CL8023VEL3210*2250L0L",
      fileName: "800000030.pdf",
      generatedAt: "2026-03-25 05:50:29",
    },
  ];
  const visiblePlans = hasLatestPlan ? plans : plans.slice(0, 1);
  const selectedPlan =
    visiblePlans.find((plan) => plan.planNo === selectedPlanNo) ?? visiblePlans[0];
  const [planLength, planWidth] = selectedPlan.dimensions
    .replaceAll(" mm", "")
    .split(" × ");
  const productCode = selectedPlan.sapCode.slice(0, 6);
  const fileType = selectedPlan.productDetail.slice(0, 2);
  const packagingCode = selectedPlan.productDetail.slice(2, 6);
  const orientationCode = selectedPlan.productDetail.slice(-1);
  const planFields = [
    ["P01", "生产工厂", "未提供", "缺失"],
    ["P02", "生产线", selectedPlan.line, "已识别"],
    ["P03", "文件类型", fileType, "待确认"],
    ["P04", "计划单号", selectedPlan.planNo.padStart(12, "0"), "已识别"],
    ["P05", "计划行项目", selectedPlan.item.padStart(3, "0"), "已识别"],
    ["P06", "成品产品代码", productCode, "已识别"],
    ["P07", "成品产品描述", selectedPlan.material, "已识别"],
    ["P08", "成品长度", `${planLength} mm`, "已识别"],
    ["P09", "成品宽度", `${planWidth} mm`, "已识别"],
    ["P10", "成品厚度", selectedPlan.thickness, "已识别"],
    ["P11", "产品系列", "未提供", "缺失"],
    ["P12", "产品子系列", "未提供", "缺失"],
    ["P13", "成品色调", selectedPlan.tint, "待确认"],
    ["P14", "成品镀膜", "未提供", "缺失"],
    ["P15", "质量等级", "未提供", "缺失"],
    ["P16", "包装类型", packagingCode, "待确认"],
    ["P17", "片间隔片", "未提供", "缺失"],
    ["P18", "垛间隔垫", "未提供", "缺失"],
    ["P19", "表面处理", "未提供", "缺失"],
    ["P20", "缺陷标识", "未提供", "缺失"],
    ["P21", "朝向", `${orientationCode} · 待确认`, "待确认"],
    ["P22", "成品物料代码", selectedPlan.sapCode, "已识别"],
    [
      "P23",
      "计划数量（片）",
      `${selectedPlan.packPerCrate * selectedPlan.crates}`,
      "计算值",
    ],
    ["P24", "计划板垛数量", `${selectedPlan.crates}`, "待确认"],
    ["P25", "计划面积", `${selectedPlan.sqm} m²`, "已识别"],
    ["P26", "计划开始时间", "未提供", "缺失"],
    ["P27", "计划结束时间", "未提供", "缺失"],
  ];

  const simulateNasPull = () => {
    if (isPulling) return;
    setIsPulling(true);
    setSyncMessage("");
    window.setTimeout(() => {
      setIsPulling(false);
      setHasLatestPlan(true);
      setSelectedPlanNo("800000030");
      setSyncMessage("已扫描 /NAS/Phoenix/Planning，共发现 4 份周计划 PDF；新增 3 条计划，800000026 已存在。");
    }, 1400);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
          ["计划总数", hasLatestPlan ? "4" : "1", "份周计划"],
          ["计划箱数", hasLatestPlan ? "46" : "10", "箱"],
          ["计划面积", hasLatestPlan ? "1,382" : "300", "m²"],
          ["计划吨位", hasLatestPlan ? "9.66" : "2.10", "t"],
        ].map(([label, value, unit], index) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-200/40">
            <p className="text-xs text-slate-400">{label}</p>
            <div className="mt-2 flex items-end gap-2">
              <strong className="text-2xl font-semibold text-slate-900">{value}</strong>
              <span className="mb-0.5 text-xs text-slate-400">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {syncMessage && (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-[11px] font-bold text-white">✓</span>
            <div>
              <p className="font-semibold text-emerald-900">模拟拉取完成</p>
              <p className="mt-1 text-xs leading-5">{syncMessage}</p>
            </div>
          </div>
          <span className="shrink-0 text-xs text-emerald-600">刚刚同步</span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">生产计划</h2>
            <p className="mt-1 text-xs text-slate-400">数据来源：Coater Line Weekly Plan PDF</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={simulateNasPull}
              disabled={isPulling}
              className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-sm shadow-blue-200 transition-colors hover:bg-blue-700 disabled:cursor-wait disabled:bg-blue-400"
            >
              <svg
                aria-hidden="true"
                className={`h-4 w-4 ${isPulling ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12a8 8 0 0 1-14.9 4M4 12A8 8 0 0 1 18.9 8M5 16H2v3m17-11h3V5" />
              </svg>
              {isPulling ? "正在拉取并解析..." : "从 NAS 拉取计划"}
            </button>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400"><SearchIcon /></span>
              <input className="h-9 w-56 rounded-lg border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" placeholder="搜索计划单号或产品" />
            </div>
            <button type="button" className="h-9 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">查询</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <tr>
                <th className="px-5 py-3.5">计划单号</th>
                <th className="px-4 py-3.5">生产线</th>
                <th className="px-4 py-3.5">SAP / 物料</th>
                <th className="px-4 py-3.5">规格</th>
                <th className="px-4 py-3.5">包装</th>
                <th className="px-4 py-3.5">计划量</th>
                <th className="px-4 py-3.5">解析状态</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {visiblePlans.map((plan) => (
                <tr
                  key={plan.planNo}
                  onClick={() => setSelectedPlanNo(plan.planNo)}
                  className={`cursor-pointer border-b border-slate-100 transition-colors hover:bg-blue-50/50 ${
                    selectedPlan.planNo === plan.planNo ? "bg-blue-50/70" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-semibold text-slate-800">{plan.planNo}</p>
                      {hasLatestPlan && plan.planNo === "800000030" && (
                        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">最新</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{plan.fileName}</p>
                  </td>
                  <td className="px-4 py-4 font-medium text-slate-700">{plan.line}</td>
                  <td className="px-4 py-4">
                    <p className="font-mono text-xs font-medium text-slate-700">{plan.sapCode}</p>
                    <p className="mt-1 text-xs text-slate-400">{plan.material}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-slate-600">{plan.dimensions}</p>
                    <p className="mt-1 text-xs text-slate-400">{plan.thickness} · {plan.tint}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-slate-700">{plan.packPerCrate} 片/箱</p>
                    <p className="mt-1 text-xs text-slate-400">{plan.crates} 箱</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-medium text-slate-700">{plan.sqm} m²</p>
                    <p className="mt-1 text-xs text-slate-400">{plan.tons} t</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />解析完成
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">计划字段详情</h2>
            <p className="mt-1 text-xs text-slate-400">
              Phoenix 固定字段 P01–P27 · 来源 {selectedPlan.fileName}
            </p>
          </div>
          <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-500">{selectedPlan.planNo}</span>
        </div>
        <div className="grid grid-cols-3 gap-px bg-slate-100">
          {planFields.map(([field, label, value, status]) => (
            <div key={field} className="bg-white px-4 py-3.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-semibold text-blue-600">{field}</span>
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
                {status !== "已识别" && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] ${
                      status === "缺失"
                        ? "bg-slate-100 text-slate-500"
                        : status === "计算值"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {status}
                  </span>
                )}
              </div>
              <p className="mt-1.5 truncate font-mono text-sm font-medium text-slate-700" title={value}>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function IssueConflictPage() {
  const mappedItems = [
    ["镀膜状态", "000 = 无镀膜", "条码 2、5、7"],
    ["成品镀膜型号", "409 等", "条码 5 的位置 8-10；当前只有 034、052、054、062、552"],
    ["动态包装片数", "011 = 每垛 11 片", "条码 5 的包装/片数字段"],
    ["片间隔片", "1=1 CM、2=2 CM、3=3 CM、4=4 CM、7=ORAE", "条码 5 位置 36"],
    ["垛间隔垫", "2=LUC、3=PAP、4=COL、5=CAO、6=PLX", "条码 5 位置 37"],
    ["包装方式", "007=散放于框架、018=集装架、027=裸装", "已配置，建议保留"],
    ["朝向", "L=纵向、T=横向", "已配置，建议保留"],
    ["表面保护", "0=无、1=锌", "已配置"],
    ["缺陷标识", "0=无", "已配置"],
  ];
  const pendingItems = [
    ["工厂代码", "50、G500", "用于 Phoenix ID、计划文件及 MPIL 文件"],
    ["生产线代码", "CO01、CONL", "用于计划单和 MPIL 文件"],
    ["堆垛机代码", "S1、S2、4029、1014", "需区分堆垛机与板垛代码"],
    ["堆垛机侧别", "RG、CS", "文档没有完整编码说明"],
    ["玻璃位置", "A", "需要确认是否还有 B、C 等位置"],
    ["尺寸类型", "U、D、N、T", "文档没有完整中文含义"],
    ["质量代码", "03=建筑镀膜", "可能还有其他质量等级"],
    ["质量原因", "500、501", "文档没有提供完整名称映射"],
    ["产品系列/子系列/镀膜型号", "409 等", "当前仅覆盖文档中明确展示的部分值"],
    ["文件类型/传输类型", "RG、CS、PL、X", "分别出现在原片、盖板、计划及 MPIL 数据中"],
    ["间隔片/垫块/标识/处理", "0、1、2 等", "除表面保护和缺陷标识外仍缺少映射"],
  ];
  const missingFields = [
    ["11-13", "成品色调"],
    ["17-19", "夹层 / 附加代码"],
    ["24-26", "夹丝、压花或保留字段"],
    ["30-33", "动态包装或每垛片数"],
    ["34", "表面保护"],
    ["35", "缺陷标识"],
    ["36", "片间隔片"],
    ["37", "垛间隔垫"],
  ];
  const normalFields = [
    "产品代码",
    "物料代码",
    "计划单号",
    "ID 标签流水号",
    "长度、宽度、厚度",
    "片数、板垛数量",
    "开始及结束时间",
    "生产日期",
    "唯一玻璃板代码",
  ];
  const priorities = [
    "成品条码位置 30-37 的字典",
    "工厂、生产线、堆垛机字典",
    "完整质量等级字典",
    "完整镀膜型号和产品系列字典",
    "MPIL 的尺寸类型、质量原因、标识和处理字典",
  ];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700">!</div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-amber-950">文档解析问题待确认</h2>
              <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-semibold text-amber-800">临时记录</span>
            </div>
            <p className="mt-1 text-sm leading-6 text-amber-800">
              以下内容暂不写入正式字典和解码配置，待 Phoenix、MES 与业务人员确认后再处理。
            </p>
          </div>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">一、文档已给出映射</h2>
            <p className="mt-1 text-xs text-slate-400">可直接补充或保留的字典项</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">{mappedItems.length} 项</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
              <tr><th className="px-5 py-3">字典</th><th className="px-4 py-3">缺少的编码或内容</th><th className="px-4 py-3">用途</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mappedItems.map(([name, code, usage]) => (
                <tr key={name} className="hover:bg-slate-50/70">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{name}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-blue-700">{code}</td>
                  <td className="px-4 py-3.5 text-slate-500">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-semibold text-slate-900">二、解析需要，但文档只给出编码示例</h2>
          <p className="mt-1 text-xs text-slate-400">需要向 Phoenix、MES 或业务人员确认准确含义</p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-slate-100">
          {pendingItems.map(([name, example, note]) => (
            <div key={name} className="bg-white px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-800">{name}</h3>
                <span className="rounded bg-amber-50 px-2 py-1 font-mono text-[11px] text-amber-700">{example}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">三、当前解码规则 5 缺少的字段</h2>
            <p className="mt-1 text-xs text-slate-400">成品玻璃产品明细 · 62 位条码</p>
          </div>
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">8 处缺口</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {missingFields.map(([position, name]) => (
            <div key={position} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="font-mono text-xs font-semibold text-blue-700">{position}</span>
              <p className="mt-1.5 text-sm font-medium text-slate-700">{name}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">以上字段除位置需要补齐外，还需要关联对应的业务字典。</p>
      </section>

      <section className="grid grid-cols-[1fr_1.2fr] gap-5">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900">四、不是字典的数据</h2>
          <p className="mt-1 text-xs text-slate-400">应作为业务主数据或普通数据字段</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {normalFields.map((field) => (
              <span key={field} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600">{field}</span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-5 shadow-sm">
          <h2 className="font-semibold text-slate-900">建议优先级</h2>
          <p className="mt-1 text-xs text-slate-400">确认与补充顺序</p>
          <ol className="mt-4 space-y-2.5">
            {priorities.map((item, index) => (
              <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-600 text-[11px] font-semibold text-white">{index + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

export function DictionaryPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const categories = ["全部", ...new Set(dictionaryItems.map((item) => item.category))];
  const filteredItems = useMemo(
    () =>
      dictionaryItems.filter((item) => {
        const matchesCategory = activeCategory === "全部" || item.category === activeCategory;
        const keyword = query.trim().toLowerCase();
        const matchesQuery =
          !keyword ||
          [item.category, item.categoryCode, item.code, item.name]
            .join(" ")
            .toLowerCase()
            .includes(keyword);
        return matchesCategory && matchesQuery;
      }),
    [activeCategory, query],
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-4">
        {[
          ["字典分类", `${categories.length - 1}`, "类"],
          ["字典项", `${dictionaryItems.length}`, "项"],
          ["文档版本", "V1.4", "2026-05-11"],
        ].map(([label, value, unit]) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm shadow-slate-200/40">
            <p className="text-xs text-slate-400">{label}</p>
            <div className="mt-2 flex items-end gap-2">
              <strong className="text-2xl font-semibold text-slate-900">{value}</strong>
              <span className="mb-0.5 text-xs text-slate-400">{unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-slate-900">业务字典</h2>
            <p className="mt-1 text-xs text-slate-400">来源：Coater Production MPIL Data V1.4</p>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400"><SearchIcon /></span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-9 w-64 rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="搜索分类、编码或名称"
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto border-b border-slate-100 bg-slate-50/60 px-5 py-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-medium text-slate-500">
              <tr>
                <th className="px-5 py-3.5">字典分类</th>
                <th className="px-4 py-3.5">分类编码</th>
                <th className="px-4 py-3.5">字典值</th>
                <th className="px-4 py-3.5">显示名称</th>
                <th className="px-4 py-3.5">说明</th>
                <th className="px-4 py-3.5">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredItems.map((item) => (
                <tr key={`${item.categoryCode}-${item.code}`} className="hover:bg-blue-50/30">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{item.category}</td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">{item.categoryCode}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex min-w-9 justify-center rounded bg-slate-100 px-2 py-1 font-mono text-xs font-semibold text-slate-700">
                      {item.code}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700">{item.name}</td>
                  <td className="px-4 py-3.5 text-slate-400">{item.description}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />启用
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="py-14 text-center text-sm text-slate-400">未找到匹配的字典项</div>
          )}
        </div>
        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
          当前显示 {filteredItems.length} 条，共 {dictionaryItems.length} 条
        </div>
      </div>
    </div>
  );
}

export function DecodeRulesPage() {
  const [selectedId, setSelectedId] = useState(1);
  const selectedRule = decodeRules.find((rule) => rule.id === selectedId) ?? decodeRules[0];

  return (
    <div className="grid min-h-[560px] grid-cols-[280px_minmax(0,1fr)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <aside className="border-r border-slate-200 bg-slate-50/60">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-900">条码规则</h2>
          <p className="mt-1 text-xs text-slate-400">共 {decodeRules.length} 类条码结构</p>
        </div>
        <div className="space-y-1 p-3">
          {decodeRules.map((rule) => (
            <button
              key={rule.id}
              type="button"
              onClick={() => setSelectedId(rule.id)}
              className={`w-full rounded-lg px-3 py-3 text-left transition-colors ${
                selectedId === rule.id
                  ? "bg-white text-blue-700 shadow-sm ring-1 ring-slate-200"
                  : "text-slate-600 hover:bg-white/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">条码 {rule.id}</span>
                <span className="rounded bg-slate-200/70 px-1.5 py-0.5 text-[10px] text-slate-500">{rule.length} 位</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">{rule.name}</p>
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">条码 {selectedRule.id}</span>
                <span className="text-xs text-slate-400">{selectedRule.location}</span>
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">{selectedRule.name}</h2>
              <p className="mt-1 text-sm text-slate-400">来源：{selectedRule.source}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-right">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">固定长度</p>
              <p className="mt-0.5 text-lg font-semibold text-slate-800">{selectedRule.length} <span className="text-xs font-normal text-slate-400">字符</span></p>
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-[#172033] px-4 py-3">
            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">示例数据</p>
            <code className="break-all font-mono text-sm tracking-wider text-blue-300">{selectedRule.example}</code>
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">字段解析</h3>
            <span className="text-xs text-slate-400">{selectedRule.fields.length} 个字段</span>
          </div>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[680px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-500">
                <tr>
                  <th className="px-4 py-3">位置</th>
                  <th className="px-4 py-3">字段名</th>
                  <th className="px-4 py-3">类型</th>
                  <th className="px-4 py-3">示例</th>
                  <th className="px-4 py-3">解析说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {selectedRule.fields.map((field) => (
                  <tr key={`${selectedRule.id}-${field.position}`} className="hover:bg-blue-50/30">
                    <td className="px-4 py-3">
                      <span className="rounded bg-blue-50 px-2 py-1 font-mono text-xs font-semibold text-blue-700">{field.position}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700">{field.name}</td>
                    <td className="px-4 py-3 text-xs text-slate-400">{field.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{field.example}</td>
                    <td className="px-4 py-3 text-slate-500">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs leading-5 text-amber-800">
            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-amber-400" />
            字段位置按文档从 0 开始计算；厚度字段单位为 1/100 mm，例如 0590 表示 5.9 mm。
          </div>
        </div>
      </div>
    </div>
  );
}
