export const timestampNow = async () => {
  let date_timestamp: Date = new Date();
  const timestampSeconds: number = Math.floor(date_timestamp.getTime() / 1000);
  return timestampSeconds;
};

export const go = (obj: Record<string, string>) => {
  const entries = Object.entries(obj);

  let queryString = '';

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];

    if (i === 0) {
      queryString += '?';
    } else {
      queryString += '&';
    }

    queryString += `${key}=${value}`;
  }

  return queryString;
};

// list 데이터 object 변환 함수
export const convertObject = <T>(list: T[], key: keyof T): Record<string, T> => {
  const object: Record<string, T> = {};

  if (typeof list !== 'object') {
    return object;
  }

  for (const data of list) {
    const mapKey: T[keyof T] = data[key];

    if (typeof mapKey === 'string') object[mapKey] = data;
  }

  return object;
};

// debounce 함수 - 함수 실행시 time 밀리세컨드 지나면 함수 실행
// 단 time 밀리세컨드가 진행 중인 상황에 다시 한번 발생하면 취소 후 타임 지난 후 실행
export const debounce = (callback: (...args: any[]) => void, time: number) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: any[]): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    timeoutId = setTimeout(() => {
      callback(...args);

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    }, time);
  };
};

// 날짜가 동일한지 확인
export const isSameDate = (currentDate: string | Date, compareDate: string | Date) => {
  const current = new Date(currentDate);
  const compare = new Date(compareDate);

  if (current.getFullYear() !== compare.getFullYear()) {
    return false;
  }

  if (current.getMonth() !== compare.getMonth()) {
    return false;
  }

  if (current.getDate() !== compare.getDate()) {
    return false;
  }

  return true;
};

// 현재 날짜가 비교할 날짜보다 작은가?
export const isPastDate = (currentDate: string | Date, compareDate: string | Date) => {
  const current = new Date(currentDate);
  const compare = new Date(compareDate);

  if (current.getFullYear() < compare.getFullYear()) {
    return true;
  } else if (current.getFullYear() > compare.getFullYear()) {
    return false;
  }

  if (current.getMonth() < compare.getMonth()) {
    return true;
  } else if (current.getMonth() > compare.getMonth()) {
    return false;
  }

  if (current.getDate() < compare.getDate()) {
    return true;
  } else if (current.getDate() > compare.getDate()) {
    return false;
  }

  return false;
};
