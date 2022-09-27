import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import TabPanel from '../ui/TabPanel';

import QuestionGroupsForm from './QuestionGroupsForm';
import QuestionsForm from './questions/QuestionsForm';
import QuestionsList from './questions/QuestionsList';

const QuestionGroupsTabs = ({ questionGroup, onReloadQuestionGroup }) => {
  const [value, setValue] = React.useState(1);

  const [showAddQuestionForm, setShowAddQuestionForm] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Uredi" />
          <Tab label="Vprašanja" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <QuestionGroupsForm
          data={questionGroup}
          onReloadQuestionGroup={onReloadQuestionGroup}
          method="PUT"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack direction="row" spacing={2} sx={{ my: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setShowAddQuestionForm(!showAddQuestionForm)}
          >
            Dodaj vprašanje
          </Button>
        </Stack>
        <QuestionsForm
          questionGroupId={questionGroup.question_group_id}
          onReloadQuestionGroup={onReloadQuestionGroup}
          show={showAddQuestionForm}
          onCloseHandler={() => setShowAddQuestionForm(false)}
        />
        <QuestionsList
          questions={questionGroup.questions}
          onReloadQuestionGroup={onReloadQuestionGroup}
        />
      </TabPanel>
    </Box>
  );
};

export default QuestionGroupsTabs;
