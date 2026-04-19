export const questions = [
  {
    id: 1,
    question: "在团队活动中，你更倾向于：",
    options: [
      { text: "主动组织和领导大家", weights: { anon: 3, rana: 2, tomori: 0, takamatsu: 1, soyo: 2 } },
      { text: "积极配合，提供支持", weights: { anon: 1, rana: 1, tomori: 2, takamatsu: 2, soyo: 3 } },
      { text: "默默做好自己的事", weights: { anon: 0, rana: 2, tomori: 3, takamatsu: 1, soyo: 1 } }
    ]
  },
  {
    id: 2,
    question: "面对新的挑战，你的态度是：",
    options: [
      { text: "兴奋不已，立即尝试", weights: { anon: 3, rana: 3, tomori: 0, takamatsu: 2, soyo: 1 } },
      { text: "谨慎分析后再决定", weights: { anon: 1, rana: 1, tomori: 2, takamatsu: 3, soyo: 2 } },
      { text: "有点紧张，但愿意尝试", weights: { anon: 1, rana: 1, tomori: 3, takamatsu: 1, soyo: 2 } }
    ]
  },
  {
    id: 3,
    question: "在表达自己的想法时，你通常：",
    options: [
      { text: "直接坦率，有话直说", weights: { anon: 3, rana: 3, tomori: 0, takamatsu: 2, soyo: 1 } },
      { text: "温和委婉，考虑他人感受", weights: { anon: 1, rana: 1, tomori: 2, takamatsu: 1, soyo: 3 } },
      { text: "不太善于表达，常常保持沉默", weights: { anon: 0, rana: 1, tomori: 3, takamatsu: 1, soyo: 1 } }
    ]
  },
  {
    id: 4,
    question: "你对音乐的态度是：",
    options: [
      { text: "热爱到骨子里，愿意为之付出一切", weights: { anon: 2, rana: 3, tomori: 3, takamatsu: 2, soyo: 2 } },
      { text: "很喜欢，是生活中重要的一部分", weights: { anon: 3, rana: 2, tomori: 2, takamatsu: 3, soyo: 3 } },
      { text: "偶尔听听，放松一下", weights: { anon: 1, rana: 0, tomori: 1, takamatsu: 1, soyo: 0 } }
    ]
  },
  {
    id: 5,
    question: "在交友方面，你：",
    options: [
      { text: "非常开朗，很容易交到朋友", weights: { anon: 3, rana: 1, tomori: 0, takamatsu: 2, soyo: 3 } },
      { text: "比较慢热，但对朋友很真诚", weights: { anon: 1, rana: 2, tomori: 2, takamatsu: 3, soyo: 2 } },
      { text: "比较内向，朋友不多但很知心", weights: { anon: 0, rana: 2, tomori: 3, takamatsu: 1, soyo: 1 } }
    ]
  },
  {
    id: 6,
    question: "做决定时，你更依赖：",
    options: [
      { text: "直觉和感觉", weights: { anon: 2, rana: 3, tomori: 3, takamatsu: 1, soyo: 2 } },
      { text: "理性分析和事实", weights: { anon: 2, rana: 1, tomori: 1, takamatsu: 3, soyo: 2 } },
      { text: "他人的建议和意见", weights: { anon: 1, rana: 0, tomori: 1, takamatsu: 1, soyo: 2 } }
    ]
  },
  {
    id: 7,
    question: "面对压力和困难时，你会：",
    options: [
      { text: "积极面对，寻找解决办法", weights: { anon: 3, rana: 3, tomori: 1, takamatsu: 3, soyo: 2 } },
      { text: "有点焦虑，但会努力克服", weights: { anon: 1, rana: 1, tomori: 3, takamatsu: 1, soyo: 2 } },
      { text: "寻求朋友的帮助和支持", weights: { anon: 1, rana: 0, tomori: 2, takamatsu: 1, soyo: 3 } }
    ]
  },
  {
    id: 8,
    question: "在打扮和外表方面，你：",
    options: [
      { text: "很在意，总是想展现最好的自己", weights: { anon: 3, rana: 1, tomori: 1, takamatsu: 2, soyo: 3 } },
      { text: "比较随意，舒适最重要", weights: { anon: 1, rana: 3, tomori: 2, takamatsu: 2, soyo: 1 } },
      { text: "不太在意，只要干净整洁就行", weights: { anon: 0, rana: 2, tomori: 2, takamatsu: 2, soyo: 1 } }
    ]
  },
  {
    id: 9,
    question: "在业余时间，你更愿意：",
    options: [
      { text: "和朋友们一起出去玩", weights: { anon: 3, rana: 2, tomori: 0, takamatsu: 2, soyo: 3 } },
      { text: "做自己喜欢的事情（如练琴、画画）", weights: { anon: 1, rana: 3, tomori: 3, takamatsu: 2, soyo: 1 } },
      { text: "安静地休息或看剧", weights: { anon: 1, rana: 0, tomori: 2, takamatsu: 2, soyo: 1 } }
    ]
  },
  {
    id: 10,
    question: "你对未来的规划是：",
    options: [
      { text: "有明确的目标，并为之努力", weights: { anon: 2, rana: 1, tomori: 1, takamatsu: 3, soyo: 2 } },
      { text: "走一步看一步，享受当下", weights: { anon: 2, rana: 3, tomori: 2, takamatsu: 1, soyo: 1 } },
      { text: "对未来有点迷茫，不太确定", weights: { anon: 1, rana: 1, tomori: 3, takamatsu: 0, soyo: 2 } }
    ]
  },
  {
    id: 11,
    question: "在团队合作中发生矛盾时，你会：",
    options: [
      { text: "直接指出问题，寻求解决", weights: { anon: 3, rana: 3, tomori: 0, takamatsu: 2, soyo: 1 } },
      { text: "从中调解，希望大家和谐相处", weights: { anon: 1, rana: 1, tomori: 2, takamatsu: 1, soyo: 3 } },
      { text: "尽量避开，不参与冲突", weights: { anon: 0, rana: 0, tomori: 3, takamatsu: 1, soyo: 1 } }
    ]
  },
  {
    id: 12,
    question: "你对待失败的态度是：",
    options: [
      { text: "从中吸取教训，下次做得更好", weights: { anon: 2, rana: 2, tomori: 1, takamatsu: 3, soyo: 2 } },
      { text: "虽然难过，但很快会振作起来", weights: { anon: 3, rana: 3, tomori: 2, takamatsu: 1, soyo: 2 } },
      { text: "需要很长时间才能恢复", weights: { anon: 0, rana: 0, tomori: 3, takamatsu: 0, soyo: 1 } }
    ]
  },
  {
    id: 13,
    question: "在表达情感方面，你：",
    options: [
      { text: "很开放，喜怒哀乐都表现在脸上", weights: { anon: 3, rana: 3, tomori: 1, takamatsu: 2, soyo: 1 } },
      { text: "比较含蓄，不会轻易表露", weights: { anon: 1, rana: 1, tomori: 3, takamatsu: 2, soyo: 2 } },
      { text: "不太会表达，习惯用行动表示", weights: { anon: 1, rana: 2, tomori: 2, takamatsu: 2, soyo: 3 } }
    ]
  },
  {
    id: 14,
    question: "你对自己的要求是：",
    options: [
      { text: "很高，追求完美", weights: { anon: 2, rana: 1, tomori: 1, takamatsu: 3, soyo: 2 } },
      { text: "比较宽松，开心最重要", weights: { anon: 3, rana: 3, tomori: 2, takamatsu: 0, soyo: 1 } },
      { text: "有一定要求，但不会太勉强自己", weights: { anon: 1, rana: 1, tomori: 2, takamatsu: 2, soyo: 3 } }
    ]
  },
  {
    id: 15,
    question: "在学习新东西时，你：",
    options: [
      { text: "很快就能上手", weights: { anon: 3, rana: 3, tomori: 1, takamatsu: 2, soyo: 1 } },
      { text: "需要练习，但会慢慢掌握", weights: { anon: 1, rana: 1, tomori: 2, takamatsu: 3, soyo: 3 } },
      { text: "比较慢，但很认真", weights: { anon: 0, rana: 0, tomori: 3, takamatsu: 1, soyo: 1 } }
    ]
  },
  {
    id: 16,
    question: "你对周围人的情绪变化：",
    options: [
      { text: "很敏感，能察觉到细微变化", weights: { anon: 1, rana: 1, tomori: 3, takamatsu: 1, soyo: 3 } },
      { text: "能察觉到，但不太在意", weights: { anon: 2, rana: 3, tomori: 1, takamatsu: 2, soyo: 1 } },
      { text: "不太能察觉到", weights: { anon: 2, rana: 2, tomori: 0, takamatsu: 2, soyo: 0 } }
    ]
  },
  {
    id: 17,
    question: "在人群中，你通常：",
    options: [
      { text: "成为焦点，很活跃", weights: { anon: 3, rana: 2, tomori: 0, takamatsu: 1, soyo: 2 } },
      { text: "和熟悉的人聊天", weights: { anon: 1, rana: 2, tomori: 2, takamatsu: 2, soyo: 2 } },
      { text: "待在角落，观察别人", weights: { anon: 0, rana: 1, tomori: 3, takamatsu: 2, soyo: 1 } }
    ]
  },
  {
    id: 18,
    question: "你对规则和纪律的态度是：",
    options: [
      { text: "严格遵守，认为很重要", weights: { anon: 1, rana: 0, tomori: 2, takamatsu: 3, soyo: 2 } },
      { text: "视情况而定，灵活处理", weights: { anon: 3, rana: 2, tomori: 1, takamatsu: 1, soyo: 2 } },
      { text: "不太喜欢被约束", weights: { anon: 2, rana: 3, tomori: 2, takamatsu: 0, soyo: 1 } }
    ]
  },
  {
    id: 19,
    question: "在做事情时，你更注重：",
    options: [
      { text: "结果和效率", weights: { anon: 2, rana: 1, tomori: 1, takamatsu: 3, soyo: 2 } },
      { text: "过程和体验", weights: { anon: 2, rana: 3, tomori: 2, takamatsu: 1, soyo: 1 } },
      { text: "细节和质量", weights: { anon: 1, rana: 2, tomori: 2, takamatsu: 2, soyo: 3 } }
    ]
  },
  {
    id: 20,
    question: "如果可以选择，你希望拥有：",
    options: [
      { text: "很多朋友，热闹的生活", weights: { anon: 3, rana: 2, tomori: 1, takamatsu: 1, soyo: 3 } },
      { text: "一两个知心朋友，简单的生活", weights: { anon: 1, rana: 1, tomori: 3, takamatsu: 2, soyo: 2 } },
      { text: "才华和能力，实现自己的梦想", weights: { anon: 1, rana: 3, tomori: 2, takamatsu: 3, soyo: 1 } }
    ]
  }
];
