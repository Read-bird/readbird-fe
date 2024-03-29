import { axiosFetch } from '@api/axios';
import { TBookDetail } from '@api/types';
import { Spacing } from '@components/common/Spacing';
import { DisplayAds } from '@components/connections';
import { Book } from '@components/templates/SearchTemplate/Book';
import { Alert } from '@utils/Alert';
import { FootHeight, HeadHeight } from '@utils/constants';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export const SearchMain = () => {
  const [topBookList, setTopBookList] = useState<TBookDetail[]>([]);
  const listHeight = useMemo(() => {
    const doc = document.querySelector('#root') as HTMLElement;
    const scrollHeight = doc.scrollHeight;
    const bodyHeight = 20 + 66 + 18 + 23 + 18;
    return scrollHeight - (HeadHeight + FootHeight + bodyHeight);
  }, []);

  const itemData = useMemo(
    () => ({
      list: topBookList,
      totalPage: 1,
      lastIndex: topBookList.length - 1,
      currentPage: 1
    }),
    [topBookList]
  );

  // 인기 있는 책 호출
  const getTopBooks = async () => {
    try {
      const response = await axiosFetch<any, TBookDetail[]>({
        url: '/api/aladin/popular',
        method: 'get'
      });

      if (response.status === 200) {
        setTopBookList(response.data);
      } else {
        Alert.error({ title: '데이터를 불러오지 못했습니다.' });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    }
  };

  // 인기 있는 책 호출
  useEffect(() => {
    getTopBooks();
  }, []);

  return (
    <Wrap>
      <Spacing height={20} />
      <BannerWrap>
        <DisplayAds />
      </BannerWrap>
      <Spacing height={18} />
      <Title>지금 가장 인기 있는 책 TOP 10</Title>
      <Spacing height={18} />
      {!!topBookList.length ? (
        <FixedSizeList
          className="hidden-scroll"
          itemSize={142}
          width="100%"
          height={listHeight}
          itemCount={topBookList.length}
          itemData={itemData}
        >
          {Book}
        </FixedSizeList>
      ) : (
        <Empty>검색된 도서가 없어요</Empty>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 13px;
  display: flex;
  flex-direction: column;
  align-items: center;

  div::-webkit-scrollbar {
    display: none;
  }
`;

const BannerWrap = styled.section`
  width: 100%;
  height: 66px;
  border-radius: 20px;
  background-color: transparent;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.basicDark};
  align-self: flex-start;
`;

const Empty = styled.p`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: #747474;
`;
