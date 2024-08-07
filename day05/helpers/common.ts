import { Dimensions } from "react-native";

const {width : SCREEN_WIDTH, height : SCREEN_HEIGHT} = Dimensions.get('window');

const hp = (percent: number) => {
    return (percent * SCREEN_HEIGHT) / 100;
}
const wp = (percent: number) => {
    return (percent * SCREEN_WIDTH) / 100;
}


export { hp, wp };