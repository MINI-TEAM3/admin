import { DutyRequest } from '@/lib/types';
import { getCategory, getLevel } from '@/utils/decode';
import { MESSAGE_TEXTS } from '@/constants/message';
import ApplyBtn from '@/components/Buttons/ApplyBtn';
import RejectBtn from '@/components/Buttons/RejectBtn';
import styled from 'styled-components';

const DutyRequestsItem = ({ requests, currentPage }: { requests: DutyRequest[]; currentPage: number }) => {
  const startIndex = (currentPage - 1) * 10;

  return (
    <Container>
      {requests.map((item, index) => (
        <RequestItem key={item.scheduleId}>
          <div className="index">{startIndex + index + 1}</div>
          <div className="name">{item.username}</div>
          <div className="level">{getLevel(item.level)}</div>
          <div className="duty">{getCategory(item.category)}</div>
          <div className="originDate">{item.startDate}</div>
          <div className="newDate">{item.updateDate}</div>
          <div className="state">
            {item.evaluation === 'STANDBY' ? (
              <>
                <ApplyBtn scheduleId={item.scheduleId} />
                <RejectBtn scheduleId={item.scheduleId} />
              </>
            ) : (
              <div className="done">{MESSAGE_TEXTS.dutyRequestDone}</div>
            )}
          </div>
        </RequestItem>
      ))}
    </Container>
  );
};

export default DutyRequestsItem;

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
  div {
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
  .duty {
    flex-grow: 1;
  }
  .level {
    flex-grow: 1;
  }
  .originDate {
    flex-grow: 1.5;
  }
  .newDate {
    flex-grow: 1.5;
  }
  .state {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1.5;
    gap: 6px;
  }
  .done {
    display: contents;
  }
`;
