import { styled } from 'styled-components';

interface Request {
  id: number;
  username: string;
  phone: string;
  hospitalName: string;
  deptName: string;
  level: string;
  auth: string;
  status: string;
}

const RequestsItem = ({ requests, currentPage }: { requests: Request[]; currentPage: number }) => {
  const handleClickApprove = (id: number) => {
    console.log(id);
  };

  const startIndex = (currentPage - 1) * 10;

  return (
    <Container>
      {requests.map((item, index) => (
        <RequestItem key={item.id}>
          <span className="index">{startIndex + index + 1}</span>
          <span className="name">{item.username}</span>
          <span className="dept">{item.deptName}</span>
          <span className="level">{item.level}</span>
          <span className="phone">{item.phone}</span>
          <span className="button">
            <ApproveButton onClick={() => handleClickApprove(item.id)}>승인</ApproveButton>
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
