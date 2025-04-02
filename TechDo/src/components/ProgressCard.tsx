import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../@core/infrustructure/theme/useAppTheme';
import { theme as themeUtils } from '../@core/infrustructure/theme';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProgressCardProps {
  title: string;
  completedTasks: number;
  totalTasks: number;
  icon: string;
  accentColor: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  completedTasks,
  totalTasks,
  icon,
  accentColor,
}) => {
  const { palette } = useAppTheme();
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: palette.background.card },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${accentColor}20` }]}>
        <Icon name={icon} size={themeUtils.WP(6)} color={accentColor} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: palette.text.title }]}>{title}</Text>

        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              { backgroundColor: palette.grey[200] },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: accentColor,
                  width: `${progressPercentage}%`,
                },
              ]}
            />
          </View>

          <Text style={[styles.progressText, { color: palette.text.body }]}>
            {completedTasks} of {totalTasks} tasks
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: themeUtils.WP(4),
    marginHorizontal: themeUtils.WP(4),
    marginVertical: themeUtils.WP(2),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: themeUtils.WP(12),
    height: themeUtils.WP(12),
    borderRadius: themeUtils.WP(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: themeUtils.WP(4),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: themeUtils.WP(4),
    fontWeight: 'bold',
    marginBottom: themeUtils.WP(2),
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: themeUtils.WP(2),
    borderRadius: themeUtils.WP(1),
    overflow: 'hidden',
    marginBottom: themeUtils.WP(1),
  },
  progressFill: {
    height: '100%',
    borderRadius: themeUtils.WP(1),
  },
  progressText: {
    fontSize: themeUtils.WP(3),
    fontWeight: '500',
  },
});

export default ProgressCard;
