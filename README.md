# homework
## 회원가입 API(method = POST) 
- request = URL:/users
 body = nickname : string, email : string, password : string, checkPassword : string
- response = payload

## 로그인 API(method = POST)GET요청으로하면 URL에 노출이 되므로 POST로 하는게 보안상 좋다.
- request = URL:/auth
 body = email : string, password : string
- response = 조회한 뒤 상황에 맞게 메세지 보냄

## 댓글 목록 조회 API(method = GET) => 로그인을 안해도 조회 가능
- request = URL:/articles/:user_Id/comment
- response = payload comment : string

## 전체 게시글 목록 조회 API(method = GET) => 로그인을 안해도 조회 가능
- 제목, 작성자명, 작성 날짜를 조회하기
- 작성날짜를 기준으로 내림차순 정렬하기
- request = URL:/ 
- response = title : string, nickname : string, date : string

## 게시글 조회 API (method = GET) => 로그인을 안해도 조회가능
- 제목, 작성자명, 작성 내용을 조회하기
- request = URL:/articles/:user_Id 
  param : user_Id : string
- response = title : string, name : string, comment : string 

## 게시글 작성 API (method = POST) => 로그인을 해야 작성가능
- 제목, 작성 내용을 입력하기
- request = URL:/articles
  body =  title : string , comment : string, date : Number ,user_Id : string
- response = payload

## 게시글 수정 API (method = PUT) => 로그인을 해야 작성가능
- request = URL:/articles/:user_Id/modify,
  param : user_Id, body : comment:string
- response = body: comment : string, 

## 게시글 삭제 API (method = DELETE) => 로그인을 해야 작성가능
- request = URL:/articles/:user_Id/delete,
  param : user_Id
- response = 삭제

## 댓글 작성 API (method = POST)
로그인을 해야 작성 가능, 댓글내용이 비워져 있으면 입력해주세요 메세지 보내기
- request = URL:/articles/:user_Id/comment
- param = : user_Id body : comment : string
- response =  : payload, comment : string , date : date

## 댓글 수정 API (method = PATCH)
로그인을 해야 수정가능, 로그인 토큰 해당하는 사용자가 작성한 댓글만 수정가능하도록 하기
- request = URL:/articles/:user_Id/comment/modify
  param = user_Id, comment : string
- response = 

## 댓글 삭제 API (method = DELETE)
해당 작성자만 삭제가능
- request = URL:/articles/:user_Id/comment/delete
param : user_Id
- response = 삭제
git commit

## 과제질문
1. 수정, 삭제 API의 request를 어떤 방식으로 사용하셨나요? (param, query, body)
- Name_Id를 param으로 받아서 비밀번호의 값도 넘겨주고 해당 Name_Id의 게시판 목록 비밀번호와 비교 한 뒤 맞으면 수정 or 삭제 아니면 요청이 실패하도록 하였음
2. 어떤 상황에 어떤 방식의 request를 써야하나요?
- 단순히 조회하는 상황에는 request가 별로 필요 없지만 POST,PUT,DELETE는 조건과 상황에 맞게 써야한다. 게시글 작성 request는 작성자명,제목,작성내용 등등 많은 request가 필요하다고 생각한다.
3. RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?
- 게시글 작성과 게시글 전체조회 URL이 똑같은게 아쉬운 부분이고 나머지는 REST API를 생각하면서 설계하였음
