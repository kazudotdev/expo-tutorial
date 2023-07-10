import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './ImageViewer';
import Button from './Button';

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.imageContaier}>
				<ImageViewer src={require('./assets/images/background-image.png')} />
			</View>
			<View style={styles.footerContainer}>
				<Button label="Choose a photo" />
				<Button label="Use this photo" />
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageContaier: {
		flex: 1,
		paddingTop: 58,
	},
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	},
	footerContainer: {
		flex: 1 / 3,
		alignItems: 'center',
	}
});
