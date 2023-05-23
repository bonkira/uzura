import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // `mode` に基づいて現在の作業ディレクトリにある env ファイルをロードする
  // `VITE_` プレフィックスに関係なく全ての環境変数をロードするには、第 3 引数に '' を設定します
  const env = loadEnv(mode, process.cwd(), '')
  if (command === 'serve') {
    return {
      // localhost固有の設定
      server: {
        proxy: {
          "/bff": {
            target: "http://localhost:8080/tsubame/bff",
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/bff/, ""),
          },
        },
      },
      plugins: [vue()]
    }
  } else {
    return {
      plugins: [vue()]
    }
  }
})
