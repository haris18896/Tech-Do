import React from 'react';

// ** Third Party Packages
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Utils
import {theme as themeUtils} from '../@core/infrustructure/theme';

// ** Custom Components
import {
  Title,
  ProgressBar,
  ProgressFill,
  ProgressText,
  IconContainer,
  CardContainer,
  ContentContainer,
  ProgressContainer,
} from '../styles/components/ProgressCard';

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
  const progressPercentage =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <CardContainer>
      <IconContainer accentColor={accentColor}>
        <Icon name={icon} size={themeUtils.WP(6)} color={accentColor} />
      </IconContainer>

      <ContentContainer>
        <Title>{title}</Title>

        <ProgressContainer>
          <ProgressBar>
            <ProgressFill
              percentage={progressPercentage}
              accentColor={accentColor}
            />
          </ProgressBar>

          <ProgressText>
            {completedTasks} of {totalTasks} tasks
          </ProgressText>
        </ProgressContainer>
      </ContentContainer>
    </CardContainer>
  );
};

export default ProgressCard;
