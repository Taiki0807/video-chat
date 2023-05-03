# Video Chat

## 導入ライブラリー

- eslint (構文チェック)
- prettier (コードの整形)
- Next.js (React フレームワーク)
- jest (テストツール)
- storybook (UI コンポーネントのテストや管理)
- TypeScript(型導入)
- husky (Git 操作自動制約)
- hygen (コンポーネントの自動生成)
- lint-staged (コミット時に lint,型チェック実行)

## npm script

```
# 開発モード起動
npm run dev
# ビルド
npm run build
# 本番モード起動
npm run start
# コードチェック
npm run lint
# テスト
npm test
# StoryBook起動
npm run storybook
# StoryBookビルド
npm run build-storybook
# コンポーネント生成
npm run fc:new
# コード整形
npm run format
# コードを修正
npm run lint:fix
# 型チェック
npm run type-check
```

## コミットメッセージ

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) の規則にしたがってコミットメッセージを記述してください。

## ディレクトリ構成

### app/components/

各コンポーネントを配置

- pages - レイアウトを行うディレクトリ
- features - API 通信や状態がある、ロジックがある、再利用性があるコンポーネント
- parts - 状態を持たない、再利用性があるコンポーネント

### types

型定義ファイルを配置

ディレクトリ構造はこの [GitHub レポジトリ](https://github.com/fumi-sagawa/next-simple-template/blob/main/docs/directory-structure.md)を参考
