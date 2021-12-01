export const transformCoord = ({
  videoPoint,
  originCoordsRightBottom,
  originCoordsLeftTop,
  videoHeight,
  videoWidth
}) => {
  let perWidth = Math.abs(originCoordsRightBottom.lng - originCoordsLeftTop.lng) / videoWidth;
  let perHeight = Math.abs(originCoordsRightBottom.lat - originCoordsLeftTop.lat) / videoHeight;
  return [videoPoint[0] * perWidth + originCoordsLeftTop.lng, originCoordsLeftTop.lat - videoPoint[1] * perHeight];
};

export const transformCoordReverse = ({
  coord,
  originCoordsRightBottom,
  originCoordsLeftTop,
  videoHeight,
  videoWidth
}) => {
  let perWidth = Math.abs(originCoordsRightBottom.lng - originCoordsLeftTop.lng) / videoWidth;
  let perHeight = Math.abs(originCoordsRightBottom.lat - originCoordsLeftTop.lat) / videoHeight;
  return [(coord[0] - originCoordsLeftTop.lng) / perWidth, (originCoordsLeftTop.lat - coord[1]) / perHeight];
};

export const validLnglat = (lnglat) => {
  if (!lnglat) {
    return false;
  }
  if (lnglat[0] < -90 || lnglat[1] > 90 || lnglat[0] > 90 || lnglat[1] < -90) {
    return false;
  }
  return true;
};
