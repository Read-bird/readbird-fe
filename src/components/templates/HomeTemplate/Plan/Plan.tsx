import { TRootState } from '@/store/state';
import { TPlan } from '@api/types';
import { Images } from '@assets/images';
import { ProgressBar } from '@components/common/ProgressBar';
import { Spacing } from '@components/common/Spacing';
import { Dots } from '@components/templates/HomeTemplate/Plan/Dots';
import { Stamp } from '@components/templates/HomeTemplate/Plan/Stamp';
import { calculateDday } from '@utils/calendar';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type TProps = TPlan;

export const Plan = ({
  coverImage,
  title,
  target,
  totalPage,
  currentPage,
  planId,
  endDate,
  recordStatus
}: TProps) => {
  const imgStyle = useMemo(() => ({ borderRadius: '10px' }), []);
  const { currentDate } = useSelector((state: TRootState) => state.planStore);
  const { userId } = useSelector((state: TRootState) => state.userStore);

  return (
    <Wrap>
      <ImageWrap>
        <Images
          imgUrl={coverImage ?? undefined}
          imgAlt={`${title} 책 표지 이미지`}
          imgWidth={55}
          imgHeight={78}
          imgStyle={imgStyle}
        />
      </ImageWrap>
      <ProgressWrap>
        <div>
          <FlexBox>
            <span className="book-name">{title}</span>
            <DDayLabel>D-{calculateDday(new Date(endDate))}</DDayLabel>
          </FlexBox>
          <FlexBox $justifyContent="flex-start">
            <span className="book-page">
              {currentPage}쪽 ~ {totalPage}쪽
            </span>
            <Spacing width={5} />
            <span className="book-target">(목표: {target})</span>
          </FlexBox>
        </div>
        <ProgressBar
          id={`plan${planId}`}
          value={Math.floor((currentPage / totalPage) * 100)}
          max={100}
        />
      </ProgressWrap>
      <StatusWrap>
        <Dots planId={planId} userId={userId} selectDate={currentDate} />
        <Stamp
          planId={planId}
          recordStatus={recordStatus}
          selectDate={currentDate}
          maxPage={currentPage + target}
        />
      </StatusWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basic};
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const ImageWrap = styled.div`
  flex: 0 0 55px;
`;

const ProgressWrap = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StatusWrap = styled.div`
  flex: 0 0 55px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const FlexBox = styled.div<{ $justifyContent?: string }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'space-between'};
  align-items: center;

  .book-name {
    font-size: 16px;
    font-weight: 700;
    color: #000000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 155px;
  }

  .book-page {
    font-size: 14px;
    font-weight: 500;
    color: #747474;
  }

  .book-target {
    font-size: 12px;
    font-weight: 400;
    color: #747474;
  }
`;

const DDayLabel = styled.span`
  display: inline-block;
  width: 53px;
  height: 24px;
  line-height: 24px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basicDark};
  font-size: 12px;
  text-align: center;
  color: white;
`;
