import React from "react";
import {Text, View, TextInput, StyleSheet} from "react-native";
import {Controller} from "react-hook-form";

// styles / tailwind
import tw from "../common/themeTailwind";

// helper utils
import {isEmptyObj} from "../utils/helperFunction";

const CustomInput = ({
	control,
	errors,
	defaultValue,
	name,
	errorMessage,
	rules,
	label,
	password,
	keyboardType,
	placeholder,
	setError,
	style,
	maxLength,
	editable,
	multiline,
	feedback,
}) => {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.label}>{label}</Text>
			<Controller
				control={control}
				rules={rules}
				render={({field: {onChange, onBlur, value}}) => (
					<TextInput
						style={[
							styles.input,
							isEmptyObj(errors[name]) && {borderColor: "#E4001C"},
							tw.style(`${style ?? ""}`),
							feedback && styles.feed,
						]}
						onBlur={onBlur}
						onChangeText={onChange}
						value={value}
						secureTextEntry={password ? true : false}
						keyboardType={keyboardType}
						maxLength={maxLength === "4" ? +maxLength : maxLength}
						// minLength={+minLength}
						// maxLength={+maxLength}
						placeholder={placeholder}
						setError={setError}
						defaultValue={defaultValue}
						editable={editable}
						multiline={multiline}
					/>
				)}
				name={name}
			/>

			{errors[name] && <Text style={styles.errorMessage}>{errorMessage}</Text>}
		</View>
	);
};

export default CustomInput;

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 15,
	},

	label: {
		marginBottom: 5,
		fontSize: 16,
		fontFamily: "SF_semibold",
	},

	input: {
		width: "100%",
		height: 50,
		fontSize: 16,
		paddingHorizontal: 10,
		backgroundColor: "white",
		borderRadius: 5,
	},

	errorMessage: {
		color: "#E4001C",
		marginLeft: 5,
		marginTop: 5,
		fontFamily: "SF_regular",
	},
	feed: {textAlignVertical: "top", height: 370},
});
