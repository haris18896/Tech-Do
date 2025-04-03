import React from 'react';

// ** Utils
import {useAppTheme} from '../@core/infrustructure/theme/useAppTheme';

// ** Components
import {
  Container,
  ProgressTitle,
  ProgressCircle,
  ProgressSubtitle,
  ProgressPercentage,
  OverallProgressLeft,
  OverallProgressCard,
  CategoryCardsContainer,
  ProgressCircleContainer,
} from '../styles/components/ProgressSummary';
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
  const {palette} = useAppTheme();

  // Calculate overall totals
  const totalTasks = dailyTotal + weeklyTotal + monthlyTotal;
  const totalCompleted = dailyCompleted + weeklyCompleted + monthlyCompleted;
  const overallPercentage =
    totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  return (
    <Container>
      <OverallProgressCard>
        <OverallProgressLeft>
          <ProgressTitle>Overall Progress</ProgressTitle>
          <ProgressSubtitle>
            {totalCompleted} of {totalTasks} tasks completed
          </ProgressSubtitle>
        </OverallProgressLeft>

        <ProgressCircleContainer>
          <ProgressCircle>
            <ProgressPercentage>{overallPercentage}%</ProgressPercentage>
          </ProgressCircle>
        </ProgressCircleContainer>
      </OverallProgressCard>

      <CategoryCardsContainer horizontal showsHorizontalScrollIndicator={false}>
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
      </CategoryCardsContainer>
    </Container>
  );
};

export default ProgressSummary;
