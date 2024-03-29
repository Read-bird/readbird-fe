import { axiosFetch } from '@api/axios';
import { TSearchBooksResult } from '@api/types';
import { Spacing } from '@components/common/Spacing';
import { Book } from '@components/templates/MyPageTemplate/MyLibraryTemplate/Book';
import { Alert } from '@utils/Alert';
import { FootHeight, HeadHeight } from '@utils/constants';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export type TResponseData = Omit<TSearchBooksResult, 'bookList'> & { bookList: TResponseLibrary[] };

export type TResponseLibrary = {
  planId: number;
  startDate: string;
  endDate: string;
  bookId: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  isbn: string;
  publisher: string;
};

export const MyLibraryTemplate = () => {
  const [bookList, setBookList] = useState<TResponseLibrary[]>([]);
  const page = useRef(1);
  const [totalPage, setTotalPage] = useState(1);

  const listHeight = useMemo(() => {
    const doc = document.querySelector('#root') as HTMLElement;
    const scrollHeight = doc.scrollHeight;
    const bodyHeight = 30;
    return scrollHeight - (HeadHeight + FootHeight + bodyHeight);
  }, []);

  const getPlanList = async (page: number) => {
    try {
      const res = await axiosFetch<any, TResponseData>({
        url: `/api/user/plan/success`,
        method: 'get',
        options: {
          params: {
            page,
            scale: 10
          }
        }
      });

      if (res.status === 200) {
        setBookList((prev) => (page === 1 ? res.data.bookList : prev.concat(res.data.bookList)));
        setTotalPage(res.data.totalPage);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        Alert.error({ title: convertError(err.response?.data.message) });
      }
    }
  };

  const getNextPage = useCallback(() => {
    getPlanList(page.current + 1);
    page.current += 1;
  }, [page]);

  useEffect(() => {
    getPlanList(page.current);
  }, []);

  return (
    <Wrap>
      <Spacing height={30} />
      {!!bookList.length ? (
        <FixedSizeList
          className="scroll"
          height={listHeight}
          itemSize={142}
          width="100%"
          itemCount={bookList.length}
          itemData={{
            list: bookList,
            totalPage: totalPage,
            lastIndex: bookList.length - 1,
            currentPage: page.current,
            getNextPage: getNextPage
          }}
        >
          {Book}
        </FixedSizeList>
      ) : (
        <Empty>아직 읽은 책이 없어요.</Empty>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 13px;
`;

const Empty = styled.p`
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: #747474;
`;
