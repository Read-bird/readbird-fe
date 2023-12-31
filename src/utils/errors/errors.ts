export const convertError = (err: string) => {
  if (err?.includes(':')) {
    return err.replace(/^.*?:\s*/g, '');
  }

  switch (err) {
    case 'Network Error':
      return '네트워크가 원활하지 않습니다.';
    default:
      return '예기치 못한 오류가 발생하였습니다.';
  }
};
