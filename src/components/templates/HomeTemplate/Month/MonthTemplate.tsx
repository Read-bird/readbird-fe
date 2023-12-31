import { setCurrentDate, setMonthRecord, setTrophy } from '@/store/reducers';
import { TAppDispatch, TRootState } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { EAchievementStatus, TResponseMonthRecord } from '@api/types';
import { IconBook, IconDayBirdMini, IconSuccess } from '@assets/icons';
import { Calendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  DefinitionList,
  FlexBox,
  GuideLabel,
  GuideText,
  Inner,
  Section,
  SubTitle,
  Wrap
} from './Styled';

const data = {
  before: '이 날짜에 등록된 플랜이 없어요.',
  [EAchievementStatus.failed]: '플랜을 달성하지 못했어요.',
  [EAchievementStatus.unstable]: '한 개 이상의 플랜을 달성했어요!',
  [EAchievementStatus.success]: '모든 플랜을 달성했어요!'
};

export const MonthTemplate = memo(() => {
  const { monthCurrentDate, monthRecord, recordTrophy, planTrophy } = useSelector(
    (state: TRootState) => state.planStore
  );
  const nowDate = useMemo(() => new Date(monthCurrentDate), [monthCurrentDate]);
  const dispatch = useDispatch<TAppDispatch>();
  const navigate = useNavigate();

  const changeCurrentDate = useCallback(
    (date: string) => {
      dispatch(setCurrentDate(date));
      navigate('/');
    },
    [dispatch, navigate]
  );

  // 월별 플랜 조회
  const getRecordList = async () => {
    try {
      const response = await axiosFetch<any, TResponseMonthRecord>({
        url: '/api/record',
        method: 'get',
        options: {
          params: {
            date: dayjs(monthCurrentDate).format('YYYY-MM')
          }
        }
      });

      if (response.status === 200) {
        dispatch(setMonthRecord(response.data.record));
        dispatch(setTrophy(response.data.trophy));
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    }
  };

  useEffect(() => {
    getRecordList();
  }, [monthCurrentDate]);

  return (
    <Wrap>
      <Inner className="hidden-scroll">
        <Section>
          <Calendar
            record={monthRecord}
            currentDate={nowDate}
            changeCurrentDate={changeCurrentDate}
          />
          <Spacing height={14} />
          <GuideLabel>날짜를 터치하면 해당 플랜으로 이동합니다.</GuideLabel>
          <Spacing height={14} />
          {Object.entries(data).map(([key, value]) => (
            <DefinitionList key={key}>
              <dt>
                <IconDayBirdMini className={`${key}`} />
              </dt>
              <GuideText>{value}</GuideText>
            </DefinitionList>
          ))}
        </Section>
        <Spacing height={20} />
        <Section className="last">
          <SubTitle>{nowDate.getMonth() + 1}월의 플랜 달성 기록</SubTitle>
          <Spacing height={14} />
          <FlexBox $justify="space-between">
            <FlexBox>
              <IconSuccess fillColor="#E3CCF2" />
              <Spacing width={10} />
              <span>달성에 성공한 플랜</span>
            </FlexBox>
            <strong>{recordTrophy.toLocaleString()}개</strong>
          </FlexBox>
          <Spacing height={14} />
          <FlexBox $justify="space-between">
            <FlexBox>
              <IconBook />
              <Spacing width={10} />
              <span>완독에 성공한 책</span>
            </FlexBox>
            <strong>{planTrophy.toLocaleString()}권</strong>
          </FlexBox>
        </Section>
      </Inner>
    </Wrap>
  );
});
