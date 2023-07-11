import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';
import ImageViewer from './ImageViewer';
import Button from './Button';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import CircleButton from './CircleButton';
import IconButton from './IconButton';
import EmojiPicker from './EmojiPicker';
import EmojiList from './EmojiList';
import EmojiSticker from './EmojiSticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

export default function App() {
	const [pickedEmoji, setPickedEmoji] = useState(null);
	const [showAppOptions, setShowAppOptions] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [status, requestPermission] = MediaLibrary.usePermissions();
	const imageRef = useRef();

	if (status === null) {
		requestPermission();
	}

	const onRest = () => {
		setShowAppOptions(false);
	};

	const onAddSticker = () => {
		setIsModalVisible(true);
	};

	const onModalClose = () => {
		setIsModalVisible(false);
	}

	const onSaveImageAsync = async () => {
		if (Platform.OS !== 'web') {
			try {
				const localUri = await captureRef(imageRef, {
					height: 440,
					quality: 1,
				});
				await MediaLibrary.saveToLibraryAsync(localUri);
				if (localUri) {
					alert("Saved!");
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				const dataUrl = await domtoimage.toJpeg(imageRef.current, {
					quality: 0.95,
					width: 320,
					height: 440,
				});
				let link = document.currentElement('a');
				link.download = 'sticker-smash.jepg';
				link.href = dataUrl;
				link.click();
			} catch (e) {
				console.log(e);
			}
		}
	};

	const pickImageAsync = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			setSelectedImage(result.assets[0].uri);
			setShowAppOptions(true);
		} else {
			alert('You did not select any image.');
		}

	}
	return (
		<GestureHandlerRootView style={styles.container} >
			<View style={styles.imageContaier}>
				<View ref={imageRef} collapsable={false}>
					<ImageViewer
						src={require('./assets/images/background-image.png')}
						selectedImage={selectedImage}
					/>
					{pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
				</View>
			</View>
			{showAppOptions ? (
				<View style={styles.optionsContainer}>
					<View style={styles.optionsRow}>
						<IconButton icon="refresh" label="Reset" onPress={onRest} />
						<CircleButton onPress={onAddSticker} />
						<IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
					</View>
				</View>
			) : (
				<View style={styles.footerContainer}>
					<Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
					<Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
				</View>
			)
			}
			<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
				<EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
			</EmojiPicker>
			<StatusBar style="light" />
		</GestureHandlerRootView>
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
	},
	optionsContainer: {
		position: 'absolute',
		bottom: 80
	},
	optionsRow: {
		alignItems: 'center',
		flexDirection: 'row',
	}
});
