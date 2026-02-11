import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { gameHTML } from '@/lib/cactusRunnerHTML';

const INJECTED = `
  (function() {
    var style = document.createElement('style');
    style.textContent = 'body{margin:0;overflow:hidden}';
    document.head.appendChild(style);
  })();
  true;
`;

export function CactusRunnerGame() {
  const webRef = useRef<WebView>(null);

  return (
    <View style={styles.wrap}>
      <WebView
        ref={webRef}
        source={{ html: gameHTML }}
        style={styles.webview}
        scrollEnabled={false}
        bounces={false}
        injectedJavaScriptBeforeContentLoaded={INJECTED}
        originWhitelist={['*']}
        javaScriptEnabled
        onMessage={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 220,
    marginHorizontal: -24,
    marginBottom: 16,
    backgroundColor: '#EDE8E0',
    borderBottomWidth: 2,
    borderBottomColor: '#E0DBD2',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
    opacity: 0.99,
  },
});
