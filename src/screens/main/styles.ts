import { StyleSheet } from 'react-native';
import { Color } from "styles/variables";

export const mainStyles = StyleSheet.create({
    swiperWrapper: {},
    container: {
        flex: 1,
    },
    baseBackground: {
        flex: 1,
        backgroundColor: Color.Main,
    },
    flatList: {
        flex: 1
    },
});

export const tabBarStyles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },

    tabBar: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        marginRight: 12,
        marginLeft: 12,
    },
    text: {
        fontSize: 24,
        alignItems: 'center',
        color: Color.Gray2,
        fontWeight: '600',
    },

    // Info bar
    infoBar: {
        height: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',

        borderBottomWidth: 1,
        borderBottomColor: Color.Gray3,
    },
});