"use client";

import { useState } from "react";
import {
  DecodeRulesPage,
  DictionaryPage,
  IssueConflictPage,
  PlanningPage,
} from "./ManagementPages";

const PlanningIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 3v3m8-3v3M4.5 9.5h15M6.5 5h11a2 2 0 0 1 2 2v11.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm2 8h3m-3 3.5h6"
    />
  </svg>
);

const DictionaryIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.5 4.5h11a2 2 0 0 1 2 2v13h-11a2 2 0 0 1-2-2v-13Zm0 0v13a2 2 0 0 0 2 2M9 8.5h6m-6 3.5h6m-6 3.5h3.5"
    />
  </svg>
);

const DecodeIcon = () => (
  <svg
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.5 7-4 5 4 5m7-10 4 5-4 5M14 4l-4 16"
    />
  </svg>
);

const ConflictIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 4.3 3.2 17a2 2 0 0 0 1.8 3h14a2 2 0 0 0 1.8-3L13.7 4.3a2 2 0 0 0-3.4 0Z" />
  </svg>
);

const menuItems = [
  {
    id: "planning",
    group: "生产运营",
    label: "计划管理",
    description: "统一管理生产计划、排程与执行进度。",
    english: "Planning Management",
    icon: <PlanningIcon />,
  },
  {
    id: "dictionary",
    group: "系统管理",
    label: "字典管理",
    description: "维护系统业务字典、编码规则与基础数据。",
    english: "Dictionary Management",
    icon: <DictionaryIcon />,
  },
  {
    id: "decode",
    group: "系统管理",
    label: "解码规则",
    description: "管理系统解码规则、转换配置与数据映射。",
    english: "Decode Rules",
    icon: <DecodeIcon />,
  },
  {
    id: "conflicts",
    group: "系统管理",
    label: "问题冲突",
    description: "临时记录文档解析过程中发现的缺失信息与待确认项。",
    english: "Issue Conflicts",
    icon: <ConflictIcon />,
  },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState("planning");
  const activeItem = menuItems.find((item) => item.id === activeMenu) ?? menuItems[0];

  return (
    <div className="flex min-h-screen bg-[#f5f7fa] text-slate-800">
      <aside className="flex w-64 shrink-0 flex-col bg-[#172033] text-white">
        <div className="flex h-16 items-center border-b border-white/8 px-6">
          <div className="mr-3 grid h-8 w-8 place-items-center rounded-lg bg-blue-500 text-sm font-bold shadow-lg shadow-blue-950/30">
            M
          </div>
          <div>
            <div className="text-[15px] font-semibold tracking-wide">MES 制造执行系统</div>
            <div className="mt-0.5 text-[10px] tracking-[0.18em] text-slate-400">
              MANUFACTURING
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5" aria-label="主菜单">
          {["生产运营", "系统管理"].map((group, index) => (
            <div key={group} className={index > 0 ? "mt-6" : ""}>
              <p className="mb-2 px-3 text-[11px] font-medium tracking-[0.12em] text-slate-500">
                {group}
              </p>
              {menuItems
                .filter((item) => item.group === group)
                .map((item) => {
                  const isActive = activeMenu === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveMenu(item.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-left text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-blue-500 text-white shadow-md shadow-blue-950/20"
                          : "text-slate-300 hover:bg-white/6 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/80" />
                      )}
                    </button>
                  );
                })}
            </div>
          ))}
        </nav>

        <div className="border-t border-white/8 px-5 py-4 text-xs text-slate-500">
          MES Management System
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>{activeItem.group}</span>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">{activeItem.label}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              管
            </div>
            <span className="text-sm text-slate-600">系统管理员</span>
          </div>
        </header>

        <section className="p-8">
          <div className="mb-7">
            <p className="mb-1 text-sm font-medium text-blue-600">{activeItem.english}</p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {activeItem.label}
            </h1>
            <p className="mt-2 text-sm text-slate-500">{activeItem.description}</p>
          </div>

          {activeMenu === "planning" ? (
            <PlanningPage />
          ) : activeMenu === "dictionary" ? (
            <DictionaryPage />
          ) : activeMenu === "decode" ? (
            <DecodeRulesPage />
          ) : activeMenu === "conflicts" ? (
            <IssueConflictPage />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm shadow-slate-200/40">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue-600">
                {activeItem.icon}
              </div>
              <h2 className="text-base font-semibold text-slate-800">{activeItem.label}</h2>
              <p className="mt-2 text-sm text-slate-400">功能内容将在后续步骤中完善</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
