// 直接在文件中定义类型，避免循环导入
export interface XMLTemplate {
  id: string;
  name: string;
  category: 'basic' | 'image' | 'text' | 'writer' | 'video';
  description: string;
  content: string;
  variables: TemplateVariable[];
  tags: string[];
  version: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'number' | 'boolean';
  defaultValue: string;
  description: string;
  required: boolean;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  templates: XMLTemplate[];
}

export const presetTemplates: XMLTemplate[] = [
  {
    id: 'chinese-qa-assistant',
    name: 'Chinese QA Assistant',
    description: '中文问答助手模板，提供准确、简洁、友好的回答',
    category: 'basic',
    content: `<prompt>
  <system>
    <role>中文问答助手</role>
    <skills>准确、简洁、友好</skills>
  </system>
  <input>{{query}}</input>
  <output>Markdown</output>
</prompt>`,
    variables: [
      {
        name: 'query',
        type: 'string',
        defaultValue: '{{query}}',
        description: '用户的问题或查询',
        required: true,
      },
    ],
    tags: ['中文', '问答', '助手', '基础'],
    version: '1.0.0',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'image-generation',
    name: 'Image Generation',
    description: '图像生成提示词模板',
    category: 'image',
    content: `<prompt>
  <system>
    <role>Image Generator</role>
    <style>{{style}}</style>
    <quality>high</quality>
  </system>
  <input>Create an image of {{description}}</input>
  <output>Image</output>
  <parameters>
    <width>{{width}}</width>
    <height>{{height}}</height>
    <format>{{format}}</format>
  </parameters>
</prompt>`,
    variables: [
      {
        name: 'style',
        type: 'string',
        defaultValue: 'Photorealistic',
        description: '图像风格',
        required: false,
      },
      {
        name: 'description',
        type: 'string',
        defaultValue: '{{description}}',
        description: '图像描述',
        required: true,
      },
      {
        name: 'width',
        type: 'number',
        defaultValue: '1024',
        description: '图像宽度',
        required: false,
      },
      {
        name: 'height',
        type: 'number',
        defaultValue: '1024',
        description: '图像高度',
        required: false,
      },
      {
        name: 'format',
        type: 'string',
        defaultValue: 'PNG',
        description: '图像格式',
        required: false,
      },
    ],
    tags: ['图像', '生成', 'AI', '艺术'],
    version: '1.0.0',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'text-summarizer',
    name: 'Text Summarizer',
    description: '文本摘要生成模板',
    category: 'text',
    content: `<prompt>
  <system>
    <role>Text Summarizer</role>
    <task>Summarize the given text</task>
    <style>{{style}}</style>
  </system>
  <input>{{text}}</input>
  <output>Summary</output>
  <constraints>
    <maxLength>{{maxLength}}</maxLength>
    <focus>{{focus}}</focus>
  </constraints>
</prompt>`,
    variables: [
      {
        name: 'text',
        type: 'string',
        defaultValue: '{{text}}',
        description: '需要摘要的文本',
        required: true,
      },
      {
        name: 'style',
        type: 'string',
        defaultValue: 'Concise',
        description: '摘要风格',
        required: false,
      },
      {
        name: 'maxLength',
        type: 'number',
        defaultValue: '200',
        description: '最大长度',
        required: false,
      },
      {
        name: 'focus',
        type: 'string',
        defaultValue: 'Key points',
        description: '摘要重点',
        required: false,
      },
    ],
    tags: ['文本', '摘要', '处理', 'AI'],
    version: '1.0.0',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

export const templateCategories = [
  {
    id: 'basic',
    name: 'Basic',
    description: '基础模板，适用于常见场景',
    icon: '📝',
    templates: presetTemplates.filter(t => t.category === 'basic'),
  },
  {
    id: 'image',
    name: 'Image',
    description: '图像生成相关模板',
    icon: '🖼️',
    templates: presetTemplates.filter(t => t.category === 'image'),
  },
  {
    id: 'text',
    name: 'Text',
    description: '文本处理相关模板',
    icon: '📄',
    templates: presetTemplates.filter(t => t.category === 'text'),
  },
  {
    id: 'writer',
    name: 'Writer',
    description: '写作辅助模板',
    icon: '✍️',
    templates: presetTemplates.filter(t => t.category === 'writer'),
  },
  {
    id: 'video',
    name: 'Video',
    description: '视频相关模板',
    icon: '🎥',
    templates: presetTemplates.filter(t => t.category === 'video'),
  },
];
