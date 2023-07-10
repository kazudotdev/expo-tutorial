import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './ImageViewer';
import Button from './Button';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function App() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
		} else {
			alert('You did not select any image.');
		}

	}
	return (
		<View style={styles.container}>
			<View style={styles.imageContaier}>
				<ImageViewer
					src={require('./assets/images/background-image.png')}
					selectedImage={selectedImage}
				/>
			</View>
			<View style={styles.footerContainer}>
				<Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
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
