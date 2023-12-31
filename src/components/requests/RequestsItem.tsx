import { useSetRecoilState } from 'recoil';
import { registerApprove } from '@/lib/api';
import { AlertState, Request } from '@/lib/types';
import { MESSAGE_TEXTS } from '@/constants/message';
import { BUTTON_TEXTS } from '@/constants/buttons';
import { getLevel, getPhone } from '@/utils/decode';
import { stateAlert } from '@/states/stateAlert';
import styled from 'styled-components';

const RequestsItem = ({ requests, currentPage }: { requests: Request[]; currentPage: number }) => {
  const setAlert = useSetRecoilState<AlertState>(stateAlert);

  const approve = async (userId: number) => {
    try {
      await registerApprove(userId);
    } catch (error) {
      setAlert({
        isOpen: true,
        content: `회원가입 요청 승인 실패\n${error}`,
        type: 'error',
      });
    }
  };

  const handleClickApprove = (name: string, dept: string, id: number) => {
    approve(id);
    setAlert({
      isOpen: true,
      content: `${dept} ${name} ${MESSAGE_TEXTS.requestSuccess}`,
      type: 'error',
    });
    window.location.reload();
  };

  const startIndex = (currentPage - 1) * 10;

  return (
    <Container>
      {requests.map((item, index) => (
        <RequestItem key={item.id}>
          <span className="index">{startIndex + index + 1}</span>
          <span className="name">{item.username}</span>
          <span className="dept">{item.deptName}</span>
          <span className="level">{getLevel(item.level)}</span>
          <span className="phone">{getPhone(item.phone)}</span>
          <span className="button">
            <ApproveButton onClick={() => handleClickApprove(item.username, item.deptName, item.id)}>
              {BUTTON_TEXTS.approve}
            </ApproveButton>
          </span>
        </RequestItem>
      ))}
    </Container>
  );
};

export default RequestsItem;

const Container = styled.div`
  width: 100%;
  height: calc(100% / 10);
  box-sizing: border-box;
`;

const RequestItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  span {
    text-align: center;
    flex-basis: 0;
    color: ${props => props.theme.black};
  }
  .index {
    flex-grow: 0.5;
  }
  .name {
    flex-grow: 1;
  }
  .dept {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
  }
  .phone {
    flex-grow: 1.5;
  }
  .button {
    flex-grow: 1;
  }
`;

const ApproveButton = styled.button`
  width: 50px;
  height: 25px;
  border: none;
  outline: none;
  border-radius: 8px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`;
