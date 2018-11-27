import React from 'react';
import { View, ScrollView, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import qs from 'querystring';
import { Color, Fonts } from 'styles/variables';
import { SpanText } from 'components/span-text';
import Analytics from 'utils/ga-tracker';
import { textContent } from './text-content';

type LinkItem = {
    title: string;
    label: string;
    url: string;
    disabled?: boolean;
};

const links: LinkItem[] = [{
    title: 'GitHub Repository',
    label: 'CoinWizard/kuna-ticker-app',
    url: 'https://github.com/CoinWizard/kuna-ticker-app',
}, {
    title: 'Roadmap',
    label: 'Trello Board',
    url: 'https://trello.com/b/9k4PHBO4/kuna-tiker-mobile-roadmap',
}, {
    title: 'Kuna Ticker Website',
    label: 'coinwizard.github.io/kuna-ticker-app',
    url: 'https://coinwizard.github.io/kuna-ticker-app?ref=application',
    disabled: true,
}, {
    title: 'Telegram',
    label: '@MaksymTymchyk',
    url: 'https://t.me/MaksymTymchyk',
}, {
    title: 'Email',
    label: 'maksym.tymchyk@gmail.com',
    url: `mailto:maksym.tymchyk@gmail.com?${qs.stringify({ subject: 'Kuna Ticker' })}`,
}];


const AboutTab = (): JSX.Element => {
    const linkTo = (url: string, title: string) => {
        return async () => {
            const can = await Linking.canOpenURL(url);

            if (can) {
                Analytics.logEvent('open_link', {
                    title: title,
                });

                Linking.openURL(url);
            }
        };
    };

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.topic}>
                    <SpanText style={styles.topicTitle}>About Kuna Ticker</SpanText>
                </View>

                <Markdown style={mdStyles}>{textContent}</Markdown>
            </View>

            <View style={styles.separator} />

            <View style={styles.linksContainer}>
                {links.map((item: LinkItem, index: number) => {
                    const { title, url, label, disabled = false } = item;

                    if (disabled) {
                        return <View key={index} />;
                    }

                    return (
                        <TouchableOpacity key={index} onPress={linkTo(url, title)} style={styles.linkItem}>
                            <SpanText style={styles.linkItemTitle}>{title}</SpanText>
                            <SpanText style={styles.linkItemLabel}>{label}</SpanText>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
};

export default AboutTab;

const mdStyles = StyleSheet.create({
    root: {},
    view: {},
    text: {
        fontSize: 16,
        lineHeight: 20,
        color: Color.DarkPurple,
        fontFamily: Fonts.TTNorms_Regular,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    topic: {
        marginTop: 10,
        marginBottom: 10,
    },
    topicTitle: {
        color: Color.DarkPurple,
        fontSize: 24,
        fontWeight: '600',
    },

    separator: {
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: Color.Gray3,
    },

    linksContainer: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    linkItem: {
        marginBottom: 20,
    },
    linkItemTitle: {
        color: Color.Gray2,
    },
    linkItemLabel: {
        marginTop: 3,
        fontSize: 18,
        fontWeight: '500',
    },
});


