## 블로그

http://dakoo.github.io/RESTAPI-joi-sample

---

[joi](https://github.com/hapijs/joi)는 HTTP 요청과 json 포맷이 올바른지 검사하는 hapi 유틸리티이다. 입력의 유효성을 검사하여 문제가 있을 경우 Invalid Request라는 응답을 수행한다. REST API 서버에 joi를 적용한 예제를 살펴보자.  

## 준비 

[Hapi와 mongoDB를 이용한 간단 REST API 구현 예제(2)](http://dakoo.github.io/simple-restapi-using-hapi-mongodb-sample-2/) 와 [프로젝트](https://github.com/dakoo/simple-restapi-using-hapi-mongodb-sample)를 시작 포인트로 삼아 진행하자. 프로젝트를 fork하여 새로운 프로젝트를 만들거나, clone을 한다. clone URL은 아래와 같다.

>https://github.com/dakoo/simple-restapi-using-hapi-mongodb-sample.git

## joi를 사용하지 않은 경우 

server 폴더에서 `node .`로 서버를 실행시킨 후, 크롬 브라우저를 실행한다. HTTP 테스트 클라이언트 크롬 앱를 이용해 GET 메시지로 email이 아닌 값으로 사용자 정보 획득을 시도해 본다.  

- 주소: *localhost:3001/user/notemail*
- method: *GET*
- Header: *Content-Type: application/json* 

그 결과로, 서버를 실행한 Command Prompt에는 exception이 발생한 내용이 출력이 되고, 
HTTP 테스트 클라이언트로는 다음과 같은 응답을 받는다. 

>HTTP/1.1 500 Internal Server Error
>{"statusCode":500,"error":"Internal Server Error","message":"An internal server error occurred"}

클라이언트가 잘못된 요청을 보냈음에도, 서버는 데이터베이스 처리까지 수행한 후 에러가 발생하자 에러코드를 응답으로 보낸 것이다. 

## joi 설치 

Command Promt로 server 폴더에서 `npm install --save-dev joi` 명령을 실행해서 joi를 설치한다. 

## joi 적용 

### 요청의 유효성 요구사항 도출

route.js에는 handler만 등록되어 있는데 그 handler를 실행시키기 전에 요청을 검사하는 단계를 추가할 것이다. API를 정의할 때 어떤 입력이 유효한 입력인지 함께 정의한다. [Hapi와 mongoDB를 이용한 간단 REST API 구현 예제(1)](http://dakoo.github.io/simple-restapi-using-hapi-mongodb-sample-1/)의 API 정의 단계로 다시 돌아가서 유효한 입력 조건을 다음과 같이 정해보자. 

1. 사용자 추가(Create)
- body(payload)는 json 포맷으로 email, username, nickname이 모두 있어야 함
- email은 반드시 email format
- username과 nickname은 모두 string이여야 하고 최소 2글자 이상, 최대 20글자 이하
2. 사용자 목록 얻기(Retrieve)
3. 사용자 정보 얻기(Retrieve)
- param에 반드시 email이 있어야 함
- email은 반드시 email format
4. 사용자 수정(Update)
- param에 반드시 email이 있어야 함
- email은 반드시 email format
5. 사용자 삭제(Delete)
- param에 반드시 email이 있어야 함
- email은 반드시 email format

### 요구사항 구현

joi를 활용하여 유효성 조건을 구현한다. [joi 문서](https://github.com/hapijs/joi#stringemailoptions)를 참조하여 server\plugins폴더에 **userval.js**파일을 아래와 같이 만들었다. 

### 적용

이제 server\plugins폴더의 route.js에 유효성 검사하는 내용을 추가한다. 유효성을 만족시키지 못하면 **Bad Request** 응답이 클라이언트에 전달 될 것이다. 

## 테스트 

server 폴더에서 `node .`로 서버를 실행시킨 후, 크롬 브라우저를 실행한다. HTTP 테스트 클라이언트 크롬 앱를 이용해 GET 메시지로 존재하지 않는 사용자 정보를 획득해 본다. 

- 주소: *localhost:3001/user/notemail*
- method: *GET*
- Header: *Content-Type: application/json* 

그 결과로, 서버를 실행한 Command Prompt에는 exception이 발생한 내용이 출력이 되고, 
HTTP 테스트 클라이언트로는 다음과 같은 응답을 받는다. 

>HTTP/1.1 400 Bad Request
>{"statusCode":400,"error":"Bad Request","message":"child \"email\" fails because [\"email\" must be a valid email]","validation":{"source":"params","keys":["email"]}}

 joi를 사용하지 않은 경우와 비교해 본다면 다음과 같은 이득을 알 수 있다. 

- 에러 코드가 정확하다. (Bad Request)
- 잘못된 요청을 처리 없이 바로 걸러 낼수 있다. 
- 에러가 왜 발생했는지에 대한 정보가 제공된다. 






