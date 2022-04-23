import React from "react";
import {StyleSheet, Text, View} from "react-native";

const AuthFormWrapper = ({children, heading, style}) => {
	return (
		<View>
			{heading && <Text style={styles.heading}>{heading}</Text>}
			<View style={[styles.container, {backgroundColor: style}]}>
				{children}
			</View>
		</View>
	);
};

export default AuthFormWrapper;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#f5f5f5",
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},

	heading: {
		color: "red",
		textAlign: "center",
		// marginBottom: 10,
		fontSize: 18,
		marginTop: 20,
		fontFamily: "SF_semibold",
	},
});
