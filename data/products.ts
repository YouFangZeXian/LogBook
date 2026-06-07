export type ProductItem = {
  title: string;
  price: string;
  description: string;
  highlights: string[];
  status: "即将上线";
};

export const productItems: ProductItem[] = [
  {
    title: "《AI 订阅避坑清单》",
    price: "9.9 元",
    description: "适合第一次准备付费的人，先把最容易踩的坑排掉。",
    highlights: ["订阅前检查清单", "支付失败排查路径", "风控与账号提醒"],
    status: "即将上线",
  },
  {
    title: "《美区 Apple ID + 礼品卡使用指南》",
    price: "19.9 元",
    description: "聚焦 Apple 路线，从注册到充值到使用边界，一次讲清。",
    highlights: ["Apple ID 使用边界", "礼品卡充值顺序", "常见风控提示"],
    status: "即将上线",
  },
  {
    title: "《学生低成本 AI 工具组合方案》",
    price: "39.9 元",
    description: "预算有限也能把常用学习、写作、开发场景跑起来。",
    highlights: ["按预算分层推荐", "按场景组合工具", "长期成本控制建议"],
    status: "即将上线",
  },
];
