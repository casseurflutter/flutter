import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type PropsWithFillColor = SvgProps & {
  fillColor?: string;
};

const SvgComponent = ({ fillColor = "#fff", ...props }: PropsWithFillColor) => (
  <Svg
    width={70}
    height={51}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fill={fillColor}
      d="M69.938 2.23A1.886 1.886 0 0 0 67.754.864l-16.973 3.38c-1.488-1.766-3.563-2.92-5.825-3.097-1.599-.124-3.23.142-4.774.756-4.055 1.607-5.129 5.418-5.99 8.482-.21.747-.417 1.49-.667 2.19C23.818 5.893 6.466-.943 1.223 1.005A1.88 1.88 0 0 0 0 2.768c.005 3.44 3.534 7.156 8.003 11.862 1.225 1.291 2.5 2.634 3.735 4.013 1.246 3.83 3.29 6.346 5.432 8.459-5.323 6.717-9.564 16.785-7.453 21.03.685 1.378 1.964 2.146 3.55 2.146.121 0 .249-.005.376-.015 2.198-.164 4.165-2.157 6.885-4.919 1.602-1.626 3.407-3.458 5.603-5.3 3.648-.463 6.998-1.952 10.014-4.06 4.281 1.655 8.235 2.713 14.241 1.392 1.548.174 3.08.384 4.542.587 2.999.413 5.555.765 7.631.765 1.847 0 3.314-.279 4.373-1.042.638-.46.922-1.267.712-2.025-1.448-5.22-7.617-10.708-18.27-16.313 1.607-3.439 2.684-6.765 3.175-9.55l16.159-5.306a1.879 1.879 0 0 0 1.23-2.263ZM15.206 17.148a1.893 1.893 0 0 0-.392-.702c-1.345-1.514-2.744-2.989-4.087-4.402-2.514-2.65-5.288-5.57-6.432-7.66 5.203.348 18.013 5.09 26.694 10.998-.862.675-1.87 1.384-2.943 2.135-2.505 1.753-5.523 3.921-8.357 6.794-1.897-1.882-3.505-3.94-4.483-7.163Zm9.979 19.222c-.37.034-.722.178-1.01.415-2.544 2.087-4.64 4.212-6.323 5.922-1.646 1.67-3.696 3.75-4.488 3.808-.046.005-.086.005-.12.005-.083-.003-.134-.01-.125.002-1.156-1.267 1.651-11.087 8.025-18.329 2.898-3.29 6.168-5.579 9.055-7.596 3.316-2.322 5.933-4.153 6.858-6.741.28-.783.516-1.614.753-2.453.888-3.165 1.585-5.146 3.76-6.007a7.13 7.13 0 0 1 2.619-.521c.158 0 .318.007.477.02 1.905.146 3.602 1.592 4.304 3.634C47.67 17.562 38.353 35.1 25.185 36.37Zm38.13-1.412c-1.95.098-5.266-.36-7.873-.719-1.595-.22-3.27-.45-4.96-.633a1.817 1.817 0 0 0-.629.037c-4.242.983-7.246.574-10.317-.427 3.253-3.033 6-6.737 8.132-10.532 9.908 5.212 14.05 9.358 15.647 12.274Z"
    />
    <Path
      d="M42.252 10.267c.352.376.826.577 1.328.577.501 0 .976-.2 1.328-.577a1.57 1.57 0 0 0 .4-.6 1.79 1.79 0 0 0 0-1.428 1.685 1.685 0 0 0-.4-.626c-.702-.678-1.955-.678-2.657 0a2.1 2.1 0 0 0-.398.626 1.79 1.79 0 0 0-.152.726c0 .25.051.475.152.702.073.225.225.426.398.6Z"
      fill={fillColor}
    />
  </Svg>
);

export default SvgComponent;
