node -v v16.16.0
npm -v 8.11.0

### vite
 ts用のコマンドで

```
# npm6以下
npm init vite@latest プロジェクト名 --template vue-ts
# npm7以上 (推奨)
npm init vite@latest プロジェクト名 -- --template vue-ts
```



### Element Plus
Element UIに親しんでいるので、vue3でもこれならやりやすいので選定
 

### router

最初3を入れてみた

`下記でエラーになるし、router/index.tsに記載してもルーティングができない。`
```javascript
import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'

const app = createApp(App);
app.use(router) // ここでArgument of type 'VueRouter' is not assignable to parameter of type 'Plugin_2'.
app.mount('#app')

```
router as anyにしてコンパイルは通っていたが、結局ここが原因だった
npm install vue-router@4でやり直したら、as any無くても行ける様になった

### axios
`npm install axios --saveでモジュール 'axios' またはそれに対応する型宣言が見つかりません。エラー`
VS code再起動で直った

`axiosでgetしてみたらCORSエラー`

最初ぐぐると結構出てくるvue.config.jsに色々書いてみたが、効いていない様子


```javascript
module.exports = {
 devServer: {
   proxy: "https://sample.co.jp"
 }
};

```

viteで検索してみたら、違うものがヒット！こちらを作成して解消

 ```javascript
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
export default defineConfig({
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
  plugins: [vue()],
})
 ```

