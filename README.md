<<<<<<< HEAD
---
layout: post
title: 간단 hapi plugin 예제
description:  간단 hapi plugin 예제
modified: 2015-07-08
---

[hapi plugin](http://hapijs.com/tutorials/plugins)은 서버의 비지니스 로직과 같은 웹 어플리케이션들을 재사용 가능한 조각으로 분리할 수 있게 하는 강력한 모듈이다. 그 간단한 예제를 살펴보자. 

## 준비 

[hapi.js를 이용한 multi-port 지원 서버 예제 프로젝트](https://github.com/dakoo/simple-multi-port-hapi-server-sample)를 시작 포인트로 삼아 진행하자. 프로젝트를 fork하여 새로운 프로젝트를 만들거나, clone을 한다. clone URL은 아래와 같다.

>https://github.com/dakoo/simple-multi-port-hapi-server-sample.git
 
## 서버 코드

### route.js와 handler.js의 plugin화 

[예제 프로젝트](https://github.com/dakoo/simple-multi-port-hapi-server-sample)에서 route.js와 handlers.js이 routing을 담당한다. server 폴더 아래에 plugins 폴더를 만들고 route.js와 handlers.js를 옮겼다. 그리고, route.js를 수정해서 plugin을 만들었다.   
<u>기존 index.js에 있던 routing 관련 내용을 가져와서 모듈화</u>했다. 
    

### 서버 구동을 담당하는 index.js

index.js에서는 connection 부분과 routing 부분을 plugin으로 호출하도록 수정하였다.   

## 테스트

server 폴더에서 `node .` 명령을 통해 서버를 구동하고 크롬 브라우저에서 *http://localhost:3000/* 주소와 *http://localhost:3001/* 주소로 접근해 본다.
3000으로 접근하면 client폴더의 index.html이 읽히고, 3001로 접근하면 api.html이 읽힌다.  

궁금한 점이나 수정이 필요한 점은 [프로젝트의 issue](https://github.com/dakoo/simple-hapi-plugin-sample/issues)를 통해 알려주시기 바랍니다. 성심껏 답변드리고 반영하겠습니다. 
=======
Hapi와 mongoDB를 이용하여 간단한 REST API 서버를 구현하는 방법을 알아보자. 가장 기본이라 할 수 있는 데이터의 CRUD(Create, Retrieve, Update, Delete)를 위한 API를 어떻게 구현하는지 이해한다면 더 복잡한 operation의 구현도 가능할 것이다. 

## 준비 

[블로그 글](http://dakoo.github.io/hapi/windows-mongodb/)을 참조하여 Windows에 MongoDB를 설치하고 백그라운드 서비스로 동작시킨다. 

## REST API 설계

예제 서비스는 사용자 주소록으로 가정하자. 사용자 주소록은 이메일 주소, 사용자의 이름, 닉네임을 하나의 Document로 저장한다. Document는 RDBMS의 Row에 해당하는 개념이다. 

### 기능 

주소록 서버의 지원하는 기능은 다음과 같다. 

- 사용자 추가(Create):  이메일 주소, 사용자의 이름, 닉네임을 등록. 이메일 주소는 unique하다고 가정. 
- 사용자 목록 얻기(Retrieve): 사용자들의 email 목록을 획득.
- 사용자 정보 얻기(Retrieve):이메일 주소를 이용해 요청. 사용자가 목록에 존재하면 이메일, 이름, 닉네임을 응답
- 사용자 수정(Update): 이메일 주소를 이용해 요청.  이메일 주소, 사용자의 이름, 닉네임을 모두 수정 가능. 
- 사용자 삭제(Delete): 이메일을 이용해 요청.

### API 정의 

이메일 주소, 사용자 이름, 닉네임의 담는 정보는 아래와 같은 JSON 포맷으로 전달되어진다.

>{"email":"sampleid@sample.com", "username":"Hochul Shin", "nickname": "dakoo"} 

서버의 API는 다음과 같이 정의된다. [RESTful API Method의 알맞은 역할 문서](http://blog.remotty.com/blog/2014/01/28/lets-study-rest/#method)를 참조해서 정의했다. 모두 요청시 *Content-Type:application/json*으로 정의한다.   
 
- 사용자 추가(Create): POST, */user*, body payload: {email, username, nickname}, 성공시 201:Created 응답
- 사용자 목록 얻기(Retrieve): GET, */users*, 성공시 200:OK와 JSON으로 email 목록 응답
- 사용자 정보 얻기(Retrieve):GET, */user/{email}*, 성공시 200:OK와 JSON으로 {email, username, nickname} 응답 
- 사용자 수정(Update): PATCH, */user/{email}*, body payload: {username, nickname}, 성공시 200:OK 응답
- 사용자 삭제(Delete): DELETE, */user/{email}*, 성공시 200:OK 응답 

## DB와 Collection 생성

### DB 생성

예제 REST API와 연동할 DB 공간을 MongoDB 서비스에 만든다. **mongo.exe**가 있는 폴더(*C:\mongodb\bin*)에서 Command Prompt에서 `mongo.exe`명령을 통해 **monogdb shell**을 구동한다. Shell에서 `use [db 이름]` 명령을 실행해서 서비스를 위한 DB 공간을 할당한다. 

>use user-db

이제 Shell상의 *db* 키워드는 *user-db*를 가리키게 된다.

### Collection 생성

MongoDB에서 RDBMS의 table이란 개념에 해당하는 collection을 만든다. collection내의 item을 추가하면서 자연스럽게 collection은 생성해보자. 
샘플 아이템을 하나 추가하면서 users라는 collection을 만들어 보자. 

>var user = {email : "sampleid@sample.com", username : "Hochul Shin", nickname: "dakoo"}
>db.users.insert(user);

다음 명령을 통해 users collection이 잘 생성되고 아이템이 추가되었는지 확인한 후 collection을 비우자.  

>show collections
>db.users.find()
>db.users.remove({});

## 코드 준비 

hapi.js를 이용한 multi-port 지원 서버 예제 [블로그 글](http://dakoo.github.io/hapi/simple-multi-port-hapi-server-sample/)과 [프로젝트](https://github.com/dakoo/simple-multi-port-hapi-server-sample)를 시작 포인트로 삼아 진행하자. 프로젝트를 fork하여 새로운 프로젝트를 만들거나, clone을 한다. clone URL은 아래와 같다.

>https://github.com/dakoo/simple-multi-port-hapi-server-sample.git

hapi.js를 이용한 multi-port 지원 서버 예제에서 사용한 3001번 포트를 REST API에 할당해 사용한다. 

## 필요 모듈 설치

server 폴더에서 Command Prompt로 `npm install --save-dev hapi-mongodb boom` 명령을 통해 mongodb 서비스와 연결하기 위한 모듈([hapi-mongodb](https://www.npmjs.com/package/hapi-mongodb))과 HTTP 에러 응답을 손쉽게 보낼 수 있게 하는 hapi의 유틸리티 모듈([boom](https://github.com/hapijs/boom))을 설치한다.    

### 에러 처리

Windows에서 hapi-mongodb 설치 중 아래 메시지와 함께 에러가 발생한다면, 그것은 mongodb 모듈을 위한 C++ 컴파일러가 설치되어 있지 않다는 것이다. mongodb 모듈은 hapi-mongodb에서 사용하는 모듈이다. 

>MSBUILD : error MSB3428: Could not load the Visual C++ component "VCBuild.exe". 

이를 해결하기 위해서는 무료 개발툴인 [Visual Studio Express 2013](https://www.visualstudio.com/en-us/downloads/download-visual-studio-vs#DownloadFamilies_2)을 [설치](http://blogs.msdn.com/b/jspark/archive/2014/02/17/gm-2013.aspx)하면 된다. for Web, for Windows, for Windows Desktop 중 무엇이라도 가능하다. Visual Studio 설치를 완료 후에 다시 필요 모듈 설치를 시도해보자.   

## MongoDB service의 db 연결

### db 설정 파일 

Server 폴더에 dbconfig.json 파일을 만들고 설정한다. user-db는 [Hapi와 mongoDB를 이용한 간단 REST API 구현 예제(1)](http://dakoo.github.io/simple-restapi-using-hapi-mongodb-sample-1/)에서 만들어 둔 collection이다. 이 파일의 설정은 [mongodb 사이트](https://www.npmjs.com/package/hapi-mongodb)를 참조하면 더욱 다양하게 할 수 있다.   

### db 연결
 
**index.js** 파일에서는 server.start를 호출하기 전에 mongodb와 연결을 하고, 실패시 종료하도록 한다.  

## REST API 구현

### 불필요한 파일 제거

3001번 포트로 요청이 왔을때 api.html을 서비스하던 부분을 제거해야 한다. client\html 폴더의 **api.html** 파일을 제거하자. 

### API handler 구현  

server\plugins 폴더의 handlers.js 파일에서 **export.api** 부분을 제거하자. 대신, server\plugins 폴더에 **user.js** 파일을 생성한다. 

#### handler 틀  

정의한 API와 기능별로 handler의 layout을 만든다. 

#### handler 구현

**user.js** 파일에 mongodb와 연동하여 사용자 정보를 추가, 획득, 수정, 삭제하는 로직을 구현한다. [hapi-mongodb](https://www.npmjs.com/package/hapi-mongodb) 사용법과 [mongodb 사용법](http://docs.mongodb.org/manual/core/crud-introduction/)을 참조하라.  

#### 3000 번 포트 handler 수정

3000번 포트는 web page를 제공하는 것이다. 이또한 확장성을 높이기 위해 handlers.js의 handler의 틀을 수정한다. 그리고 handlers.js의 이름도 **page.js**로 바꾼다. page.js의 내용은 다음과 같다. 

## API와 handler의 Routing

route.js에서 기존 api handler를 삭제하고 user.js에 만든 handler를 API와 연결시킨다. [Hapi와 mongoDB를 이용한 간단 REST API 구현 예제(1)](http://dakoo.github.io/simple-restapi-using-hapi-mongodb-sample-1/)에 정의된 API를 참고하여 작성한다. 또한, page.js의 handler와 API도 연결한다. 

## 테스트

### HTTP 테스트 클라이언트 설치

Console 기반의 HTTP 테스트 클라이언트인 [curl](http://curl.haxx.se/download.html)을 많이 사용하지만 편리한 GUI를 가진 유틸리티를 사용하는 것도 좋다. 크롬 브라우저를 실행하여 크롬 웹스토어로 이동 후 *Advanced REST client*나 *DHC* 를 설치하여 사용하길 권장한다. 사용법은 여기서 다루지 않는다. 

### 서버 실행 

Command Prompt로 server 폴더에서 `node .`로 서버를 동작시킨다.  

### 테스트 실시 

아래는 테스트를 위한 **요청** 정보의 예이다. HTTP 테스트 클라이언트에 아래 정보를 입력하여 각 API가 잘 동작하는지 확인해본다.  사용자 추가를 위한 Body의 내용은 복사/붙여넣기 과정에서 큰따옴표가 이상하게 변하여 오류를 발생시킬 수 있다. 오류가 발생하면, 내용을 복사/붙여넣기하는 대신 직접 타이핑을 해보길 추천한다. 

1. 사용자 목록 획득
- 주소: *localhost:3001/users*
- method: *GET*
- Header: *Content-Type: application/json* 
2. 사용자 추가
- 주소: *localhost:3001/user*
- method: *POST*
- Header: *Content-Type: application/json* 
- Body: *{"email":"sampleid@sample.com","username":"Hochul Shin", "nickname":"dakoo"}*
3. 사용자 정보 획득
- 주소는 *localhost:3001/user/sampleid@sample.com
- method: *GET*
- Header: *Content-Type: application/json*
4. 사용자 정보 갱신
- 주소는 *localhost:3001/user/sampleid@sample.com
- method: *PATCH*
- Header: *Content-Type: application/json*
- Body: *{"email":"sampleid@sample.com", "username":"Hochul Shin", "nickname": "dakoo"}*
5. 사용자 정보 삭제
- 주소는 *localhost:3001/user/sampleid@sample.com
- method: *DELETE*
- Header: *Content-Type: application/json*

## 블로그

[Hapi와 mongoDB를 이용한 간단 REST API 구현 예제(1)](http://dakoo.github.io/simple-restapi-using-hapi-mongodb-sample-1/)
[Hapi와 mongoDB를 이용한 간단 REST API 구현 예제(2)](http://dakoo.github.io/simple-restapi-using-hapi-mongodb-sample-1/)
>>>>>>> 64d89db600fbeea4a54b7b5ffad20e95f8928643
