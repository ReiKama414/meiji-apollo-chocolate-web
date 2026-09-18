# アポロ Apollo

Meiji Apollo 草莓三角巧克力的互動品牌頁面
以紅色、奶油色與巧克力棕構成視覺主軸，包含產品介紹、收藏系列

## 技術

- React 18 + TypeScript
- Vite
- Tailwind CSS
- lucide-react

## 開始使用

```bash
npm install
npm run dev
```

瀏覽器開啟終端機顯示的本機網址即可預覽。

線上頁面：https://reikama414.github.io/meiji-apollo-chocolate-web/

## 指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | 產出正式版建置 |
| `npm run preview` | 預覽建置結果 |
| `npm run lint` | ESLint 檢查 |
| `npm run typecheck` | TypeScript 型別檢查 |

## 專案結構

```
├── public/           # 靜態資源（favicon 等）
├── src/
│   ├── App.tsx       # 主頁面與互動邏輯
│   ├── index.css     # 全域樣式
│   └── main.tsx      # 進入點
├── index.html
├── package.json
└── vite.config.ts
```

## 授權

MIT License — 見 [LICENSE](./LICENSE)
