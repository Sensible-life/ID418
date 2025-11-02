# 배포 가이드

## 🚀 방법 1: Vercel (추천 - 가장 쉬움)

### 단계:
1. **GitHub에 코드 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin [YOUR_GITHUB_REPO_URL]
   git push -u origin main
   ```

2. **Vercel 배포**
   - https://vercel.com 접속
   - GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 프로젝트 설정:
     - Framework Preset: Vite
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - "Deploy" 클릭
   - 완료! 자동으로 URL 제공 (예: `your-project.vercel.app`)

### 장점:
- ✅ 완전 무료
- ✅ 자동 HTTPS
- ✅ 자동 배포 (GitHub push 시 자동 업데이트)
- ✅ 커스텀 도메인 지원
- ✅ 설정이 매우 간단

---

## 🌐 방법 2: Netlify

### 단계:
1. **GitHub에 코드 업로드** (위와 동일)

2. **Netlify 배포**
   - https://netlify.com 접속
   - GitHub 계정으로 로그인
   - "Add new site" → "Import an existing project"
   - GitHub 저장소 선택
   - 빌드 설정:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - "Deploy site" 클릭
   - 완료!

### 장점:
- ✅ 완전 무료
- ✅ 자동 HTTPS
- ✅ 자동 배포
- ✅ 커스텀 도메인 지원

---

## 📦 방법 3: GitHub Pages

### 단계:
1. **vite.config.js에 base 경로 추가**
   ```js
   export default defineConfig({
     base: '/InClassTutorial/',  // GitHub 저장소 이름과 동일하게
     plugins: [react()],
   })
   ```

2. **GitHub Actions 설정 파일 생성**
   `.github/workflows/deploy.yml` 파일 생성:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **GitHub 저장소 설정**
   - Settings → Pages
   - Source: GitHub Actions 선택
   - 완료 후 `https://[USERNAME].github.io/InClassTutorial` 에서 접속 가능

### 장점:
- ✅ 완전 무료
- ✅ GitHub와 통합

### 단점:
- ⚠️ 설정이 약간 복잡함

---

## 🎯 빠른 시작 (Vercel 추천)

1. GitHub에 코드 업로드
2. Vercel 접속 → GitHub 저장소 연결 → Deploy
3. 끝!

---
