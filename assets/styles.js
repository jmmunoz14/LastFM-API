import { StyleSheet, Dimensions, StatusBar, Platform, PixelRatio } from 'react-native';
import Constants from 'expo-constants';

const win = Dimensions.get('window');

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 440;

function actuatedNormalize(size) {
    StatusBar.setBarStyle('dark-content', true)

    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
}


let globalStyles;
// define your styles



globalStyles = StyleSheet.create({
    container: {
        backgroundColor: "#525252",
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : Constants.statusBarHeight,
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: "#ec625f",
        width: win.width * 0.8,
        alignSelf: "center",
        height: win.height * 0.05,
        borderRadius: 25,
        justifyContent: "center"
    },
    buttonText: {
        color: "#414141",
        fontSize: actuatedNormalize(15),
        fontWeight: "bold",
        textAlign: "center",
    },
    listContainer: {
        backgroundColor: "#525252",
    },

    listTitle: {
        color: "#ec625f",
        fontWeight: "bold"
    },

    listSubtitle: {
        color: "#313131",
    },
    mainTitle: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: actuatedNormalize(32),
        textAlign:"center",
        marginBottom: 15,
        marginStart:win.width*0.05,
        marginEnd:win.width*0.05,

    },
    modal: {
        backgroundColor: "#414141",
        width: win.width * 0.9,
        height: win.height * 0.8,
        borderRadius: 30,
        padding: 15,
        paddingBottom: 30,
    },
    modalTitle: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: actuatedNormalize(24)
    },
    modalSubtitle: {
        color: "#FFFFFF",
        fontSize: actuatedNormalize(18)
    },
    link: {
        color: "#ec625f",
        fontSize: actuatedNormalize(18)
    },
    modalNumber:{
        color: "#ec625f",
        fontSize: actuatedNormalize(25),
        fontWeight:"bold"
    }

});



export var CreateLocalStyle = function (style) {
    return MergeStyles(globalStyles, style);
}
function MergeStyles(style1, style2) {
    for (var valor in style1) {
        var target = style2[valor];
        if (target) {
            for (propiedad in target) {
                if (typeof (target[propiedad]) === 'object') {
                    var hijo = target[propiedad];
                    delete target[propiedad];
                    for (copiar in target) {
                        if (!hijo[copiar] && typeof (target[copiar]) !== 'object')
                            hijo[copiar] = target[copiar];
                    }
                    style2[propiedad] = StyleSheet.flatten([style1[valor], hijo])
                }
            }
            style2[valor] = StyleSheet.flatten([style1[valor], style2[valor]])
        } else {
            style2[valor] = style1[valor]
        }
    }
    return style2
}
