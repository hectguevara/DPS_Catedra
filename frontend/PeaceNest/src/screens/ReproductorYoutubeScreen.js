import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { saveToHistory } from '../services/HistorialService';

export default function ReproductorYouTubeScreen({ route }) {
  const { video } = route.params;
  const videoId = video.url.split('/').pop(); 

   useEffect(() => {
    saveToHistory({ ...video, type: 'youtube' });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <YoutubePlayer height={300} play videoId={videoId} />
    </View>
  );
}
