import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '../@core/infrustructure/theme/useAppTheme';
import { theme as themeUtils } from '../@core/infrustructure/theme';
import ProgressCard from './ProgressCard';

interface ProgressSummaryProps {
  dailyTotal: number;
  dailyCompleted: number;
  weeklyTotal: number;
  weeklyCompleted: number;
  monthlyTotal: number;
  monthlyCompleted: number;
}

const ProgressSummary: React.FC<ProgressSummaryProps> = ({
  dailyTotal,
  dailyCompleted,
  weeklyTotal,
  weeklyCompleted,
  monthlyTotal,
  monthlyCompleted,
}) => {
  const { palette } = useAppTheme();

  // Calculate overall totals
  const totalTasks = dailyTotal + weeklyTotal + monthlyTotal;
  const totalCompleted = dailyCompleted + weeklyCompleted + monthlyCompleted;
  const overallPercentage = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <View style={styles.container}>
      {/* Main Progress Card */}
      <View
        style={[
          styles.overallProgressCard,
          { backgroundColor: palette.primary.main },
        ]}
      >
        <View style={styles.overallProgressLeft}>
          <Text style={[styles.progressTitle, { color: palette.common.white }]}>
            Overall Progress
          </Text>
          <Text style={[styles.progressSubtitle, { color: palette.common.white }]}>
            {totalCompleted} of {totalTasks} tasks completed
          </Text>
        </View>

        <View style={styles.progressCircleContainer}>
          <View style={styles.progressCircle}>
            <Text style={[styles.progressPercentage, { color: palette.primary.main }]}>
              {overallPercentage}%
            </Text>
          </View>
        </View>
      </View>

      {/* Category Progress Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryCardsContainer}
      >
        <ProgressCard
          title="Daily Tasks"
          completedTasks={dailyCompleted}
          totalTasks={dailyTotal}
          icon="calendar-today"
          accentColor={palette.primary.main}
        />

        <ProgressCard
          title="Weekly Tasks"
          completedTasks={weeklyCompleted}
          totalTasks={weeklyTotal}
          icon="calendar-week"
          accentColor={palette.secondary.main}
        />

        <ProgressCard
          title="Monthly Tasks"
          completedTasks={monthlyCompleted}
          totalTasks={monthlyTotal}
          icon="calendar-month"
          accentColor={palette.info.main}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: themeUtils.WP(4),
  },
  overallProgressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: themeUtils.WP(4),
    marginBottom: themeUtils.WP(4),
    padding: themeUtils.WP(4),
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  overallProgressLeft: {
    flex: 1,
  },
  progressTitle: {
    fontSize: themeUtils.WP(5),
    fontWeight: 'bold',
    marginBottom: themeUtils.WP(1),
  },
  progressSubtitle: {
    fontSize: themeUtils.WP(3.5),
    opacity: 0.9,
  },
  progressCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: themeUtils.WP(16),
    height: themeUtils.WP(16),
    borderRadius: themeUtils.WP(8),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: themeUtils.WP(5),
    fontWeight: 'bold',
  },
  categoryCardsContainer: {
    paddingLeft: themeUtils.WP(4),
    paddingRight: themeUtils.WP(8),
  },
});

export default ProgressSummary;
