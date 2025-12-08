<div align="center">

# 🛍️ 중고장터  
Next.js 15 + Tailwind CSS 기반의 중고거래 플랫폼

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.x-blue?logo=tailwindcss)](https://tailwindcss.com/)
[![Deploy-Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://used-market.vercel.app/)

</div>


## 🔗 링크

👉 **[사이트 바로가기](https://used-market.vercel.app/)** </br>
👉 **[프로젝트 문서](https://tl9434.notion.site/248857f73381809db40ae93ce49cce05)**

<p align="center">
  <img src="https://github.com/HarryKim24/used-market/raw/main/public/중고마켓-홈.png" width="800">
</p>

## ✨ 주요 기능

- 📦 **사용자 로그인·회원가입, 프로필 관리**
- 🔍 **중고상품 게시글 CURD, 카테고리 검색 및 페이지네이션**
- 💬 **구매자와 판매자 간 실시간 1:1 대화**
- ❤️ **관심 상품 등록 및 목록 확인**
- 📱 **Kakao 지도 기반 거래 위치 선택 및 지도 시각화**


## 🛠 기술 스택

| 구분 | 사용 기술 |
|------|------------|
| **Frontend** | [Next.js 15](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) |
| **Database** | MongoDB Atlas, Cloudinary |
| **지도 API** | [Kakao Maps JavaScript API](https://apis.map.kakao.com/) |
| **배포** | [Vercel](https://vercel.com/) |


## 📁 폴더 구조

```bash
src/
├── app/
│   ├── (home)/             # 홈 페이지 라우트
│   ├── actions/            # 서버 액션 및 데이터 처리 함수
│   ├── api/                # API 라우트
│   ├── (auth)/             # 로그인, 회원가입 등 인증 관련
│   │   ├── login/
│   │   └── register/          
│   ├── chat/               # 사용자 간 채팅 기능
│   ├── productcs/          # 상품 등록, 수정 페이지
│   │   ├── [productId]/
│   │   └── [upload]/         
│   └── profile/            # 프로필 페이지
├── components/             # UI 컴포넌트
├── helpers/                # 유틸 함수
├── hooks/                  # 커스텀 훅
└── types/                  # 타입 정의
```

## 👤 제작자

| 이름        | GitHub                                       | 이메일                                         |
| --------- | -------------------------------------------- | ------------------------------------------- |
| Harry Kim | [@HarryKim24](https://github.com/HarryKim24) | [tl9434@naver.com](mailto:tl9434@naver.com) |
