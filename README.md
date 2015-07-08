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
