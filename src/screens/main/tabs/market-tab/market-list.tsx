import React from 'react';
import { values, chain } from 'lodash';
import { FlatList, ListRenderItemInfo, ActivityIndicator } from 'react-native';
import { KunaAssetUnit, KunaMarket, kunaMarketMap } from 'kuna-sdk';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { inject, observer } from 'mobx-react';
import MarketRow from 'components/market-row';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';
import { compose } from 'recompose';

type State = {};

class MarketList extends React.Component<Props, State> {
    public render(): JSX.Element {
        if (!this.props.Ticker.lastUpdate) {
            return <ActivityIndicator />;
        }

        return (
            <>
                <FlatList data={values(kunaMarketMap)}
                          renderItem={this.__marketRowRenderer()}
                          initialNumToRender={10}
                          maxToRenderPerBatch={5}
                          scrollEnabled={false}
                />

                <SpanText style={{ color: Color.SecondaryText, fontSize: 12, paddingLeft: 20, paddingBottom: 20 }}>
                    {this.props.Ticker.lastUpdate}
                </SpanText>
            </>
        );
    }


    private __marketRowRenderer = () => {
        const { Ticker, activeAsset } = this.props;
        const enabledMarkets = this.__getEnabledMarkets(activeAsset);

        return (item: ListRenderItemInfo<KunaMarket>) => {
            const market = item.item;

            const currentTicker = Ticker.getTicker(market.key);
            const usdPrice = Ticker.usdCalculator.getPrice(market.key);

            return (
                <MarketRow market={market}
                           ticker={currentTicker}
                           usdPrice={usdPrice}
                           onPress={this.__pressMarketRow(item.item)}
                           visible={enabledMarkets.indexOf(market.key) >= 0}
                />
            );
        };
    };


    private __pressMarketRow = (market: KunaMarket) => {
        return () => {
            this.props.navigation.navigate('Market', { symbol: market.key });
        };
    };

    private __getEnabledMarkets = (activeAsset?: KunaAssetUnit): string[] => {
        if (!activeAsset) {
            return Object.keys(kunaMarketMap);
        }

        /** @TODO Implement favorite */
        return chain(kunaMarketMap)
            .filter((market: KunaMarket): boolean => [market.quoteAsset, market.baseAsset].indexOf(activeAsset) >= 0)
            .map((market: KunaMarket) => market.key)
            .value();
    };
}

type OuterProps = {
    favorite: boolean;
    activeAsset?: KunaAssetUnit;
};
type Props
    = OuterProps
    & mobx.ticker.WithTickerProps
    & NavigationInjectedProps;

export default compose<Props, OuterProps>(
    withNavigation,
    inject('Ticker'),
    observer,
)(MarketList);
