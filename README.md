# ITEM_SIMULRATION_PROJECT

Node.js 입문, 숙련주차의 과제인 아이템시뮬레이터 백엔드 구현 과제입니다

필수기능만 구현되었으며
도전기능은 구현이되어있지않습니다


API 명세서 :
https://gusty-loganberry-936.notion.site/451e7e3b1e28452a91d923bf3c4e57e4?v=18424b8e4cdc41129ef0ed277836ef45

데이터 베이스 ERD
![image](https://github.com/user-attachments/assets/09b91cbe-babd-40dc-9cb3-46791ecb5086)

</br>
1. 암호화 방식</br>
    - 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?</br>
      : 다시 원래의 데이터로 복구할수없는 단방향 암호화 방식입니다.</br>
    - 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?</br>
      : 비밀번호를 그냥 저장한다면 평문으로 저장되게되어 개인정보가 쉽게 유출이될 확률이 크기때문에 Hash로 저장하면 더욱 안전하게
        개인정보를 저장할수 있게됩니다.</br>
        </br>
2. 인증 방식</br>
    - JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?</br>
    - 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?</br>
    </br>
3. 인증과 인가</br>
    - 인증과 인가가 무엇인지 각각 설명해 주세요.</br>
      : 인증은 알맞는 계정 소유자인지 검증하기위한 작업을뜻하고 인증이끝나면 클라이언트는 해당 사용자의 권한을 받게됩니다.</br>
        인가는 로그인을 통해 사용자의 권한을받은상태로 어떠한 컨텐츠를 이용할때 이용할권한이 있는지 확인하는 작업을 뜻합니다.</br>
    - 위 API 구현 명세에서 인증을 필요로 하는 API와 그렇지 않은 API의 차이가 뭐라고 생각하시나요?</br>
      : 인증을 필요로하는 API는 개인 소유의 재산을 타인이 접근할수 없게 하기위한다는 차이가 있습니다</br>
    - 아이템 생성, 수정 API는 인증을 필요로 하지 않는다고 했지만 사실은 어느 API보다도 인증이 필요한 API입니다. 왜 그럴까요?</br>
      : 게임에서 아이템을 마음껏 생성하고, 수정할수있다면 게임 내의 생태계가 모두 붕괴될수있습니다</br>
        누구나 마음껏 자신의 장비의 능력치를 수정해 강하게만들수도있고, 제3자의 장비의 능력치를 수정해 약하게만들수도있기때문입니다.</br>
        </br>
4. Http Status Code</br>
    - 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.</br>
      : 200 - 요청사항을 성공적으로 처리</br>
        201 - 요청사항을 처리해서 새로운 리소스가 생성</br>
        400 - 요청의 구문이 잘못된형태로 제출했을때 발생</br>
        401 - 요청에대한 권한이없을때 발생</br>
        404 - 요청한것에대한 값을 찾을수없었을때 발생</br>
        409 - 요청을 처리하던도중 이미존재하는경우등으로인해 충돌 발생</br>
        500 - 내부 서버에 에러가 발생</br>
        </br>
5. 게임 경제</br>
    - 현재는 간편한 구현을 위해 캐릭터 테이블에 money라는 게임 머니 컬럼만 추가하였습니다.</br>
        - 이렇게 되었을 때 어떠한 단점이 있을 수 있을까요?</br>
        - 이렇게 하지 않고 다르게 구현할 수 있는 방법은 어떤 것이 있을까요?</br>
        : 캐릭터에 money컬럼만 추가하고 생성시 만원을지급했을시
          발생할수있는문제는 이것을 악용하여 여러캐릭터를 생성할수있을것이고
          캐릭터간에 재화를 교환할때 서로 연관이없는 테이블간에 교환이 이루어지기때문에 로직이 복잡해질것으로 생각됩니다</br>
          따라서 이 문제를 해결하기위해 계정과 캐릭터의1:N구조에서 계정쪽 데이터베이스에 각 캐릭터마다의 재화를 지정해주어
          첫번째생성시에만 만원을지급할수있는 조건도 편하게 마련할수있고
          캐릭터간의 재화 교환도 조금더 구현이 편해질것으로 생각합니다</br>
    - 아이템 구입 시에 가격을 클라이언트에서 입력하게 하면 어떠한 문제점이 있을 수 있을까요?</br>
      :클라이언트가 가격을 임의로 조정해서 구입할수있기때문에 게임 내 경제가 무너집니다</br>
