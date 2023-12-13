import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.basic};

  display: flex;
  flex-direction: column;
`;

export const Head = styled.section`
  position: relative;
  width: 100%;
  flex: 0 0 90px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const Body = styled.section`
  position: relative;
  flex: 1;
  width: 100%;
  height: calc(100vh - 160px);
  border-radius: 50px 50px 0 0%;
  background-color: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TodayText = styled.strong`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const CalendarWrap = styled.div`
  position: absolute;
  bottom: 8px;
  right: 20px;
  width: auto;
  height: auto;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:active {
    transform: scale(1.1);
  }
`;