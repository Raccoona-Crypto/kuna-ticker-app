import React from 'react';
import { View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { inject, observer } from 'mobx-react/native';
import SpanText from 'components/span-text';
import Constants from 'utils/constants';
import styles from './kuna-code-tab.style';
import TelegramLink from './telegram-link';


// @ts-ignore
firebase.admob().initialize(Constants.ADMOB_APP_ID);

type KunaCodeTabProps = mobx.kunacode.WithKunaCodeProps;

@inject('KunaCode')
@observer
export default class KunaCodeTab extends React.Component<KunaCodeTabProps> {
    public state: any = {
        status: '',
    };

    public render(): JSX.Element {
        const { Banner, AdRequest } = (firebase as any).admob;
        const request = new AdRequest();

        const kunaCodeOffers = this.props.KunaCode.offers;

        return (
            <>
                <View style={styles.container}>
                    <SpanText>{this.state.status}</SpanText>

                    <ScrollView style={{ flex: 1 }}>
                        {kunaCodeOffers.map((offer: kunacodes.Offer) => (
                            <View key={offer.id} style={{ marginTop: 20 }}>
                                <SpanText>{offer.amount} {offer.currency}</SpanText>
                                <SpanText>{offer.comment}</SpanText>
                                {offer.user && <TelegramLink telegram={offer.user.contact} />}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.adBanner}>
                    <SpanText style={styles.adNotification}>
                        It's a test! Don't try to say anything about..! I'll remove it on release next release
                    </SpanText>
                    <Banner
                        unitId={Constants.ADMOB_BANNERS.test}
                        size="SMART_BANNER"
                        request={request.build()}
                        onAdLoaded={() => {
                            this.setState({ status: 'Advert loaded' });
                        }}
                    />
                </View>
            </>
        );
    }
}
