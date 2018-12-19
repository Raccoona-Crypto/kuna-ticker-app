import React from 'react';
import { find } from 'lodash';
import numeral from 'numeral';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { View, TouchableOpacity } from 'react-native';
import { KunaMarket, KunaV3Ticker } from 'kuna-sdk';
import { numFormat } from 'utils/number-helper';
import { SpanText } from 'components/span-text';

import { MarketNameCell } from './market-name-cell';
import { styles } from './styles';
import { UsdCalculator } from 'utils/currency-rate';

const MarketRow = (props: MarketRowProps) => {
    const { market, ticker, tickers, usdRate, navigation, index } = props;

    if (!ticker || !ticker.lastPrice) {
        return <View />;
    }

    const onPress = () => {
        if (!ticker) {
            return;
        }

        navigation.navigate('Market', { symbol: market.key });
    };

    const usdPrice = new UsdCalculator(usdRate, tickers).getPrice(market.key);
    const dailyChangeStyles = [
        styles.dailyChange,
        ticker.dailyChangePercent > 0 ? styles.dailyChangeUp : styles.dailyChangeDown,
    ];

    return (
        <>
            {index > 0 ? <View style={styles.listItemSeparator} /> : undefined}

            <TouchableOpacity key={market.key} onPress={onPress} style={styles.listItemLink}>
                <View style={styles.listItem}>
                    <MarketNameCell market={market} />

                    <View style={styles.tickerCell}>
                        <View style={styles.priceBox}>
                            <SpanText style={styles.priceValue}>
                                {ticker.lastPrice ? numFormat(ticker.lastPrice || 0, market.format) : '—'}
                            </SpanText>
                            <SpanText style={styles.priceLabel}>{market.quoteAsset}</SpanText>
                        </View>

                        <View style={styles.secondaryInfo}>
                            <SpanText style={styles.marketVolume}>
                                ≈ ${usdPrice.format('0,0.00')}
                            </SpanText>
                            <SpanText style={styles.separator}> / </SpanText>
                            <SpanText style={dailyChangeStyles}>
                                {numeral(ticker.dailyChangePercent).format('+0,0.00')}%
                            </SpanText>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
};

type MarketRowOuterProps = {
    market: KunaMarket;
    index: number;
};

type ConnectedProps = {
    ticker?: KunaV3Ticker;
    tickers: Record<string, KunaV3Ticker>;
    usdRate: number;
};

type MarketRowProps = NavigationInjectedProps & MarketRowOuterProps & ConnectedProps;

const mapStateToProps = (store: KunaStore, ownProps: MarketRowOuterProps): ConnectedProps => {
    return {
        ticker: find(store.ticker.tickers, { symbol: ownProps.market.key }),
        tickers: store.ticker.tickers,
        usdRate: store.ticker.usdRate,
    };
};

export default compose<MarketRowProps, MarketRowOuterProps>(
    connect(mapStateToProps),
    withNavigation,
)(MarketRow);
