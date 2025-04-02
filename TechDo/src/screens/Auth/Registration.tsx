import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextItem } from '../../styles/infrustucture';
import { useAppTheme } from '../../@core/infrustructure/theme/useAppTheme';
import { Layout } from '../../@core/layout';

const Registration: React.FC = () => {
  const { palette } = useAppTheme();

  return (
    <Layout>
      <View style={styles.container}>
        <TextItem
          size={6}
          color={palette.primary.main}
          weight="bold"
        >
          Registration Screen
        </TextItem>
        <TextItem
          size={4}
          color={palette.text.secondary}
          style={styles.subtitle}
        >
          Create your account to get started.
        </TextItem>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 10,
  },
});

export default Registration;
