import React from 'react';
import { map } from 'lodash';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { KunaMarket } from 'kuna-sdk';
import { LineChart, BarChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { fetchKunaTradeHistory } from 'utils/kuna-client';
import { Color } from 'styles/variables';
import SpanText from 'components/span-text';

import LastPriceSvg from './last-price.element';
import LimitPriceSvg from './limit-price.element';

import ChartStyles from './chart.style';

const IntervalMap = {
    '24H': ['30', 1],
    '7d': ['60', 7],
    '30d': ['1D', 30],
    '3M': ['1D', 90],
    '6M': ['1D', 180],
    '1Y': ['1D', 360],
    'ALL': ['1D', 1000],
};

type PriceChartProps = {
    market: KunaMarket;
};


export default class Chart extends React.PureComponent<PriceChartProps> {
    public state: any = {
        currentInterval: '30d',
        ready: false,
        dataClose: [],
        dataVolume: [],
    };

    public async componentDidMount(): Promise<void> {
        setTimeout(this.__fetchTradeHistory, 400);
    }


    public render(): JSX.Element {

        const { currentInterval, ready } = this.state;

        return (
            <View>
                <View style={ChartStyles.sheet.tagContainer}>
                    {map(IntervalMap, (item: any[], index: string) => {
                        const onPress = () => {
                            if (!ready || currentInterval === index) {
                                return;
                            }

                            this.setState({ currentInterval: index }, this.__fetchTradeHistory);
                        };

                        const isActive = currentInterval === index;

                        return (
                            <TouchableOpacity key={index} onPress={onPress}>
                                <View style={[
                                    ChartStyles.sheet.tagUnit,
                                    isActive ? ChartStyles.sheet.tagUnitActive : undefined,
                                ]}>
                                    <SpanText style={[
                                        ChartStyles.sheet.tagUnitText,
                                        isActive ? ChartStyles.sheet.tagUnitTextActive : undefined,
                                    ]}>
                                        {index}
                                    </SpanText>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={ChartStyles.sheet.chartContainer}>{this.__renderChart()}</View>
            </View>
        );
    }


    private __renderChart = () => {
        const { market } = this.props;
        const { dataClose, dataVolume } = this.state;

        if (dataClose.length < 2) {
            return <ActivityIndicator color={Color.Main} />;
        }

        const maxValue = Math.max(...dataClose);
        const minValue = Math.min(...dataClose);
        const lastPrice = dataClose[dataClose.length - 1];
        const depth = maxValue - minValue;

        const contentInset = { top: 12, bottom: 12 };

        return (
            <>
                {this.state.ready ? undefined : (
                    <ActivityIndicator color={Color.Main} style={ChartStyles.sheet.loader} />
                )}

                <LineChart
                    style={{ flex: 1 }}
                    data={dataClose}
                    contentInset={contentInset}
                    curve={shape.curveNatural}
                    gridMax={maxValue + depth * 0.1}
                    gridMin={minValue - depth * 0.1}
                    svg={{ strokeWidth: 4, stroke: Color.Main }}
                >
                    <LastPriceSvg lastPrice={lastPrice} />
                    <LimitPriceSvg price={minValue} format={market.format} side="bottom" lastPrice={lastPrice} />
                    <LimitPriceSvg price={maxValue} format={market.format} side="top" lastPrice={lastPrice} />
                </LineChart>

                <BarChart
                    data={dataVolume}
                    style={{ height: 20, width: '100%' }}
                    svg={{ fill: Color.Gray3, strokeLinecap: 'round' }}
                />

            </>
        );
    };

    private __fetchTradeHistory = async () => {
        const market = this.props.market;

        this.setState({ ready: false });

        // @ts-ignore
        const currentInterval = IntervalMap[this.state.currentInterval];

        const history = await fetchKunaTradeHistory(market.key, currentInterval[0], currentInterval[1]);

        this.setState({
            ready: true,
            dataClose: history.c,
            dataVolume: history.v,
        });
    };
}
