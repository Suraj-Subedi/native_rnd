import {StyleSheet} from 'react-native';

const colors = {
  black: '#000000',
  lightBlack: '#242424',
  text: '#333333',
  white: '#FFFFFF',
  gray: '#CCCCCC',
  graySix: '#666666',
  grayDark: '#999999',
  grayLight: '#F3F4F8',
  gray31: '#313131',
  primary: '#38A412',
  secondary: '#F05158',
  yellow: '#EBB802',
  greenBlue: '#32C2B9',
  labelColor: 'rgba(0, 0, 0, 0.5)',
  polarGreen: '#F6FFED',
  polarGreenSix: '#52C41A',
  grayMedium: '#C4C4C4',
  bannerblack: '#122E3C',
  red: '#DC143C',
  borderColor: '#DDDCDC',
  orange: '#E2845A',
  blue: '#0000FF',
  dimGreen: '#ECF2E9',
};

const typographyCommon = StyleSheet.create({
  font: {
    fontStyle: 'normal',
    color: colors.text,
  },
});

const bottomSheet = StyleSheet.create({
  border: {
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  areaBS: {
    shadowColor: colors.text,
    shadowRadius: 6.32,
    elevation: 16,
  },
});

const typography = StyleSheet.create({
  header1: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: 48,
  },
  header2Bold: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 36,
  },
  header2Regular: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 36,
  },
  buttonText: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 26,
  },
  captionBold: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
  },
  captionRegular: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 22,
  },
  textBold: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
  },
  text: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  subHeading: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 12,
    lineHeight: 20,
  },
  subHeadingBold: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 12,
    lineHeight: 20,
  },
  textHeader: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 22,
    lineHeight: 36,
    color: '#333333',
  },
  textBoardingPassHeader: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 18,
    lineHeight: 36,
    color: '#FFFFFF',
  },
  smallText: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 10,
    lineHeight: 22,
  },
  drawerText: {
    ...typographyCommon.font,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 11,
    lineHeight: 13.83,
  },
});

export const THEME = {
  colors,
  typography,
  bottomSheet,
};
