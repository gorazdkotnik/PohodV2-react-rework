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

import { useUIContext } from '../../context/UIContext';

const QuestionGroupsTabs = ({
  questionGroup,
  onReloadQuestionGroup,
  onDeleteHandler,
}) => {
  const { setDialog } = useUIContext();

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
          <Tab label="Ostala dejanja" />
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
      <TabPanel value={value} index={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDialog({
                title: 'Brisanje skupine vprašanj',
                text: 'Ali ste prepričani, da želite izbrisati skupino vprašanj?',
                onClose: onDeleteHandler,
              });
            }}
          >
            Izbriši
          </Button>
        </Stack>
      </TabPanel>
    </Box>
  );
};

export default QuestionGroupsTabs;
