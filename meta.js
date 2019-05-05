module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "platform": {
      "type": "list",
      "message": "Platform",
      "choices": [
        {
          "name": "PC",
          "value": "midea",
          "short": "midea"
        },
        {
          "name": "微信",
          "value": "wechat",
          "short": "wechat"
        },
        {
            "name": "PC",
            "value": "pc",
            "short": "pc"
        }
      ]
    },
    "identifier": {
      "when": "platform == 'midea'",
      "type": "string",
      "required": false,
      "message": "Project identifier",
      "default": "com.midea.msd.identifier"
    }
  },
  "filters": {
      "CubeModule.json": "platform == 'midea'"
  },
  "skipInterpolation": "src/**/!(base.page).vue",
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev"
};