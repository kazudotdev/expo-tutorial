import { StyleSheet, Image, ImageSourcePropType } from 'react-native';

export default function ImageViewer({ src, selectedImage }: { src: ImageSourcePropType, selectedImage: string | null }) {
	const imageSource = selectedImage !== null
		? { uri: selectedImage }
		: src;
	return (
		<Image source={imageSource} style={style.image} />
	);
}

const style = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	}
});
