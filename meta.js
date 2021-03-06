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
    "identifier": {
      "type": "string",
      "required": false,
      "message": "Project identifier",
      "default": "com.bgy.identifier"
    }
  },
  "skipInterpolation": "src/**/!(base.page).vue",
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run serve"
};
