// import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { getBackgroundColor } from '../utils/Helper';
// import { Dimensions } from "react-native";
// const { width, height } = Dimensions.get("window");
// import Svg, { Circle, Path } from 'react-native-svg';

// interface ChartData {
//     label: string;
//     y: Number;
//     expenseCount: number;
//     color: string;
//     name: string;
//     id: string;
// }

// const MyChart = () => {
//     const { sortedExpenses } = useSelector((state: RootState) => state.expenseReducer);
//     const [chartExpenses, setChartExpenses] = useState<ChartData[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selected, setSelected] = useState(-1);

//     useEffect(() => {
//         const updatedExpenses = Object.keys(sortedExpenses).map(day => sortedExpenses[day]);
//         const flatExpenses = updatedExpenses.flat();
//         // setChartExpenses([...flatExpenses]);
//         const categories: { [key: string]: { total: number, count: number } } = {};
//         let totalExpenses = 0;
//         flatExpenses.forEach((expense) => {
//             if (categories[expense.category]) {
//                 let amount = categories[expense.category].total
//                 let count = categories[expense.category].count
//                 categories[expense.category] = { total: amount + expense.amount, count: count + 1 };
//             } else {
//                 categories[expense.category] = { total: expense.amount, count: 1 };
//             }
//             totalExpenses += expense.amount;
//         });
//         let chartData = Object.keys(categories).map(category => {
//             let percentage = (categories[category].total / totalExpenses * 100).toFixed(0)
//             return {
//                 label: `${percentage}%`,
//                 y: Number(categories[category].total),
//                 expenseCount: categories[category].count,
//                 color: getBackgroundColor(category),
//                 name: category,
//                 id: category
//             }
//         });

//         setChartExpenses(chartData);
//     }, [sortedExpenses]);

//     const data = [
//         { value: 30, color: 'red' },
//         { value: 40, color: 'blue' },
//         { value: 20, color: 'green' },
//         { value: 10, color: 'yellow' },
//     ];

//     const centerX = 200 / 2;
//     const centerY = 200 / 2;
//     let radius = Math.min(200, 200) / 2;
//     const strokeWidth = radius * 0.4;


//     const calculatePath = () => {
//         let total = data.reduce((sum, { value }) => sum + value, 0);
//         let startAngle = 0;

//         return data.map(({ value, color }, index) => {
//             const angle = (value / total) * 360;
//             const endAngle = startAngle + angle;
//             const largeArcFlag = angle > 180 ? 1 : 0;

//             // Calculate start and end points of the arc

//             let updatedRadius = radius;
//             if (selected === index) { updatedRadius += 5 }
//             const startX = centerX + updatedRadius * Math.cos((startAngle * Math.PI) / 180);
//             const startY = centerY + updatedRadius * Math.sin((startAngle * Math.PI) / 180);
//             const endX = centerX + updatedRadius * Math.cos((endAngle * Math.PI) / 180);
//             const endY = centerY + updatedRadius * Math.sin((endAngle * Math.PI) / 180);

//             // Build SVG path
//             const path = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} L ${centerX} ${centerY} Z`;

//             startAngle += angle;

//             return (
//                 <TouchableWithoutFeedback key={index} onPress={() => setSelected(index)}>
//                     <Path
//                         d={path}
//                         fill={selected === index ? 'teal' : color}
//                         strokeWidth={selected === index ? strokeWidth * 1.7 : strokeWidth}
//                     />
//                 </TouchableWithoutFeedback>
//             );
//         });
//     };


//     const renderChart = () => {
//         // let colorScales = chartExpenses.map(data => data.color);
//         // let totalExpenses = chartExpenses.reduce((a, b) => a + (b.expenseCount), 0)

//         return (
//             <View style={{ width: 250, height: 250, backgroundColor: "aqua" }}>
//                 <Svg style={{ flex: 1 }} width={width} height={height}>
//                     {calculatePath()}
//                     <Circle cx={centerX} cy={centerY} r={radius - strokeWidth} fill="white" />
//                 </Svg>
//             </View >
//         )
//     }

//     return (
//         <View style={{ justifyContent: "center", alignItems: "center" }}>
//             {renderChart()}
//         </View>
//     )
// }

// export default MyChart

// const styles = StyleSheet.create({})