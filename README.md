# Nest.js 인증/인가 서버 구현

간단한 가입, 로그인, 및 토큰 재발급 로직이 구현되어 있습니다.

Visual Studio Code Extension 중 REST Client를 사용하시어 .http에 있는 명령어들을 사용하시면 편하게 테스트 하실 수 있습니다.

총 4개의 api endpoint가 있습니다.

- POST ```/user``` : 회원가입입니다.
- POST ```/login```: 로그인입니다.
- GET ```/me```: 자신의 정보를 불러옵니다. accessToken을 확인합니다.
- POST ```/refresh```: refreshToken을 기반으로 새 accessToken, refreshToken을 발급합니다.


