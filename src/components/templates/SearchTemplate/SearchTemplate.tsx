import { initBookList, setBookDetail } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { Spacing } from '@components/common/Spacing';
import { SearchDetail } from '@components/templates/SearchTemplate/SearchDetail';
import { SearchInput } from '@components/templates/SearchTemplate/SearchInput';
import { useGetSearchList } from '@components/templates/SearchTemplate/hooks';
import { Alert } from '@utils/Alert';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Body, Head, Wrap } from './Styled';

export type TFormValue = {
  searchText: string | null;
  searchItem: string;
  page: number;
  scale: number;
};

export const SearchTemplate = () => {
  const bookDetail = useSelector((state: TRootState) => state.bookDetailStore);
  const dispatch = useDispatch();
  const getSearchBookList = useGetSearchList();

  const methods = useForm<TFormValue>({
    defaultValues: {
      searchText: null,
      searchItem: '전체',
      page: 1,
      scale: 10
    }
  });

  const navigate = useNavigate();

  const handleClickSearch = async ({ searchText }: TFormValue) => {
    if (!searchText) {
      Alert.warning({ title: '검색어를 입력해주세요.' });
      return;
    }

    const result = await getSearchBookList(methods.getValues());
    if (result) {
      // 검색 화면으로 이동
      navigate('/search/result');
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setBookDetail(null));
      dispatch(initBookList());
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <Wrap onSubmit={methods.handleSubmit(handleClickSearch)}>
        <Head>
          <SearchInput />
          <Spacing height={10} />
        </Head>
        <Body>
          <Outlet />
        </Body>
        {bookDetail !== null && <SearchDetail {...bookDetail} />}
      </Wrap>
    </FormProvider>
  );
};
