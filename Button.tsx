import { View, StyleSheet, Pressable, Text } from 'react-native';

export default function Button({ label }: { label: string }) {
	return (
		<View style={style.buttonContainer}>
			<Pressable style={style.button} onPress={() => alert('You pressed a button.')}>
				<Text style={style.buttonLabel}>{label}</Text>
			</Pressable>
		</View>
	);
}

const style = StyleSheet.create({
	buttonContainer: {
		width: 320,
		height: 68,
		marginHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 3
	},
	button: {
		borderRadius: 10,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	buttonIcon: {
		paddingRight: 8,
	},
	buttonLabel: {
		color: '#fff',
		fontSize: 16,
	}
})