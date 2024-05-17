import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { ChartData } from '../models/ChartData';
import { View, StyleSheet } from 'react-native';

const DonutChart = ({ chartExpenses }: { chartExpenses: ChartData[] }) => {
    const data = chartExpenses.map(chartData => {
        return { ...chartData, legendFontColor: "#080705", legendFontSize: 14 }
    })

    return (
        <PieChart
            style={{}}
            data={data}
            width={350}
            height={200}
            chartConfig={{
                backgroundColor: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="0"
            hasLegend={false}
        />

    )
};

export default DonutChart;

