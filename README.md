 ---
layout: post
title: hapi.js를 이용한 multi-port 지원 서버 예제
description:  hapi.js를 이용한 multi-port 지원 서버 예제
modified: 2015-07-08
---

서버를 개발하다보면 여러 port를 활용해야 하는 경우가 많이 있다. hapi에서 이를 처리하는 간단한 예제를 살펴보자.      

## 준비 

[hapi.js를 이용한 구조화된 간단 서버 예제 프로젝트](https://github.com/dakoo/simple-organized-hapi-server-sample)를 시작 포인트로 삼아 진행하자. 프로젝트를 fork하여 새로운 프로젝트를 만들거나, clone을 한다. clone URL은 아래와 같다.

>https://github.com/dakoo/simple-organized-hapi-server-sample.git
 
## 서버 코드

### manifest.json에 포트 추가

**manifest.json** 파일에 port는 3001번에 label은 "api"인 포트를 추가한다. 

### 경로와 handler간 routing을 담당하는 route.js

새로운 mapping인 apiendpoints를 추가한다. 경로는 '/'로 동일하지만, 하나는 **getentry** handler, 다른 하나는 **api** handler로 맵핑된다.    

### handler를 위한 handlers.js

api handler를 추가한다. client폴더의 api.html을 읽어서 return하는 것이다. 

### 서버 구동을 담당하는 index.js

서버 설정과 routing 설정을 읽어 hapi 서버 object에 등록한 후 서버를 구동한다. 여기서는 connection시 label에 따라 routing을 다르게 설정하도록 하였다. 이처럼 포트와 라우팅을 쉽게 변경할 수 있다.

## 테스트

client\html 폴더에 api.html을 만든다. 
server 폴더에서 `node .` 명령을 통해 서버를 구동하고 크롬 브라우저에서 *http://localhost:3000/* 주소와 *http://localhost:3001/* 주소로 접근해 본다.
3000으로 접근하면 client폴더의 index.html이 읽히고, 3001로 접근하면 api.html이 읽힌다.  

 궁금한 점이나 수정이 필요한 점은 [프로젝트의 issue](https://github.com/dakoo/simple-multi-port-hapi-server-sample/issues)를 통해 알려주시기 바랍니다. 성심껏 답변드리고 반영하겠습니다.
