import { Platform } from 'react-native';

export enum Color {
    Main = '#5850FA',
    Secondary = '#3DC3FA',

    CommonShadowColor = '#C5C4CC',

    Purple = '#312A7D',
    Fade = '#676793',
    DarkPurple = '#0D0D3F',

    Text = '#0B0A0E',
    SecondaryText = '#858486',

    DeepBlue = '#2E71F0',

    PurpleNoactive = '#9DA3B8',

    Gray3 = '#E6EAEE',
    GrayWhite = '#F5F7F8',
    GrayNoactive = '#DCDCDC',

    GrayLight = '#F2F2F2',


    NewMilkWhite = '#FFFFFF',
    NewMilkBlue = '#F8F8FA',


    White = '#FFFFFF',
    Black = '#000000',


    Success = '#00BA4F',
    Warning = '##FFECA9',
    Danger = '#FD2A47',
}

export const Fonts = {
    TTNorms_Bold: 'TTNormsPro-Bold',
    TTNorms_Medium: 'TTNormsPro-Medium',
    TTNorms_Regular: 'TTNormsPro-Regular',
};


export const DefaultStyles: any = {
    thinFont: {
        fontWeight: '400',
        fontFamily: Fonts.TTNorms_Regular,
    },
    mediumFont: {
        fontWeight: '500',
        fontFamily: Fonts.TTNorms_Medium,
    },
    boldFont: {
        fontWeight: '700',
        fontFamily: Fonts.TTNorms_Bold,
    },
};
