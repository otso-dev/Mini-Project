# homework
전체 게시글 목록 조회 API(method = GET)
- 제목, 작성자명, 작성 날짜를 조회하기
- 작성날짜를 기준으로 내림차순 정렬하기
- request = URL:/articles 
- response = title : string, name : string, date : string

게시글 작성 API (method = POST)
- 제목, 작성자명, 비밀번호, 작성 내용을 입력하기
- request = URL:/articles
  body =  title : string , name : string, password : Number, comment : string, Name_Id : Number, date : Number
- response = Name_Id : Number 
게시글 조회 API (method = GET)
- 제목, 작성자명, 작성 내용을 조회하기
- request = URL:/articles:Name_Id
- response =title : string, name : string, comment : string count : Number
게시글 수정 API (method = PUT)
- api를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
- request = URL:/articles:Name_Id/modify,  param : name_Id body : password : Number
- response = body: name: string, comment : string, 
게시글 삭제 API (method = DELETE)
- api를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
- request = URL:/articles:Name_Id/delete, param : name_Id  body : password : Number
- response = 삭제
1. 수정, 삭제 API의 request를 어떤 방식으로 사용하셨나요? (param, query, body)
- Name_Id를 param으로 받아서 비밀번호의 값도 넘겨주고 해당 Name_Id의 게시판 목록 비밀번호와 비교 한 뒤 맞으면 수정 or 삭제 아니면 요청이 실패하도록 하였음
3. 어떤 상황에 어떤 방식의 request를 써야하나요?
- 단순히 조회하는 상황에는 request가 별로 필요 없지만 POST,PUT,DELETE는 조건과 상황에 맞게 써야한다. 게시글 작성 request는 작성자명,제목,작성내용 등등 많은 request가 필요하다고 생각한다.
5. RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?
- 게시글 작성과 게시글 전체조회 URL이 똑같은게 아쉬운 부분이고 나머지는 REST API를 생각하면서 설계하였음
