from pymongo import MongoClient

from flask import Flask, render_template, request, jsonify, session, redirect, url_for

# 토큰에 만료시간을 줘야하기 때문에, datetime 모듈도 사용합니다. # 글쓰기 시간창 기능 도 씁니다.
from datetime import datetime, timedelta
import requests

client = MongoClient('mongodb+srv://test:sparta@cluster0.7zzzx.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbsparta

app = Flask(__name__)

# JWT 토큰을 만들 때 필요한 비밀문자열입니다. 아무거나 입력해도 괜찮습니다.
# 이 문자열은 서버만 알고있기 때문에, 내 서버에서만 토큰을 인코딩(=만들기)/디코딩(=풀기) 할 수 있습니다.
SECRET_KEY = 'SPARTA'

# JWT 패키지를 사용합니다. (설치해야할 패키지 이름: PyJWT)
import jwt

# 회원가입 시엔, 비밀번호를 암호화하여 DB에 저장해두는 게 좋습니다.
# 그렇지 않으면, 개발자(=나)가 회원들의 비밀번호를 볼 수 있으니까요.^^;
import hashlib

@app.route('/')
def main():
    # 성현님 부분 (하나 안함)
    token_receive = request.cookies.get('mytoken')
    borders = list(db.lol_collection.find({}, {"_id": False}))
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"id": payload['id']})
        return render_template('main.html', borders=borders, nickname=user_info["nick"], id=user_info["id"])
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route('/login')
def login():
    # 로그인(유정님)
    msg = request.args.get("msg")
    return render_template('login.html', msg=msg)


@app.route('/join')
def join():
    # 회원가입(유정님)
    return render_template('join.html')


#################################
##  로그인을 위한 API            ##
#################################

# [회원가입 API]
# id, pw, nickname을 받아서, mongoDB에 저장합니다.
# 저장하기 전에, pw를 sha256 방법(=단방향 암호화. 풀어볼 수 없음)으로 암호화해서 저장합니다.
@app.route('/api/join', methods=['POST'])
def api_join():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    nickname_receive = request.form['nickname_give']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    db.user.insert_one({'id': id_receive, 'pw': pw_hash, 'nick': nickname_receive})

    return jsonify({'result': 'success'})


# [로그인 API] 유정님
# id, pw를 받아서 맞춰보고, 토큰을 만들어 발급합니다.

@app.route('/api/login', methods=['POST'])
def api_login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    # 주석
    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # id, 암호화된pw을 가지고 해당 유저를 찾습니다.
    result = db.user.find_one({'id': id_receive, 'pw': pw_hash})

    # 찾으면 JWT 토큰을 만들어 발급합니다.
    if result is not None:
        # JWT 토큰에는, payload와 시크릿키가 필요합니다.
        # 시크릿키가 있어야 토큰을 디코딩(=풀기) 해서 payload 값을 볼 수 있습니다.
        # 아래에선 id와 exp를 담았습니다. 즉, JWT 토큰을 풀면 유저ID 값을 알 수 있습니다.
        # exp에는 만료시간을 넣어줍니다. 만료시간이 지나면, 시크릿키로 토큰을 풀 때 만료되었다고 에러가 납니다.
        payload = {
            'id': id_receive,
            'exp': datetime.utcnow() + timedelta(seconds=60 * 60 * 24)  # 로그인 24시간 유지
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # token을 줍니다.
        return jsonify({'result': 'success', 'token': token})
    # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


# [유저 정보 확인 API] 유정님
# 로그인된 유저만 call 할 수 있는 API입니다.
# 유효한 토큰을 줘야 올바른 결과를 얻어갈 수 있습니다.
# (그렇지 않으면 남의 장바구니라든가, 정보를 누구나 볼 수 있겠죠?)
@app.route('/api/nick', methods=['GET'])
def api_valid():
    token_receive = request.cookies.get('mytoken')

    # try / catch 문?
    # try 아래를 실행했다가, 에러가 있으면 except 구분으로 가란 얘기입니다.

    try:
        # token을 시크릿키로 디코딩합니다.
        # 보실 수 있도록 payload를 print 해두었습니다. 우리가 로그인 시 넣은 그 payload와 같은 것이 나옵니다.
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        print(payload)

        # payload 안에 id가 들어있습니다. 이 id로 유저정보를 찾습니다.
        # 여기에선 그 예로 닉네임을 보내주겠습니다.
        userinfo = db.user.find_one({'id': payload['id']}, {'_id': 0})
        return jsonify({'result': 'success', 'nickname': userinfo['nick']})
    except jwt.ExpiredSignatureError:
        # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
        return jsonify({'result': 'fail', 'msg': '로그인 시간이 만료되었습니다.'})
    except jwt.exceptions.DecodeError:
        return jsonify({'result': 'fail', 'msg': '로그인 정보가 존재하지 않습니다.'})


# @app.route('/index_2/<int:id_value>', methods=["GET"])
# def get_page(id_value):
#     id_values = db.lol_collection.find_one({'id': id_value},{"_id":False})
#     print(id_values)
#     id_list = id_values['id']
#     return render_template("index_2.html", id_list=id_list)


@app.route('/write', methods=["GET"])
def get_write_page():
    # 성현님 부분
    token_receive = request.cookies.get('mytoken')
    borders = list(db.lol_collection.find({}, {"_id": False}))
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"id": payload['id']})
        return render_template('write_page.html', borders=borders, nickname=user_info["nick"], id=user_info["id"])
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))


@app.route("/write", methods=["POST"])
def save_write():
    # 글쓰기페이지 (영남님)
    # 클라이언트 요청 데이터
    tier_receive = request.form['tier_give']
    rating_receive = request.form['rating_give']
    date_receive = get_duo_date(request.form['date_give'])
    content_receive = request.form['content_give']

    # 작성된 시간 얻기
    # today = datetime.today()
    # date_time = today.strftime("%Y년 %m월 %d일 %H시 %M분 %S초")

    # db.write_count 에 저장된 유일한 값을 가져옴 => 게시글 고유 id로 사용
    write_count = list(db.write_count.find({}, {'_id': False}))[0]['count'] + 1

    # DB 데이터 생성
    doc = {
        'id': write_count,  # 게시글 고유 아이디
        'tier': tier_receive,  # 티어 정보
        'rating': rating_receive,  # 등급 정보
        'duo_date': date_receive,  # 듀오 하고 싶은 시간 정보
        'content': content_receive,  # 어필 내용
        # 'date_time': date_time  # 게시글 작성 시간
    }

    # DB 데이터 저장
    db.lol_collection.insert_one(doc)

    # 유일한 값 증가
    db.write_count.update_one({'count': int(write_count - 1)}, {'$set': {'count': write_count}})

    return jsonify({'msg': '등록 완료!'})


def get_duo_date(data):
    # 글쓰기페이지 (영남님)
    # 듀오할 시간 구하기 문자 예쁘게 만들기
    temp_date = data.split('T')
    ymd = temp_date[0].split('-')
    hs = temp_date[1].split(':')

    hour = int(hs[0])

    if hour >= 20:
        pm_am_info = '저녁'
    elif hour >= 12:
        pm_am_info = '오후'
    elif hour >= 6:
        pm_am_info = '오전'
    else:
        pm_am_info = '새벽'

    if hour > 12:
        hour -= 12

    # 2022년 05월 10일 13시 20분
    duo_date = f'{ymd[0]}년 {ymd[1]}월 {ymd[2]}일 {pm_am_info} {hour}시 {hs[1]}분'
    return duo_date


# 글목록 상세페이지(혜지님)
@app.route("/board/<int:id_input>", methods=["GET"])
def get_board(id_input):
    # lol_collection 은 본인이 쓰는 콜렉션 가져다 붙이면 됩니다~!
    # DB에게 요청 => db.lol_collection.find_one({'id': write_id}, {'_id': False})
    # 응답 받은 데이터 => data
    data = db.lol_collection.find_one({'id': id_input}, {'_id': False})

    # data 는 DB에 저장된 정보를 가져온 것이고 아래와 같은 데이터 입니다
    # sample_data = {
    #     'id': 1,                                       # 게시글 번호
    #     'tier': '브론즈',                               # 티어 정보
    #     'rating': '3',                                 # 등급 정보
    #     'duo_date': '2022년 05월 10일 오후 1시 21분',     # 듀요 하고 싶은 시간
    #     'content': 'ㄱㄱㄱㄱㄱ',                         # 게시글 내용 (어필 내용)
    #     'date_time': '2022년 05월 10일 21시 59분 04초'    # 게시글 작성 시간
    # }
    # article_id = data['id']
    tier = data['tier']
    rating = data['rating']
    content = data['content']
    duo_date = data['duo_date']
    image_url = db.tier_image.find_one({'tier': tier}, {'_id': False})['image_url']

    # Jinja 에서는 writer[0], writer[1], writer[2], writer[3]
    # {% set tier = writer[0] %}
    # {% set rating = writer[1] %}
    # {% set content = writer[2] %}
    # {% set duo_date = writer[3] %}
    writer = [tier, rating, content, duo_date, image_url]
    token_receive = request.cookies.get('mytoken')
    borders = list(db.lol_collection.find({}, {"_id": False}))
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.user.find_one({"id": payload['id']})
        return render_template('board.html', writer=writer, nickname=user_info["nick"], id=user_info["id"])
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
