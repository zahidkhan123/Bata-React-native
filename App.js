import React, {useEffect, useState} from "react";
import {ImageBackground, StyleSheet, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store, persistedStore} from "./redux/store/store";
import AppLoading from "expo-app-loading";
// Routes
import {AppNavigation} from "./navigation";
// images
import MaskImage from "./assets/mask.png";
import * as Font from "expo-font";
const loadFonts = async () => {
	return await Font.loadAsync({
		SF_bold: require("./assets/fonts/SFUIText-Bold.ttf"),
		SF_light: require("./assets/fonts/SFUIText-Light.ttf"),
		SF_medium: require("./assets/fonts/SFUIText-Medium.ttf"),
		SF_regular: require("./assets/fonts/SFUIText-Regular.ttf"),
		SF_semibold: require("./assets/fonts/SFUIText-Semibold.ttf"),
	});
};
export default function App() {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	if (!fontsLoaded) {
		return (
			<AppLoading
				startAsync={loadFonts}
				onError={() => console.log("ERROR")}
				onFinish={() => {
					setFontsLoaded(true);
				}}
			/>
		);
	}
	return (
		<Provider store={store}>
			<PersistGate
				// loading={<ActivityIndicator size="large" color="#ff0000" />}
				persistor={persistedStore}
			>
				<SafeAreaView>
					<ImageBackground source={MaskImage} style={styles.image}>
						<AppNavigation />
						<StatusBar style='auto' />
					</ImageBackground>
				</SafeAreaView>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	image: {
		height: "100%",
		width: "100%",
	},
});
