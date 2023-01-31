import { useState } from 'react';

import Statistics from './Statistics/Statistics';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

import { List } from './Feedback.styled';

const feedbackOptions = ['good', 'neutral', 'bad'];

const Feedback = () => {
  const [votes, setVotes] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = name => {
    setVotes(prevState => {
      const value = prevState[name];

      return { ...prevState, [name]: value + 1 };
    });
  };

  const { good, neutral, bad } = votes;
  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = propName => {
    if (!total) {
      return 0;
    }
    const vote = votes[propName];
    const result = ((vote / total) * 100).toFixed(2);

    return Number(result);
  };

  const positivePercentage = countPositiveFeedbackPercentage('good');

  return (
    <>
      <Section title="Please leave feedback">
        <List>
          <FeedbackOptions
            options={feedbackOptions}
            onLeaveFeedback={onLeaveFeedback}
          />
        </List>
      </Section>

      <Section title="Statistics">
        {!total ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </>
  );
};

export default Feedback;
