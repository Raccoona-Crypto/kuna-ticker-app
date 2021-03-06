import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 25,
    },
    headerBrow: {
        backgroundColor: '#93A9C3',
        width: 50,
        height: 4,
        borderRadius: 10,
    },
});

export const cardStyles = StyleSheet.create({
    shadeView: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
    },
    scrollView: {
        // flex: 1,
        zIndex: 3,
    },
    innerContent: {
        flex: 1,
    },

    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
    },
});

export const layoutStyles = StyleSheet.create({
    main: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#02193B',
    },
});
