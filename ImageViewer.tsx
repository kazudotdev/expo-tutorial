import { StyleSheet, Image, ImageSourcePropType } from 'react-native';

export default function ImageViewer({ src }: { src: ImageSourcePropType }) {
	return (
		<Image source={src} style={style.image} />
	);
}

const style = StyleSheet.create({
	image: {
		width: 320,
		height: 440,
		borderRadius: 18,
	}
});
