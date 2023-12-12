type TIconProps = {
  fillColor?: string;
  childColor?: string;
};

export const IconProgress = ({ fillColor = '#B780DB', childColor = 'white' }: TIconProps) => {
  return (
    <svg width="46" height="40" viewBox="0 0 46 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M45.1582 28.6803H39.8081C41.4356 25.3992 42.1888 21.6074 41.7386 17.6078C40.7171 8.43132 33.298 1.06413 24.1215 0.111851C16.4166 -0.693259 9.4823 2.91675 5.54332 8.72567L0.929084 8.64775C0.219202 8.63909 -0.230967 9.40092 0.123974 10.0156L2.81633 14.6731C2.08914 17.3741 1.89868 20.3002 2.42676 23.3302C3.8725 31.7016 10.677 38.3329 19.083 39.5276C25.697 40.4712 31.809 38.1425 36.025 33.9351C36.025 33.9351 36.0336 33.9351 36.0423 33.9351C38.0594 32.0739 42.1628 30.6195 45.3054 29.7191C45.9027 29.546 45.7729 28.6716 45.1495 28.6716L45.1582 28.6803Z"
        fill={fillColor}
      />
      <path
        d="M21.8629 18.7336C22.936 18.0126 23.7624 17.3801 23.7624 16.3808C23.7624 15.4321 23.0347 14.8123 22.1589 14.787C21.1845 14.8123 20.5554 15.4068 20.3581 16.6338C20.1977 17.5951 19.1986 18.1643 18.2612 18.1896C17.8911 18.1896 17.5458 18.1138 17.2251 17.962C16.3987 17.5445 16.0039 16.5452 16.1396 15.5965C16.2506 14.9008 16.4973 14.028 17.1141 13.2185C18.2242 11.7891 20.0867 11.144 22.1713 11.1567C25.847 11.1314 28.5112 12.8264 28.5112 16.1278C28.5112 18.2529 27.3888 19.5305 25.7113 20.5298C24.4408 21.3014 23.8118 22.0097 23.8118 23.4517C23.8118 23.4517 23.8118 24.7799 21.8136 24.7799C20.6664 24.7799 19.8647 24.1222 19.8647 23.4517C19.8647 20.5298 20.5431 19.6064 21.8629 18.7336ZM21.8629 24.9317C23.1087 24.957 24.2311 26.0069 24.2558 27.3351C24.2311 28.6885 23.1087 29.7637 21.8629 29.7384C20.5678 29.7637 19.4946 28.6885 19.5193 27.3351C19.4946 26.0069 20.5678 24.957 21.8629 24.9317Z"
        fill={childColor}
      />
    </svg>
  );
};