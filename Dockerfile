# Dockerfile

# Node.js 18 버전을 기반으로 시작
FROM node:18-alpine

# 필요한 빌드 도구들 설치
RUN apk add --no-cache python3 make g++ gcc

# 컨테이너 내부에 앱을 위한 폴더 생성
WORKDIR /usr/src/app

# package.json 파일들을 먼저 복사 (의존성 캐싱)
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 전체 복사
COPY . .

# 서버가 3000번 포트를 사용함을 명시
EXPOSE 3000

# 컨테이너 시작 시 실행할 최종 명령어 (계측 파일 포함)
CMD [ "node", "-r", "./instrumentation.js", "server.js" ]