import { TRootState } from '@/store/state';
import { Loading } from '@components/common/Loading';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const LoadingTemplate = () => {
  const { loading } = useSelector((state: TRootState) => state.loadingStore);

  return (
    <Fragment>
      {loading && (
        <Wrap>
          <Loading />
        </Wrap>
      )}
    </Fragment>
  );
};

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f580;
`;
