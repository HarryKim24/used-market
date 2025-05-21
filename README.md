# 🛍️ 중고장터

Next.js 15과 Tailwind CSS를 기반으로 만든 간편하고 직관적인 중고거래 웹 애플리케이션입니다.  
사용자는 중고 물품을 등록하고, 관심 상품을 저장하며, 다른 사용자와 실시간으로 채팅할 수 있습니다.

## 🔗 링크

👉 바로가기 - https://used-market.vercel.app/

![중고마켓 이미지](https://github.com/user-attachments/assets/d9f24935-dd50-4d71-9be5-e3bb4d8dbb43)

## ✨ 주요 기능

- 📦 중고 물품 등록, 수정, 삭제
- 🔍 키워드 기반 검색 및 필터
- 💬 실시간 채팅
- ❤️ 관심 상품 등록 및 목록 확인
- 📱 반응형 UI 지원

## 🛠 기술 스택

- **Frontend**: [Next.js 15](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Database**: (예: MongoDB Atlas)
- **배포**: Vercel

## 📁 폴더 구조

```bash
src/
├── app/
│   ├── (home)/             # 홈 페이지 라우트
│   ├── actions/            # 서버 액션 및 데이터 처리 함수
│   ├── api/                # API 라우트
│   ├── auth/               # 로그인, 회원가입 등 인증 관련
│   ├── chat/               # 사용자 간 채팅 기능
│   ├── productcs/          # 상품 상세, 등록, 수정 페이지
│   ├── profile/            # 프로필 페이지 및 사용자 정보
│
├── components/             # 공통 및 페이지 UI 컴포넌트
├── helpers/                # 날짜/포맷팅 등 유틸 함수
├── hooks/                  # 커스텀 훅 (useFavorite.ts)
├── types/                  # TypeScript 타입 정의
├── middleware.ts           # 인증/리다이렉션 등 미들웨어 처리
```

## 👤 제작자

- GitHub: HarryKim24
- Email: tl9434@naver.com
